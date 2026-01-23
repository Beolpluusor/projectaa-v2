import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TestArea() {

    const Laskuri = function() {
        // 1. lataa arvo localstoragesta tai aloita nollasta
        const [count, setCount] = useState(() => {
            const saved = localStorage.getItem("count");
            return saved ? Number(saved) : 0;
        });
        // 2. aja aina kun count muuttuu -> tallenna localstorageen
        useEffect(() => {
            localStorage.setItem("count", count);
        }, [count]);

        // 3. aja vain kerran sivun latauksessa
        useEffect(() => {
            console.log("komponentti ladattu");
        }, []);

        return (
            <div>
                <h2>Laskuri: {count}</h2>
                <button onClick={() => setCount(count +1)}>lisää</button>
                <button onClick={() => setCount(0)}>nollaa</button>
            </div>
        )
    }
    return (
        <div>
            <h1>Test environment</h1>
            <NavigationBar />
            <Laskuri />
        </div>
    )
}