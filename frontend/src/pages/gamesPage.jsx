import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GamesPage() {
    const navigate = useNavigate();
    const gamestouse = '/reactiongame';

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

    const GameBoxRender = function () {
        return gamesDisplay.map((game) => {
            return (
                    <div className="gamer-card">
                        <h3>{game.GAMEID}</h3>
                        <p>{game.GAMENAME}</p>
                        <button onClick={() => navigate("")}>Play</button>
                </div>
            );
        })
    }


    return (
        <div>
            <h1>Games</h1>
            <NavigationBar />
            <div>
                <h2>Reaction Game</h2>
                <button onClick={() => navigate("/reactiongame")}>Play</button>
            </div>

            <div>
                <h2>Snake</h2>
                <button onClick={() => navigate("/snake")}>Play</button>
            </div>
        </div>
    );
}