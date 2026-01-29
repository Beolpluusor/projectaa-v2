import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Title, Text } from "@mantine/core";
import Layout from "../assets/styles/Layout";

export default function RegisterNewUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [player_tag, setPlayerTag] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        player_tag
      });

      if (response.data.message === "user_created") {
        alert("New user created");
        navigate("/login");
      }

      if (response.data.message === "user_exists") {
        alert("User already exists");
        navigate("/register");
      }

      if (response.data.message === "missing_fields") {
        alert("Fill all the fields, no empty fields allowed");
        navigate("/register");
      }

    } catch (err) {
      console.error(err);
      alert("Error in server");
    }
  };

  return (
    <Layout>
      <Title>
        Register
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

        <input
          type="text"
          placeholder="Player Tag"
          maxLength={50}
          value={player_tag}
          onChange={(e) => setPlayerTag(e.target.value)}
        />
      </Stack>

      <Stack spacing="md" align="center">
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={() => navigate("/")}>Back to mainpage</Button>

        <Text size="sm" c="dimmed">
          Remember to fill all the boxes, password is max 4 length.
        </Text>
      </Stack>
    </Layout>
  );
}