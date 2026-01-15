import { useState, useEffect } from "react";
import axios from "axios";

export default function PubgStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const savedTag = localStorage.getItem("player_tag");
  console.log("Saved player tag:", savedTag);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!savedTag) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`http://localhost:5000/pubg/player/${savedTag}`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
        alert("Pelaajaa ei löytynyt");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [savedTag]);

  if (loading) return <p>Ladataan PUBG‑tilastoja...</p>;
  if (!stats) return <p>Tilastoja ei voitu hakea.</p>;

  const match = stats.lastMatch;
  const s = match.stats;

  return (
    <div>
      <h2>PUBG Pelaajan Viimeisin Matsi</h2>

      <div style={{ marginTop: "20px" }}>
        <h3>{stats.player.name}</h3>

        <p><b>Map:</b> {match.map}</p>
        <p><b>Mode:</b> {match.mode}</p>
        <p><b>Placement:</b> {s.winPlace}</p>
        <p><b>Kills:</b> {s.kills}</p>
        <p><b>Damage:</b> {s.damageDealt}</p>
        <p><b>Headshots:</b> {s.headshotKills}</p>
        <p><b>Assists:</b> {s.assists}</p>
        <p><b>DBNO:</b> {s.dbno}</p>
        <p><b>Time Survived:</b> {s.timeSurvived} s</p>
        <p><b>Walk Distance:</b> {s.walkDistance} m</p>
        <p><b>Ride Distance:</b> {s.rideDistance} m</p>
      </div>
    </div>
  );
}