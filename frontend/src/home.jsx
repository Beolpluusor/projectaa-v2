import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Jos myöhemmin tallennat käyttäjän localStorageen, tyhjennä se tässä
    localStorage.removeItem("user");

    navigate("/"); // vie takaisin login-sivulle
  };

  const userPrinter = () => {
    // Jos käyttäjätiedot tallennetaan localStorageen, voit hakea ja näyttää ne tässä
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");    
    
    return (
      <div>
        Welcome, you are player number: {user_id}
        <br />
        your user name is {username}!
        </div>
    );  
  }

  return (
    <div>
      <h1>welcome to project AA</h1>
      <NavigationBar />
      {userPrinter()}

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}