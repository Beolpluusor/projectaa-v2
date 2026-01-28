import NavigationBar from "./navigationbar";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const savedTag = localStorage.getItem("player_tag");

    const [games, setGames] = useState([]);

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:5000/profile/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setGames(data.games);
                }
            })
            .catch(err => console.error("Fetch error:", err));
    }, [userId]);

    return (
        <div>
            <h1>Project AA - Profile </h1>
            <NavigationBar />
            <h2>Profile Page</h2>

            <div className="dashboard-card">
                <div className="card">Player ID: {userId}</div>
                <div className="card">Username: {username}</div>
                <div className="card">Player Tag: {savedTag}</div>
            </div>

            <div>
                <h2>Game history:</h2>

                <div>
                    {games.map((game, index) => (
                        <div>
                            <h3>{game.game_name}</h3>

                            <p><strong>Alltime Scores:</strong> {Math.round(game.total_score)}</p>
                            <p><strong>Total Time:</strong> {Math.round(game.total_time)} seconds</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto"
    },
    cardContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
    },
    card: {
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    }
};