import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import { Title, Text, Stack } from "@mantine/core";
import Layout from "../assets/styles/Layout";

import { Helmet } from "react-helmet-async"; // meta optimization import

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
      <Helmet>
        <title>Project AA – Home</title>

        <meta
          name="description"
          content="project aa homepage where is greetings to user and updates if theres something changed on site."
        />

        <meta
          name="keywords"
          content="project aa, reaction game, snake game, hall of fame, players, database"
        />

        <link rel="canonical" href="https://yourdomain.com/currentpage" />
        
        {/* Sosiaalisen median esikatselu */}
        <meta property="og:title" content="Project AA – Sivun nimi" />
        <meta
          property="og:description"
          content="Lyhyt kuvaus sivusta sosiaalisen median esikatselua varten."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Title>
        Project AA - Home
      </Title>
      <NavigationBar />
      <UserPrinter />
      <Footer />
    </Layout>
  );
}