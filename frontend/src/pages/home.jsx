import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import { Title, Text, Stack } from "@mantine/core";
import Layout from "../assets/styles/Layout";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("player_tag");

    navigate("/");
  };

  const UserPrinter = () => {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const player_tag = localStorage.getItem("player_tag");

    return (
      <Stack spacing={4} align="center">
        <Text>Welcome {player_tag}</Text>
        <Text>are you ready to destroy your keyboard and mouse!</Text>
        <Text>there are only 2 games to play at this time, snake and reaction, more games in production.</Text>
      </Stack>
    );
  };

  const Footer = () => (
    <Text size="sm" c="dimmed">
      © 2026 Project AA by Arttu Sonne
    </Text>
  );

  return (
    <Layout>
      <Title>
        Project AA - Home
      </Title>
      <NavigationBar />
      <UserPrinter />
      <Footer />
    </Layout>
  );
}