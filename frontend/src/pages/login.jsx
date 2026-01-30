import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Title, Text } from "@mantine/core";
import Layout from "../assets/styles/Layout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.1.198/login", {
        username,
        password
      });

      if (response.data.message === "login_success") {
        localStorage.setItem("user_id", response.data.user);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("player_tag", response.data.player_tag);
        alert("Login successful");
        navigate("/home");
      }

      if (response.data.message === "invalid_credentials") {
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