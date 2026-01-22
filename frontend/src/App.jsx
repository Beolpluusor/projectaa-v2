import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import RegisterNewUser from "./pages/register";
import ProfilePage from "./pages/profile";
import PlayerListIn from "./pages/playerlistin";
import ReactionGame from "./games/ReactionGame";
import Snake from "./games/Snake";

import "./assets/styles/App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterNewUser />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/playerlistin" element={<PlayerListIn />} />
        <Route path="/reactiongame" element={<ReactionGame />} />
        <Route path="/snake" element={<Snake />} />
        
      </Routes>
    </BrowserRouter>
  );
}