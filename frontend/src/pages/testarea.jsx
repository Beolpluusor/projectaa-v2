import { useNavigate } from "react-router-dom";
import NavigationBar from "./navigationbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TestArea() {

    function Tervehdys() {
        const [alien, setAlien] = useState('');

        return (
            <div>
                <h2>Hello {alien || "Alien"}</h2>
                <input
                    type="text"
                    placeholder="what alien are you?"
                    value={alien}
                    onChange={(e) => setAlien(e.target.value)}
                    />
            </div>
        )
    }

    const NimiMuunnin = function() {
        const [nimi, setNimi] = useState('');
        return (
            <div>
                <input
                    type="text"
                    value={nimi}
                    onChange={(e) => setNimi(e.target.value)}
                    />
                    <p>Hei: {nimi}</p>
            </div>
        );
    }

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
            <hr />
            <div>
                <p>kirjoita nimi</p>
                <NimiMuunnin /> 
            </div>
            <hr />
            <Tervehdys />
        </div>
    )
}