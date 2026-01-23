import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";

export default function HallOfFame() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Hall of Fame</h1>
            <NavigationBar />
            
        </div>
    );
}