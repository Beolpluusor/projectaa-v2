import { useNavigate } from "react-router-dom";
import { Button, Group, Title, Image } from "@mantine/core";
import aaLogo from "/aalogo.png";
import Layout from "../assets/styles/Layout";
import { Helmet } from "react-helmet-async";

export default function WelcomeToAA() {
  const navigate = useNavigate();

  return (
    
    <Layout>
      <Helmet>
        <title>Project AA – welcomePage</title>

        <meta
          name="description"
          content="small arcade game site with database to update player/user gamescores and times."
        />

        <meta
          name="keywords"
          content="project aa, reaction game, snake game, hall of fame, players, small project, fun, games"
        />

        {/* Sosiaalisen median esikatselu */}
        <meta property="og:title" content="Project AA - home page" />
        <meta
          property="og:description"
          content="small page for arcade games."
        />
        <meta property="og:type" content="website" />
      </Helmet>


      <Title order={1}>Project AA</Title>

      <Image src={aaLogo} alt="Logo" width={200} height={200} fit="contain" />

      <Group>
        <Button onClick={() => navigate("/Login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Group>
      
    </Layout>
  
  );
}