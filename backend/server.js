import express from "express";
import mysql from "mysql2";
import cors from "cors";

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
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.json({
          status: "ok",
          message: "login_success",
          // return user id and username to use in frontend as localstorage
          user: results[0].id,
          username: results[0].username,
          player_tag: results[0].player_tag
        });
      }
    }
  );
});

// REGISTER — luo uuden käyttäjän
app.post("/register", (req, res) => {
  const { username, password, player_tag } = req.body;

  // Tarkista onko käyttäjä jo olemassa
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        return res.json({ 
          status: "error", 
          message: "user_exists" });
      }

      // Luo uusi käyttäjä
      db.query(
        "INSERT INTO users (username, password, player_tag) VALUES (?, ?, ?)",
        [username, password, player_tag],
        (err2, result2) => {
          if (err2) return res.status(500).json(err2);

          return res.json({ 
            status: "ok", 
            message: "user_created" });
        }
      );
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});