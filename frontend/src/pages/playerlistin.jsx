import { useEffect, useState } from "react";

import { Title, Text, Stack, Card, SimpleGrid } from "@mantine/core";
import NavigationBar from "./navigationbar";
import Layout from "../assets/styles/Layout";
import { apiPost } from "../api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [gamesDisplay, setGames] = useState([]);

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await apiPost("/players");

        if (response.data.status === "ok") {
          setUsers(response.users);
        }
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };

    loadUsers();
  }, []);

  // Load games
  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await apiPost("/games");

        if (response.data.status === "ok") {
          setGames(response.gamename);
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
        Project AA – Database Page
      </Title>

      <NavigationBar />

      {/* USERS SECTION */}
      <Stack spacing="md" align="center" mt="xl">
        <Title order={2}>All Users</Title>

        {users.length === 0 && (
          <Text size="sm" c="dimmed">
            No users found
          </Text>
        )}

        <SimpleGrid cols={3} spacing="md">
          {users.map((u) => (
            <Card key={u.id} shadow="sm" radius="md" padding="lg">
              <Text fw={600}>{u.username}</Text>
              <Text size="sm">Tag: {u.PLAYER_TAG}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>

      {/* GAMES SECTION */}
      <Stack spacing="md" align="center" mt="xl">
        <Title order={2}>Game Titles in Database</Title>

        {gamesDisplay.length === 0 && (
          <Text size="sm" c="dimmed">
            No games found
          </Text>
        )}

        <SimpleGrid cols={3} spacing="md">
          {gamesDisplay.map((g) => (
            <Card key={g.GAMEID} shadow="sm" radius="md" padding="lg">
              <Text fw={600}>Game ID: {g.GAMEID}</Text>
              <Text>Game Name: {g.GAMENAME}</Text>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
}