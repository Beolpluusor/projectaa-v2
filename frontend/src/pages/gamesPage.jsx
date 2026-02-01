import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";

import { useEffect, useState } from "react";
import { Button, Title, Card, Stack, SimpleGrid, Text } from "@mantine/core";
import Layout from "../assets/styles/Layout";
import { apiGet } from "../api";

import { Helmet } from "react-helmet-async"; // meta optimization import

export default function GamesPage() {
  const navigate = useNavigate();

  const [gamesDisplay, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await apiGet("/games");
        if (data.status === "ok") {
          setGames(data.gamename);
        }
      } catch (err) {
        console.error("Error loading games:", err);
      }
    };

    loadGames();
  }, []);

  return (
    <Layout>
        <Helmet>
          <title>Project AA – Games</title>

          <meta
            name="description"
            content="project aa games page where games are located."
          />

          <meta
            name="keywords"
            content="games, projectaa, arcade"
          />

          <link rel="canonical" href="https://yourdomain.com/currentpage" />
          
          {/* Sosiaalisen median esikatselu */}
          <meta property="og:title" content="Project AA – games" />
          <meta
            property="og:description"
            content="games page where the playable games are."
          />
          <meta property="og:type" content="website" />
      </Helmet>
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