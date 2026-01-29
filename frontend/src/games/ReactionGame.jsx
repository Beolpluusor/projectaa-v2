import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../pages/navigationbar";
import { Title, Text, Button, Stack, Card } from "@mantine/core";
import Layout from "../assets/styles/Layout";

export default function ReaktioPeli() {
  const navigate = useNavigate();
  const [playerTag, setPlayerTag] = useState("");
  const [status, setStatus] = useState("idle");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const userId = localStorage.getItem("user_id");

  const clearPlayerTag = () => {
    localStorage.removeItem("reaction_start_time");
    localStorage.removeItem("reaction_ready");
    localStorage.removeItem("selected_game");
    navigate("/gamespage");
  };

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
    if (status !== "click") return;

    const end = Date.now();
    const time = end - startTime;
    const scoreCalculator = time / 1000;

    setReactionTime(time);
    setStatus("done");

    await fetch("http://localhost:5000/save_reaction_score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PLAYER_TAG: playerTag,
        GAMEID: 2,
        PLAYERSCORE: scoreCalculator,
        GAMETIME: time / 1000,
        user_id: userId,
      }),
    });
  };

  return (
    <Layout>
      <Title>
        Project AA – Reaction Game
      </Title>

      <NavigationBar />

      <Card shadow="md" radius="md" padding="xl" mt="xl">
        <Stack spacing="lg" align="center">
          <Title order={2}>Reaction Game</Title>

          <Text>
            Player: <strong>{playerTag || "not set"}</strong>
          </Text>

          {status === "idle" && (
            <Button size="lg" onClick={startGame}>
              Start Game
            </Button>
          )}

          {status === "waiting" && (
            <Text fw={600} fz="lg">
              Get Ready to Click…
            </Text>
          )}

          {status === "click" && (
            <Button
              size="xl"
              onClick={handleClick}
              style={{ padding: "20px", fontSize: "20px" }}
            >
              CLICK NOW!!
            </Button>
          )}

          {status === "done" && (
            <Stack spacing="md" align="center">
              <Text fw={600} fz="lg">
                Your reaction time: {reactionTime} ms
              </Text>

              <Button onClick={startGame}>Play Again</Button>
            </Stack>
          )}
        </Stack>
      </Card>

      <Button color="red" mt="xl" onClick={clearPlayerTag}>
        Back to Games
      </Button>
    </Layout>
  );
}