import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password
      });

      if (response.data.message === "login_success") {
        // setting user_id localStorage, this denies the need to login again when refreshing the page
        localStorage.setItem("user_id", response.data.user); // id
        localStorage.setItem("username", response.data.username); // username
        localStorage.setItem("player_tag", response.data.player_tag); // player tag
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
    <div>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>
      <p>new user? then click the register button to get in the fun</p>

      <button onClick={() => navigate("/")}>Back to mainpage</button>
    </div>
  );
}

