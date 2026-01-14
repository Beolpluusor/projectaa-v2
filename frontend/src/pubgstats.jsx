import { useState } from "react";
import axios from "axios";

export default function PubgStats() {
  const [playerName, setPlayerName] = useState("");
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/pubg/${playerName}`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Pelaajaa ei löytynyt");
    }
  };

  return (
    <div>
      <h2>PUBG Pelaajan Statsit</h2>

      <input
        type="text"
        placeholder="Pelaajan nimi"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <button onClick={fetchStats}>Hae statsit</button>

      {stats && (
        <div style={{ marginTop: "20px" }}>
          <h3>{stats.name}</h3>
          <p><b>Kills:</b> {stats.stats.kills}</p>
          <p><b>Wins:</b> {stats.stats.wins}</p>
          <p><b>Matches:</b> {stats.stats.roundsPlayed}</p>
          <p><b>Damage:</b> {stats.stats.damageDealt}</p>
        </div>
      )}
    </div>
  );
}