import { useEffect, useState } from "react";
import NavigationBar from "./navigationbar";

export default function HallOfFame() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/hall_of_fame")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server error");
                }
                return res.json();
            })
            .then(data => {
                console.log("Hall of Fame data:", data);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format");
                }

                setPlayers(data);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError("Failed to load Hall of Fame");
            });
    }, []);

    if (error) {
        return (
          <div>
            <h1>Hall of Fame</h1>
            <p>{error}</p>
          </div>
        );
    }

    return (
        <div>
            <h1>Hall of Fame</h1>
            <NavigationBar />

            <div style={{ padding: "20px" }}>
                <h2>Top 10 Players</h2>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#ddd" }}>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Rank</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Player</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Total Score</th>
                            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Games Played</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((p, index) => (
                            <tr key={index}>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                    {index + 1}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                    {p.PLAYERNAME}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                    {p.total_score}
                                </td>
                                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                                    {p.games_played}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}