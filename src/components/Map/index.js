import React, { useState } from 'react'
import Game from "../Game"

const Map = () => {
    const [size, setSize] = useState(5);
    const [isStart, setIsStart] = useState(false);

    const handleChange = (e) => {
        setSize(e.target.value);
    }
    
    const handleSubmit = (e) => {
        if (size < 5) {
            e.preventDefault();
            return alert("Board size must be at least 5.");
        }
        else
            setIsStart(true);
    }

    return isStart === false ? (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Input board size: 
                    <input type="number" value={size} onChange={(e) => handleChange(e)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
        ) : (
            <div>
                <button
                    className="button" 
                    onClick={() => setIsStart(false)}>
                    New Game
                </button>
                <Game size={size}/>
            </div>
        )   
}

export default Map;
