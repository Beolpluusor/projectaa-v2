import { useNavigate } from "react-router-dom";


import aaLogo from "/aalogo.png";

export default function WelcomeToAA () {
    const navigate = useNavigate();

    return (
        <div className="main-page">
            <h1>Project AA</h1>
            <img src={aaLogo} alt="Logo" width="200" height="200"/>
            <button onClick={() => navigate("/Login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}