/**
 * App.tsx
 * 
 * lets burn everything for now
 * 
 * @import useState - for dynamic changes
 * @import useEffect - for listening to keypresses "side effects"
 * @import Square - from the current directory, to Square.tsx, for `Square` component
 */
import React, { useState, useEffect } from "react";
import Square from "./Square.tsx";


/**
 * @class App
 * @returns our app in all of its glory
 */
const App = () =>
{
    const [keyPressed, setKeyPressed] = useState<String>("");

    // head id
    var head = document.getElementById("top");

    const handleMouseEnter = () =>
    {
        // ensure not null
        if (head)
        {
            head.style.color = "#101010";
            // add/remove classes
            // head.classList.add("something");
        }
    }

    const handleMouseLeave = () =>
    {
        // ensure not null
        if (head)
        {
            head.style.color = "#efefef";
        }
    }


    /**
     * @function handleKeyDown()
     * @param event keypress
     * 
     * we extract the pressed `key`
     * check if its alphabetical
     * 
     * if it IS, we set the key to uppercase, and set `pressedKey` to it
     */
    const handleKeyDown = (event: any) =>
    {
        /**
         * event.which is supposed to be deprecated but i'll use it anyway
         * to determine if the key pressed was alphabetical
         */
        console.log(event.which);
        if (65 <= event.which && event.which <= 90)
        {
            setKeyPressed(event.key.toUpperCase());
        }
    }

    /**
     * ok trying to grasp understanding this,
     * @function useEffect()
     * 
     * we import this function from `React` at the top of this document,
     * and we call it here
     * 
     * we pass in a CALLBACK FUNCTION as the first argument,
     * which contains the code that we want to execute when this function is called
     * 
     * the second argument is an EMPTY DEPENDENCY ARRAY
     * typically, when a dependency in the array changes, it calls this function
     * 
     * since the dependency array is EMPTY, this function is only called ONCE, when the component initially mounts
     */
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // clean up event listener on component dismount (avoid memory leak)
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div id="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                psychic fiesta
            </div>

            <div id="keyState">{keyPressed}</div>

            <div id="middle">
                

                <div id="grid">
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />

                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                    <Square pressedKey={keyPressed} />
                </div>
            </div>
        </>
    );
}

// declare our export
export default App;