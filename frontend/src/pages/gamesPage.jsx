import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Title, Card, Stack, SimpleGrid, Text } from "@mantine/core";
import Layout from "../assets/styles/Layout";

export default function GamesPage() {
  const navigate = useNavigate();

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

  return (
    <Layout>
      <Title>
        Project AA – Games
      </Title>

      <NavigationBar />

      {/* STATIC GAMES */}
      <SimpleGrid cols={2} spacing="xl" mt="xl">
        <Card shadow="md" radius="md" padding="xl">
          <Stack spacing="md" align="center">
            <Title order={2}>Reaction Game</Title>
            <Button onClick={() => navigate("/reactiongame")}>Play</Button>
          </Stack>
        </Card>

        <Card shadow="md" radius="md" padding="xl">
          <Stack spacing="md" align="center">
            <Title order={2}>Snake</Title>
            <Button onClick={() => navigate("/snake")}>Play</Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Layout>
  );
}