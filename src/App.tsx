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

        var head = document.getElementById("top");
        
        // ensure not null
        if (head)
        {
            head.style.height = "400px";
            // add/remove classes
            // head.classList.add("something");
        }
        
    }

    function handleMouseLeave ()
    {
        setValue(value + "\b\b\b\b");

        var head = document.getElementById("top");
        
        // ensure not null
        if (head)
        {
            head.style.height = "30%";
        }
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