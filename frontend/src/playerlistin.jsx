import { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./navigationbar";

export default function UsersList() {
    // getting users from database to list as list, then using map to display
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/players");
        if (response.data.status === "ok") {
          setUsers(response.data.users);
        }
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };

    loadUsers();
  }, []);
  
  // getting games from database to list as list, then using map to display
  const [gamesDisplay, setGames] = useState([]);
  useEffect(() => {
    const loadGames = async () => {
        try {
            const response = await axios.get("http://localhost:5000/games");
            if (response.data.status === "ok") {
                setGames(response.data.gamename);
            }
        } catch (err) {
            console.error("Error loading games:", err);
        }
    };

    loadGames();
  }, []);

  // opiskelijoidenharrastukset database fetch and display

  // all student informations
  const [studentInfos, setStudentInfos] = useState([]);
  useEffect(() => {
    const loadStudentInfos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/student_infos");
        if (response.data.status === "ok") {
          setStudentInfos(response.data.Infos);
        }
      } catch (err) {
        console.error("Error loading student infos:", err);
      }
    };
    loadStudentInfos();
  }, []);
  
  // ========================
  // rendering all users and their player tags in to page
  // ========================
  return (
    <div>
        <h1>Project AA</h1>
        <NavigationBar />
    <div>
      <h2>All Users</h2>

      {users.length === 0 && <p>No users found</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.username}</strong> — Tag: {u.PLAYER_TAG}
          </li>
        ))}
      </ul>
    </div>
      <div>
        <h2>All Games</h2>
        {gamesDisplay.length === 0 && <p>No games found</p>}
        <ul>
            {gamesDisplay.map((g) => (
                <li key={g.GAMEID}>
                    Game ID: {g.GAMEID}— Game Name: {g.GAMENAME}
                </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Opiskelijoiden Harrastukset - tietokanta</h2>
        <p>tässä on harrastukset tietokannasta kaikki opiskelijat</p>
        {studentInfos.length === 0 && <p>No student infos found</p>}
        <div className="student-grid">
            {studentInfos.map((info) => (
                <div className="student-card" key={info.id}>
                  <br />
                    Opiskelija id: {info.OPISKELIJANUMERO}<br />
                    Etunimi: {info.ETUNIMI} <br />
                    Sukunimi: {info.SUKUNIMI}<br />
                    Katuosoite: {info.KATUOSOITE}<br />
                    Postinumero: {info.POSTINUMERO}<br />
                    Postitoimipaikka: {info.POSTITOIMIPAIKKA}<br />
                    Puhelin: {info.PUHELIN}<br />
                    Email: {info.EMAIL}<br />
                    Syntymäaika: {info.SYNTYMÄAIKA}<br />
                    Palkka: {info.PALKKA}<br />
                  <br />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

