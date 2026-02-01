import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Title, Text } from "@mantine/core";
import Layout from "../assets/styles/Layout";
import { apiPost } from "../api";

// tee import apipots kaikkiin tietokanta pyyntöihin ja muist importit
// katso tältä sivulta esimerkki handlelogin kohdasta
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await apiPost("/login",  {
        username,
        password
      });

      if (response.message === "login_success") {
        localStorage.setItem("user_id", response.user);
        localStorage.setItem("username", response.username);
        localStorage.setItem("player_tag", response.player_tag);

        alert("Login successful");
        navigate("/home");
      }

      if (response.message === "invalid_credentials") {
        alert("wrong password or username");
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      alert("Error in server");
    }
  };

  return (
    <Layout>
      <Title>
        Login
      </Title>

      <Stack spacing="sm" align="center">
        <input
          type="text"
          placeholder="Username"
          maxLength={20}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack spacing="md" align="center">
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={() => navigate("/")}>Back to mainpage</Button>

        <Text size="sm" c="dimmed">
          new user? then click the register button to get in the fun
        </Text>
      </Stack>
    </Layout>
  );
}