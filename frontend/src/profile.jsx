import NavigationBar from "./navigationbar";
import PubgStats from "./pubgstats";
import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username"); 
    const savedTag = localStorage.getItem("player_tag");

const changePlayerTag = async () => {
    const newTag = prompt("Enter your new Player Tag:", savedTag);

    if (newTag && newTag !== savedTag) {
        try {
            const response = await axios.post("http://localhost:5000/update_player_tag", {
                user_id,
                new_player_tag: newTag
            });

            if (response.data.status === "ok") {
                alert("Player Tag updated successfully");
                savedTag = newTag;
                window.location.reload();
            }

            if (response.data.status === "error") {
                alert("Error updating Player Tag: " + response.data.message);
            }

        } catch (error) {
            console.error("Error updating Player Tag:", error);
            alert("Failed to update Player Tag");
        }
    }
};

        
    return (
        <div>
            <h1>Project AA</h1>
            <NavigationBar />
            <h2>Profile Page</h2>
            
            <div className="dashboard-card">
                <div className="card">Player ID: {user_id}</div>
                <div className="card">Username: {username}</div>
                <div className="card">Player Tag: {savedTag}</div>
                <button onClick={changePlayerTag}>Change Player Tag</button>
            </div>
        </div>
    );
}