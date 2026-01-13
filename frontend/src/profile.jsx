import NavigationBar from "./navigationbar";

export default function ProfilePage() {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");    

    return (
        <div>
            <h1>Profile Page</h1>
            <NavigationBar />
            <p>Your User ID: {user_id}</p>
            <p>Your Username: {username}</p>
            
        </div>
    );
}