import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";

export default function Home() {
  const navigate = useNavigate();
  const Header = () => <header><h1>this is where the fun begins</h1></header>;
  const Footer = () => <footer><p>© 2026 Project AA by Arttu Sonne</p></footer>;
  const Information = () => (
    <div>
      <h2>simple arcade game page</h2>
      <p>made by Arttu Sonne</p>
      <p>simple arcade game page, point of this game is to learn how to build this kind of simple singlepage app.</p>
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
  }

  // Pääkomponentin renderöinti
  return (
    <div>
      <h1>Project AA - Home</h1>
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