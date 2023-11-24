/**
 * App.tsx
 * 
 * lets burn everything for now
 * 
 * @import useState - for dynamic changes
 * @import useEffect - for listening to keypresses "side effects"
 * @import useRef - link between `App` and `Square`
 * @import Square - from the current directory, to Square.tsx, for `Square` component
 */
import React, { useState, useEffect, useRef } from "react";
import Square from "./Square.tsx";


/**
 * @function App
 * @returns our app in all of its glorydwq
 */
const App: React.FC = () =>
{
    const [keyPressed, setKeyPressed] = useState<string>("");
    const [keyString, setKeyString] = useState<string>("");
    const childrenSquares = useRef();

    // given index...
    // 
    // childrenSquares.current[index].current.toggle();
    //
    // <Square ref={childrenSquares.current[0]} />

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
        head ? head.style.color = "#efefef" : null;
    }


    /**
     * we extract the pressed `key`
     * if `key` is alphabetical, we set the key to uppercase, and update `keyPressed` state
     * 
     * @function handleKeyDown()
     * @param event key press
     */
    const handleKeyDown = (event: any) =>
    {
        /**
         * custom functionality spacebar
         */
        if (event.key === " ")
        {
            setKeyPressed(event.key);
            setKeyString("");
        }
        /**
         * event.which is supposed to be deprecated but i'll use it anyway
         * determine if the key pressed was alphabetical
         * (this triggers things that dependent on `keyPressed` such as within `Square` component)
         */
        else if (65 <= event.which && event.which <= 90)
        {
            setKeyPressed(event.key.toUpperCase());
            setKeyString((keyString) => keyString + event.key.toUpperCase());
        }
    }

    /**
     * useEffect() was imported from "react", and we call it here
     * 
     * we pass in a CALLBACK FUNCTION as the first argument, which is executed...
     * 
     * our callback function adds an event listener to the `document`
     * so we listen for key presses and subsequently call `handleKeyDown`
     * 
     * the second argument is the DEPENDENCY ARRAY
     * typically, when the state of a dependency changes, this function is called
     * since the dependency array is EMPTY, this function is only called ONCE, upon initial component mount
     * 
     * @call useEffect()
     * @dependency none
     * @return clean up event listener on component dismount to avoid memory leaks
     */
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // note that the return is also a callback function
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <div id="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                psychic fiesta
            </div>

            <div id="keyState">{keyString}</div>

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

// declare this file's export
export default App;