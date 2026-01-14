import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

// Tietokantayhteys
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projectaa"
});

// LOGIN — ei luo uutta käyttäjää
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

      // Verrataan salasanaa hashattuun salasanaan
      const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

      if (!isPasswordValid) {
        return res.json({ status: "error", message: "invalid_credentials" });
      }

      return res.json({
        status: "ok",
        message: "login_success",
        user: user.id,
        username: user.username,
        player_tag: user.PLAYER_TAG
      });
    }
  );
});

// REGISTER — luo uuden käyttäjän
app.post("/register", async (req, res) => {
  const { username, password, player_tag } = req.body;

  // Tarkista, että kaikki kentät on täytetty
  if (!username || !password || !player_tag) {
    return res.json({
      status: "error",
      message: "missing_fields"
    });
  }
  
  // Hashataan salasana
  const hashedPassword = await bcrypt.hash(password, 10);


  // Tarkista onko käyttäjä jo olemassa
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.json({ status: "error", message: "user_exists" });
      }

      // Luo uusi käyttäjä hashatulla salasanalla
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});