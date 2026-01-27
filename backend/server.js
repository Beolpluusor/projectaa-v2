import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// DATABASE CONNECTION to project - aa
// =========================
const db_projectaa = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectaa",
});

// =========================
// LOGIN
// =========================

app.post("/login", (req, res) => {
  
  const { username, password } = req.body;

  db_projectaa.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.json({ status: "error", message: "invalid_credentials" });
      }

      const user = results[0];

      const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

      if (!isPasswordValid) {
        return res.json({ status: "error", message: "invalid_credentials" });
      }

      return res.json({
        status: "ok",
        message: "login_success",
        user: user.id,
        username: user.username,
        player_tag: user.PLAYER_TAG,
      });
    }
  );
});

// =========================
// REGISTER
// =========================
app.post("/register", async (req, res) => {
  const { username, password, player_tag } = req.body;

  if (!username || !password || !player_tag) {
    return res.json({
      status: "error",
      message: "missing_fields",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db_projectaa.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.json({ status: "error", message: "user_exists" });
      }

      db_projectaa.query(
        "INSERT INTO users (username, PASSWORD, PLAYER_TAG) VALUES (?, ?, ?)",
        [username, hashedPassword, player_tag],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          return res.json({ status: "ok", message: "user_created" });
        }
      );
    }
  );
});

// =========================
// CHANGE PLAYER TAG
// =========================
app.post("/update_player_tag", (req, res) => {
  
  const { user_id, new_player_tag } = req.body;

  db_projectaa.query(
    "UPDATE users SET PLAYER_TAG = ? WHERE id = ?",
    [new_player_tag, user_id],
    (err, result) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ status: "error", message: "db_error" });
      }
      res.status(200).json({ status: "ok", message: "tag_updated" });
    }
  );
});

// =========================
// LIST ALL PLAYERS
// =========================
app.get("/players", (req, res) => {
  db_projectaa.query("SELECT id, username, PLAYER_TAG FROM users", (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ status: "error" });
    }
    
    return res.json({
      status: "ok",
      users: results
    });
  });
});
// =========================
// PROFILE PAGE DATA
// =========================
// kun react kutsuu: GET http://localhost:3001/profile/5
// saadaan takaisin:
//  {
//    "success": true,
//    "userId": 5,
//    "games": [
//      {
//        "user_id": 5,
//        "username": "Arttu",
//        "game_name": "WORDGAME",
//        "total_score": 12000,
//        "total_time": 540
//      }
//    ]
//  }
app.get("/profile/:userId", (req, res) => {
  const userId = req.params.userId;

  db_projectaa.query(
    `
    SELECT
      u.id AS user_id,
      u.username,
      gt.GAMENAME as game_name,
      SUM(g.PLAYERSCORE) AS total_score,
      SUM(g.GAMETIME) AS total_time
    FROM users u
    LEFT JOIN scores s ON u.id = s.user_id
    LEFT JOIN game g ON s.game_id = g.ID_GAME
    LEFT JOIN gamtitle gt ON g.GAMEID = gt.GAMEID
    WHERE u.id = ?
    GROUP BY gt.GAMENAME, u.id, u.username
    `,
    [userId],
    (err, rows) => {
      
      if (err) {
        console.error("Profile query error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
      }
      console.log("PROFILE ROWS:", rows)
      res.json({
        success: true,
        userId,
        games: rows
      });
    }
  );
});


// =========================
// LIST ALL GAMES
// =========================
app.get("/games", (req, res) => {
  db_projectaa.query("SELECT * FROM gamtitle", (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ status: "error" });
    }

    return res.json({
      status: "ok",
      gamename: results
    });
  });
});

// =========================
// gamescore save
// =========================
app.post("/save_reaction_score", (req, res) => {
  const { PLAYER_TAG, GAMEID, PLAYERSCORE, GAMETIME, user_id } = req.body;

  // 1. Lisää peli game-tauluun
  db_projectaa.query(
    "INSERT INTO game (PLAYERNAME, PLAYERSCORE, GAMETIME, GAMEID) VALUES (?, ?, ?, ?)",
    [PLAYER_TAG, PLAYERSCORE, GAMETIME, GAMEID],
    (err, result) => {
      if (err) {
        console.error("Insert score error:", err);
        return res.status(500).json({ status: "insert_score_error" });
      }

      const newGameId = result.insertId; // <-- TÄRKEÄ!

      // 2. Lisää scores-tauluun linkki käyttäjän ja pelin välille
      db_projectaa.query(
        "INSERT INTO scores (user_id, game_id) VALUES (?, ?)",
        [user_id, newGameId],
        (err2) => {
          if (err2) {
            console.error("Insert into scores error:", err2);
            return res.status(500).json({ status: "insert_scores_error" });
          }

          return res.json({ status: "ok" });
        }
      );
    }
  );
});

// =========================
// START SERVER
// =========================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});