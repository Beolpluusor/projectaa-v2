import { useNavigate } from "react-router-dom";
import { Button, Group, Title, Image } from "@mantine/core";
import aaLogo from "/aalogo.png";
import Layout from "../assets/styles/Layout";

export default function WelcomeToAA() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Title>
        Project AA
      </Title>

      <Image src={aaLogo} alt="Logo" width={200} height={200} />

      <Group>
        <Button onClick={() => navigate("/Login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </Group>
    </Layout>
  );
}