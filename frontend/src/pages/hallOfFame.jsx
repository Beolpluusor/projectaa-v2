import { useEffect, useState } from "react";
import { Title, Text, Card, Table, Stack } from "@mantine/core";
import NavigationBar from "./navigationbar";
import Layout from "../assets/styles/Layout";

import { Helmet } from "react-helmet-async"; // meta optimization import

export default function HallOfFame() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/hall_of_fame")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error");
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }
        setPlayers(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load Hall of Fame");
      });
  }, []);

  if (error) {
    return (
      <Layout>
        <Title order={1}>Hall of Fame</Title>
        <Text c="red">{error}</Text>
      </Layout>
    );
  }

  const sortedPlayers = [...players].sort(
    (a, b) => b.total_score - a.total_score
  );

  return (
    <Layout>
        <Helmet>
          <title>Project AA – HallOfFame</title>

          <meta
            name="description"
            content="hall of fame page where are listed top players."
          />

          <meta
            name="keywords"
            content="profile, projectaa, halloffame, scoreslist, scores"
          />

          <link rel="canonical" href="https://yourdomain.com/currentpage" />

          {/* Sosiaalisen median esikatselu */}
          <meta property="og:title" content="Project AA – HallOfFame" />
          <meta
            property="og:description"
            content="halloffame page where are top layers listed."
          />
          <meta property="og:type" content="website" />
      </Helmet>
      <Title>
        Project AA – Hall of Fame
      </Title>

      <NavigationBar />

      <Card shadow="md" radius="md" padding="xl" mt="xl" w="100%">
        <Stack spacing="lg" align="center">
          <Title order={2}>Top 10 Players</Title>

          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Rank</Table.Th>
                <Table.Th>Player</Table.Th>
                <Table.Th>Total Score</Table.Th>
                <Table.Th>Games Played</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {sortedPlayers.slice(0, 10).map((p, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{index + 1}</Table.Td>
                  <Table.Td>{p.PLAYERNAME}</Table.Td>
                  <Table.Td>{Math.round(p.total_score)}</Table.Td>
                  <Table.Td>{p.games_played}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </Layout>
  );
}