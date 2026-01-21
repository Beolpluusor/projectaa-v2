import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";

export default function Home() {
  const navigate = useNavigate();
  const Header = () => <header><h1>this is where the fun begins</h1></header>;
  const Footer = () => <footer><p>© 2026 Project AA by Arttu Sonne</p></footer>;
  const Information = () => (
    <div>
      Login system - works fine<br />
      Database connection - works fine<br />
      Frontend and Backend connection - works fine<br />
      first game added "reaction game" , feel free to test your skills!<br />
      More features coming soon!
    </div>
  );

  const handleLogout = () => {
    // Jos myöhemmin tallennat käyttäjän localStorageen, tyhjennä se tässä
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("player_tag");

    navigate("/"); // vie takaisin login-sivulle
  };

  const UserPrinter = () => {
    // Jos käyttäjätiedot tallennetaan localStorageen, voit hakea ja näyttää ne tässä
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");    
    const player_tag = localStorage.getItem("player_tag");
    
    return (
      <div className="user-info">
        Welcome, you are player number: {user_id}
        <br />
        your user name is: {username}!
        <br />
        your player tag is: {player_tag}!
      </div>
    )


    return (
      <div>
        <userPrinter />
        </div>
    );  
  }

  // Pääkomponentin renderöinti
  return (
    <div>
      <h1>welcome to project AA</h1>
      <NavigationBar />
      <Header />
      <UserPrinter />
      <br />
      <Information />
      <Footer />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}