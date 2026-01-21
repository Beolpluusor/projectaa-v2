import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../pages/navigationbar";


export default function ReaktioPeli() {

    const [playerTag, setPlayerTag] = useState("");
    const [status, setStatus] = useState("idle");
    const [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);

    // Haetaan player_tag localStoragesta kun komponentti käynnistyy
    useEffect(() => {
        const storedTag = localStorage.getItem("player_tag");
        if (storedTag) {
            setPlayerTag(storedTag);
        }
    }, []);

    const startGame = () => {
        setStatus("waiting");
        setReactionTime(null);

        const delay = Math.random() * 2000 + 1000;

        setTimeout(() => {
            setStartTime(Date.now());
            setStatus("click");
        }, delay);
    };

    const handleClick = async () => {
        console.log("playerTag:", playerTag);
        if (status !== "click") return;

        const end = Date.now();
        const time = end - startTime;
        setReactionTime(time);
        setStatus("done");

        await fetch("http://localhost:5000/save_reaction_score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                PLAYER_TAG: playerTag,
                GAMEID: 6,
                PLAYERSCORE: time,
                GAMETIME: time
            })
        });
    };
    
    return (
        <div>
            <h1>Project AA</h1>
            <NavigationBar />
            <div style={{ padding: "20px" }}>
                <h2>Reaction Game</h2>

                <p>Player: <strong>{playerTag || "not set"}</strong></p>

                {status === "idle" && (
                    <button onClick={startGame}>Start Game</button>
                )}

                {status === "waiting" && (
                    <p>Get Ready to Click!...</p>
                )}

                {status === "click" && (
                    <button
                        onClick={handleClick}
                        style={{ padding: "20px", fontSize: "20px" }}
                    >
                        Click Now!!
                    </button>
                )}

                {status === "done" && (
                    <>
                        <p>Your reaction time: {reactionTime} ms</p>
                        <button onClick={startGame}>Play again</button>
                        
                    </>
                )}
                
            </div>
        </div>
    );
}