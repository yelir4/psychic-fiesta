/**
 * App.tsx
 * 
 * lets burn everything for now
 */
import { useState } from "react";


/**
 * 
 * @returns our App
 */
export default function App ()
{
    const [value, setValue] = useState(String(""));

    function handleMouseEnter ()
    {
        setValue("psychic fiesta");
    }

    function handleMouseLeave ()
    {
        setValue(value + "\b\b\b\b");
    }

    return (
        <>
            <div id="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="square">
                    {value}
                </div>
                psychic fiesta
            </div>
        </>
    );
}