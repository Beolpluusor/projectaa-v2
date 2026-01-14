import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import RegisterNewUser from "./register";
import ProfilePage from "./profile";
import PubgStats from "./pubgstats";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterNewUser />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pubgstats" element={<PubgStats />} />
      </Routes>
    </BrowserRouter>
  );
}