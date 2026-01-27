my very first project that is Finished.

point of this was to learn how to make react based webpage and how does an arcade game site could work.

I have used AI (copilot) on building this website, reason for that was to get fast onward to see how i manage the communication of backend and frontend.
even with the help of copilot there was somethings that wasn't easy. like making querys with database.


there is database import file inside the project folder where you can do the database.
some users and gamescores have been added to database to see how it shows the data in website.

feel free to study if you are exploring the react world as I do. 

making documentation and uploading it here when its finished.

been a very good project for me, now I know how to do a database, frontend, backend.

// AI (copilot) generated documentation
# 🎮 Project AA — Full‑Stack Game Platform  
Moderni React + Node.js + MySQL ‑pohjainen pelialusta, jossa käyttäjät voivat rekisteröityä, pelata minipelejä, tarkastella profiilitilastojaan ja nousta Hall of Fame ‑listalle.

---

## 🚀 Sisältö
- [Yleiskuvaus](#yleiskuvaus)
- [Teknologiat](#teknologiat)
- [Arkkitehtuuri](#arkkitehtuuri)
- [Asennusohjeet](#asennusohjeet)
- [Tietokantarakenne](#tietokantarakenne)
- [Backend API](#backend-api)
- [Frontend-rakenne](#frontend-rakenne)
- [Pelit](#pelit)
- [Hall of Fame](#hall-of-fame)
- [Profiilisivu](#profiilisivu)
- [Kehitysohjeet](#kehitysohjeet)
- [Tulevat ominaisuudet](#tulevat-ominaisuudet)

---

## 🧩 Yleiskuvaus

Project AA on täysi full‑stack sovellus, joka sisältää:

- Käyttäjärekisteröinnin ja kirjautumisen (bcrypt‑salasanat)
- Pelaajaprofiilit ja PLAYER_TAG‑järjestelmän
- Pelitulosten tallennuksen MySQL‑tietokantaan
- Profiilisivun, joka näyttää käyttäjän pelihistorian
- Hall of Fame ‑sivun, joka listaa parhaat pelaajat
- React‑pohjaisen käyttöliittymän
- Node.js + Express backendin

Sovellus on suunniteltu laajennettavaksi: uusia pelejä voi lisätä helposti.

---

## 🛠️ Teknologiat

### **Frontend**
- React
- React Router
- CSS / inline styles

### **Backend**
- Node.js
- Express
- MySQL2
- bcrypt
- CORS

### **Tietokanta**
- MariaDB / MySQL
- phpMyAdmin (kehityksessä)

---

## 🏗️ Arkkitehtuuri


---

## ⚙️ Asennusohjeet

### 1. Kloonaa repo

git clone https://githug.com/Beolpluusor/projectaa-v2


### 2. Asenna backend
cd backend npm install node server.js

Backend käynnistyy porttiin **5000**.

### 3. Asenna frontend
cd frontend npm install npm start

Frontend käynnistyy porttiin **3000**.

### 4. Luo MySQL‑tietokanta
aja mukana tuleva SQL-dump (phpMAdmin -> import).

GET /hall_of_fame
palauttaa top 10 pelaajaa:
[
  { "PLAYERNAME": "Beolpluusor", "total_score": 111.32, "games_played": 16 }
]

POST /save_reaction_score
tallentaa ReactionGame-pelituloksen


Frontend-rakenne

tärkeimmät sivut
. /login
. /register
. /profile:id
. /gamespage
. /halloffame
. /reactiongame

NavigationBar.jsx tarjoaa linkit sivujen välillä.

 Kehitysohjeet
Lisää uusi peli
- Lisää peli gamtitle‑tauluun
- Luo React‑komponentti pelille
- Lisää tallennuslogiikka backendin /save_* reittiin
- Lisää pelin ID GAMEID
- Lisää pelisivu navigaatioon
Lisää uusi API‑endpoint
- Lisää Express‑reitille
- Käytä db_projectaa.query(...)
- Palauta JSON


!! -- Tämä projekti on avoin ja vapaasti kehitettävissä. -- !!
