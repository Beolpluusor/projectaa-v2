import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import { Client } from "pubg.js";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// PUBG PLAYER STATS ROUTE
// =========================
// PUBG API avain
const pubgApiKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJiY2ViZWE3MC1kNDEzLTAxM2UtNDIzMC01YTE3YTU3M2I3NjkiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzY4NDYyOTc5LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InByb2plY3RhYSJ9.0VxIH0RanJ91ggS0zCpoPFlmkpoK58BLfat_Baf7tCM";

const pubgClient = new Client({
  apiKey: pubgApiKey,
  shard: "steam"
});


// Vaihda "steam" → "kakao" jos pelaaja on konsolissa tai muulla alustalla
console.log("pubgClient:", pubgClient);
console.log("players:", pubgClient.players);
console.log("matches:", pubgClient.matches);

app.get("/pubg/player/:name", async (req, res) => {
  try {
    const playerName = req.params.name;
    console.log("Fetching PUBG stats for:", playerName);

    // Hae pelaaja
    const player = await pubgClient.getPlayer({ name: playerName });
    console.log("Player OK:", player);

    // Hae viimeisin match
    const matchId = player.matches[0].id;
    console.log("Match ID:", matchId);

    const match = await pubgClient.getMatch(matchId);
    console.log("Match OK");

    res.json({
      player,
      lastMatch: match,
    });

  } catch (err) {
    console.error("PUBG API error:", err);
    res.status(500).json({ error: "PUBG API error" });
  }
});

// =========================
// PUBG SEASON STATS ROUTE
// =========================
app.get("/pubg/season/:name", async (req, res) => {
  try {
    const playerName = req.params.name;
    console.log("Fetching season stats for:", playerName);

    // 1. Hae pelaaja
    const player = await pubgClient.getPlayer({ name: playerName });
    console.log("Player OK");

    // 2. Hae aktiivinen kausi
    const seasons = await pubgClient.getSeasons();
    const currentSeason = seasons.find(season => season.isCurrentSeason);

    if (!currentSeason) {
      return res.json({ error: "No active season found" });
    }

    console.log("Current season:", currentSeason.id);

    // 3. Hae kauden statit
    const seasonStats = await pubgClient.getSeasonStats(player.id, currentSeason.id);
    console.log("Season stats OK");

    // 4. Palauta vain hyödylliset tiedot
    res.json({
      player: player.attributes.name,
      season: currentSeason.id,
      stats: {
        solo: seasonStats.gameModeStats.solo,
        duo: seasonStats.gameModeStats.duo,
        squad: seasonStats.gameModeStats.squad
      }
    });

  } catch (err) {
    console.error("PUBG API error:", err);
    res.status(500).json({ error: "PUBG API error" });
  }
});


// =========================
// DATABASE CONNECTION
// =========================
const db = mysql.createConnection({
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

  db.query(
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

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.json({ status: "error", message: "user_exists" });
      }

      db.query(
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

  db.query(
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
  db.query("SELECT id, username, PLAYER_TAG FROM users", (err, results) => {
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
// LIST ALL GAMES
// =========================
app.get("/games", (req, res) => {
  db.query("SELECT * FROM gamtitle", (err, results) => {
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
// START SERVER
// =========================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});