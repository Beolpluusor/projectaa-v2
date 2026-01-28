import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core'


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
            <Button onClick={() => navigate('/home')}>Home</Button>
            <Button onClick={() => navigate('/profile')}>Profile</Button>
            <Button onClick={() => navigate('/playerlistin')}>DataBase information</Button>
            <Button onClick={() => navigate('/gamespage')}>Games</Button>
            <Button onClick={() => navigate('/halloffame')}>Hall of Fame</Button>
            <Button onClick={handleLogout}>Logout</Button>
            
        </nav>
    );
}