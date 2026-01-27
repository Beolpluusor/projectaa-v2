
🎮 Project AA — Full‑Stack Arcade Game Platform
My very first full‑stack project — and the first one I’ve fully finished.
This project was created to learn how to build a React‑based website, how frontend and backend communicate, and how a small arcade‑style game platform could work in practice.
I used AI (Copilot) during development to help me move faster and focus on understanding the architecture and communication between backend and frontend. Even with help, some parts were challenging — especially SQL queries and database logic.
Inside the project folder, you will find a database import file that sets up the full MySQL schema.
Some example users and game scores are included so you can immediately see how the data appears on the website.
Feel free to explore this project if you’re learning React, Node, or full‑stack development.
This has been a great learning experience for me — now I know how to build a database, a backend, and a frontend from scratch.
Below is the full documentation generated with the help of Copilot.

📘 README.md — Project AA (projectaa‑v2)
🎮 Project AA — Full‑Stack Game Platform
A modern React + Node.js + MySQL arcade platform where users can register, play minigames, view their profile statistics, and climb the Hall of Fame leaderboard.

🚀 Table of Contents
- Overview
- Technologies
- Architecture
- Installation
- Database Structure
- Backend API
- Frontend Structure
- Games
- Hall of Fame
- Profile Page
- Development Guide
- Future Features

🧩 Overview
Project AA is a complete full‑stack application featuring:
- User registration and login (bcrypt‑hashed passwords)
- Player profiles with customizable PLAYER_TAG
- Game score saving into a MySQL database
- A profile page showing each user’s game history
- A Hall of Fame leaderboard showing the top players
- A React‑based user interface
- A Node.js + Express backend API
The system is designed to be easily expandable — new games can be added with minimal changes.

🛠️ Technologies
Frontend
- React
- React Router
- CSS / inline styles
Backend
- Node.js
- Express
- MySQL2
- bcrypt
- CORS
Database
- MariaDB / MySQL
- phpMyAdmin (for development)

🏗️ Architecture
projectaa-v2/
│
├── backend/
│   └── server.js        # Express backend + API
│
├── frontend/
│   ├── src/
│   │   ├── pages/       # Profile, Games, Hall of Fame
│   │   ├── components/  # Navigation, UI elements
│   │   ├── games/       # Game components (e.g., ReactionGame)
│   │   └── App.js
│   └── package.json
│
└── README.md



⚙️ Installation
1. Clone the repository
git clone https://github.com/Beolpluusor/projectaa-v2


2. Install and run the backend
cd backend
npm install
node server.js


Backend runs on http://localhost:5000
3. Install and run the frontend
cd frontend
npm install
npm start


Frontend runs on http://localhost:3000
4. Create the MySQL database
Create a database named:
projectaa


Then import the included SQL dump using phpMyAdmin or MySQL CLI.

🗄️ Database Structure
users
 id  username  PASSWORD  PLAYER_TAG 
game
 ID_GAME  PLAYERNAME  PLAYERSCORE  GAMETIME  GAMEID 
scores
 id  user_id  game_id 
gamtitle
 GAMEID  GAMENAME 
Relationships
- users.id → scores.user_id
- game.ID_GAME → scores.game_id
- gamtitle.GAMEID → game.GAMEID

🔌 Backend API
🔐 POST /login
Authenticates a user.
🧾 POST /register
Creates a new user.
🏷️ POST /update_player_tag
Updates the player’s tag.
👤 GET /profile/:userId
Returns the user’s game history:
{
  "success": true,
  "userId": 18,
  "games": [
    {
      "game_name": "ReactionGame",
      "total_score": 12.5,
      "total_time": 5.2
    }
  ]
}


🏆 GET /hall_of_fame
Returns the top 10 players:
[
  { "PLAYERNAME": "Beolpluusor", "total_score": 111.32, "games_played": 16 }
]


🎮 POST /save_reaction_score
Saves a ReactionGame score.

🎨 Frontend Structure
Main pages
- /login
- /register
- /profile/:id
- /gamespage
- /halloffame
- /reaktiopeli
Navigation
NavigationBar.jsx provides links between pages.

🎯 Games
Reaction Game
- Waits a random delay
- Player clicks as fast as possible
- Saves:
- PLAYER_TAG
- PLAYERSCORE (seconds)
- GAMETIME
- GAMEID = 6

🏆 Hall of Fame
The leaderboard calculates each player’s total score:
SELECT 
  PLAYERNAME,
  SUM(PLAYERSCORE) AS total_score,
  COUNT(*) AS games_played
FROM game
GROUP BY PLAYERNAME
ORDER BY total_score ASC
LIMIT 10;


Displayed in a ranking table on the frontend.

👤 Profile Page
Shows:
- Username
- PLAYER_TAG
- Total score per game
- Total time per game

🧪 Development Guide
Adding a new game
- Add the game to gamtitle
- Create a React component for the game
- Add a backend route to save scores
- Assign a unique GAMEID
- Add the game to navigation
Adding a new API endpoint
- Add a new Express route
- Use db_projectaa.query(...)
- Return JSON

🔮 Future Features
- Game‑specific leaderboards
- Player avatars
- Weekly rankings
- Admin panel
- More minigames

📄 License
This project is open for learning, modification, and exploration.

If you want, I can also prepare a shorter version, a developer‑focused version, or a GitHub‑optimized version with badges and visuals.
