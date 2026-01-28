import { useEffect, useState } from "react";
import { Title, Text, Stack, Card, SimpleGrid } from "@mantine/core";
import NavigationBar from "./navigationbar";
import Layout from "../assets/styles/Layout";

import { Helmet } from "react-helmet-async"; // meta optimization import


export default function ProfilePage() {
  const userId = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const savedTag = localStorage.getItem("player_tag");

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGames(data.games);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId]);

  return (
    <Layout>
        <Helmet>
          <title>Project AA – Profile</title>

          <meta
            name="description"
            content="project aa profile page where is player id, username and playertag and gamehistory."
          />

          <meta
            name="keywords"
            content="profile, projectaa"
          />

          {/* Sosiaalisen median esikatselu */}
          <meta property="og:title" content="Project AA – Sivun nimi" />
          <meta
            property="og:description"
            content="project aa profile page where is player scores and history of games."
          />
          <meta property="og:type" content="website" />
      </Helmet>

      <Title>
        Project AA – Profile
      </Title>

      <NavigationBar />

      <Title>Profile Page</Title>

      {/* User info cards */}
      <SimpleGrid cols={3} spacing="lg">
        <Card shadow="md" radius="md" padding="lg">
          <Text fw={600}>Player ID:</Text>
          <Text>{userId}</Text>
        </Card>

        <Card shadow="md" radius="md" padding="lg">
          <Text fw={600}>Username:</Text>
          <Text>{username}</Text>
        </Card>

        <Card shadow="md" radius="md" padding="lg">
          <Text fw={600}>Player Tag:</Text>
          <Text>{savedTag}</Text>
        </Card>
      </SimpleGrid>

      {/* Game history */}
      <Stack spacing="lg" mt="xl" align="center">
        <Title order={2}>Game History</Title>

        <Stack spacing="md">
          {games.map((game, index) => (
            <Card key={index} shadow="sm" radius="md" padding="lg">
              <Title order={3}>{game.game_name}</Title>

              <Text>
                <strong>Alltime Scores:</strong> {Math.round(game.total_score)}
              </Text>

              <Text>
                <strong>Total Time:</strong> {Math.round(game.total_time)} seconds
              </Text>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Layout>
  );
}