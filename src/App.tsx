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
        var head = document.getElementById("top");
        var middle = document.getElementById("middle")
        var grid = document.getElementById("grid");

        if (grid && middle)
        {
            var height = grid.style.getPropertyValue('height');
            if (height)
            {
                setValue("" + height);
            }
        }
        else
        {
            setValue("lol!!");
        }
        
        // ensure not null
        if (head)
        {
            head.style.color = "#101010";
            // add/remove classes
            // head.classList.add("something");
        }
        
    }

    function handleMouseLeave ()
    {
        // setValue(value + "\b\b\b\b");

        var head = document.getElementById("top");
        
        // ensure not null
        if (head)
        {
            head.style.color = "#efefef";
        }
    }

    return (
        <>
            <div id="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                psychic fiesta
            </div>

            <div id="middle">
                <div id="grid">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>

                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>

                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>

                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
            </div>

            
        </>
    );
}