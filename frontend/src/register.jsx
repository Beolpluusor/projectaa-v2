import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        navigate("/home");
      }
      if (response.data.message === "user_exists") {
        alert("User already exists");
        navigate("/register");
      }
      
    } catch (err) {
      console.error(err);
      alert("Error in server");
    }
  };

  return (
    <div>
      <h2>Register</h2>

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
        maxLength={4}
        value={player_tag}
        onChange={(e) => setPlayerTag(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <br />
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  );
}




