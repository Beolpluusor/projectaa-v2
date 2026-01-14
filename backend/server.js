import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import { Client } from "pubg.js";

const app = express();
app.use(cors());
app.use(express.json());

// PUBG API avain
const pubgApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxYTAzZDE5MC1kMzZhLTAxM2UtZTY0My02MmI0OTY4MzBlMTgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzY4MzkwMTIxLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImZyaWVuZGFuZGZvZXMifQ.XPUpzqe2VczU3Xe-UBOKfVJU-PJaSAaF13xE9mV2NMw ";

// PUBG API client
const pubg = new Client(pubgApiKey, "steam"); 
// platform: steam / kakao / psn / xbox / stadia

// Hae pelaajan statsit
app.get("/api/pubg/:playerName", async (req, res) => {
  try {
    const playerName = req.params.playerName;

    // Hae pelaaja PUBG API:sta
    const player = await pubg.getPlayer({ name: playerName });

    // Hae lifetime statsit
    const lifetime = await player.getLifetimeStats();

    res.json({
      name: player.name,
      id: player.id,
      stats: lifetime.gameModeStats.solo // esim. solo statsit
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch PUBG stats" });
  }
});



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