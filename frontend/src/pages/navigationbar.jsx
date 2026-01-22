import { useNavigate } from 'react-router-dom';


export default function NavigationBar() {
  const navigate = useNavigate();
    const handleLogout = () => {
      // Jos myöhemmin tallennat käyttäjän localStorageen, tyhjennä se tässä
      localStorage.removeItem("user");

      navigate("/"); // vie takaisin login-sivulle
    };
    return (
        <nav style={{
            display: 'flex',
            gap: '20px',
            padding: '10px',
            background: "#eee"
        }}>
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button onClick={() => navigate('/playerlistin')}>DataBase information</button>
            <button onClick={() => navigate('/reactiongame')}>Reaction Game</button>
            <button onClick={() => navigate('/snake')}>Snake Game</button>
            <button onClick={handleLogout}>Logout</button>
            
        </nav>
    );
}