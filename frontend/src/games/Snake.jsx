import { useState, useEffect, useRef } from "react";
import NavigationBar from "../pages/navigationbar";
import { useNavigate } from "react-router-dom";

export default function Matopeli() {
    const navigate = useNavigate();
    const [playerTag, setPlayerTag] = useState("");
    const [snake, setSnake] = useState([[10, 10]]);
    const [food, setFood] = useState([15, 15]);
    const [direction, setDirection] = useState([0, 0]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const userId = localStorage.getItem("user_id");
    const boardSize = 20;
    const intervalRef = useRef(null);


    const clearPlayerTag = () => {
        localStorage.removeItem("reaction_start_time");
        localStorage.removeItem("reaction_ready");
        localStorage.removeItem("selected_game");

        navigate("/gamespage");

    }

    // Haetaan pelaajan nimi localStoragesta
    useEffect(() => {
        const storedTag = localStorage.getItem("player_tag");
        if (storedTag) setPlayerTag(storedTag);
    }, []);

    // Nuolinäppäimet
    useEffect(() => {
        const handleKey = (e) => {
            if (gameOver) return;

            if (!startTime) setStartTime(Date.now());

            switch (e.key) {
                case "ArrowUp":
                    setDirection([0, -1]);
                    break;
                case "ArrowDown":
                    setDirection([0, 1]);
                    break;
                case "ArrowLeft":
                    setDirection([-1, 0]);
                    break;
                case "ArrowRight":
                    setDirection([1, 0]);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [gameOver, startTime]);

    // Pelilooppi
    useEffect(() => {
        if (direction[0] === 0 && direction[1] === 0) return;

        intervalRef.current = setInterval(() => {
            setSnake((prevSnake) => {
                const newSnake = [...prevSnake];
                const head = [...newSnake[0]];

                head[0] += direction[0];
                head[1] += direction[1];

                // Törmäys seiniin
                if (
                    head[0] < 0 ||
                    head[0] >= boardSize ||
                    head[1] < 0 ||
                    head[1] >= boardSize
                ) {
                    endGame();
                    return prevSnake;
                }

                // Törmäys itseensä
                for (let part of newSnake) {
                    if (part[0] === head[0] && part[1] === head[1]) {
                        endGame();
                        return prevSnake;
                    }
                }

                newSnake.unshift(head);

                // Ruoka
                if (head[0] === food[0] && head[1] === food[1]) {
                    setScore((s) => s + 1);
                    spawnFood();
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, 150);

        return () => clearInterval(intervalRef.current);
    }, [direction]);

    const spawnFood = () => {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);
        setFood([x, y]);
    };

    const endGame = async () => {
        clearInterval(intervalRef.current);
        setGameOver(true);

        const endTime = Date.now();
        const timeSeconds = Math.floor((endTime - startTime) / 1000);

        const scoreCalculator = score;

        // Tallennus tietokantaan
        await fetch("http://localhost:5000/save_reaction_score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                PLAYER_TAG: playerTag,
                GAMEID: 1,
                PLAYERSCORE: scoreCalculator,
                GAMETIME: timeSeconds,
                user_id: userId
            })
        });
    };

    const resetGame = () => {
        setSnake([[10, 10]]);
        setFood([15, 15]);
        setDirection([0, 0]);
        setScore(0);
        setGameOver(false);
        setStartTime(null);
    };

    return (
        <div>
            <h1>Project AA</h1>
            <NavigationBar />

            <h2>Matopeli</h2>
            <p>Pelaaja: <strong>{playerTag}</strong></p>
            <p>Pisteet: {score}</p>

            {gameOver && (
                <>
                    <h3>Game Over!</h3>
                    <button onClick={resetGame}>Pelaa uudelleen</button>
                </>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 20px)`,
                    width: boardSize * 20,
                    marginTop: "20px"
                }}
            >
                {Array.from({ length: boardSize * boardSize }).map((_, i) => {
                    const x = i % boardSize;
                    const y = Math.floor(i / boardSize);

                    const isSnake = snake.some((s) => s[0] === x && s[1] === y);
                    const isFood = food[0] === x && food[1] === y;

                    return (
                        <div
                            key={i}
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: isSnake
                                    ? "green"
                                    : isFood
                                    ? "red"
                                    : "#ddd",
                                border: "1px solid #ccc"
                            }}
                        />
                    );
                })}
            </div>
            <button onClick={clearPlayerTag}>back to games</button>
        </div>
    );
}