/**
 * App.tsx
 * 
 * is 36 a magic number? well i have no immediate plans to
 * change the board size but what if i did, i guess it is
 * well definitely in any case its a magic number but i feel
 * like this is simple enough to understand ...
 * 
 * @import useState - for dynamic changes
 * @import useEffect - for listening to keypresses "side effects"
 * @import useRef - link between `App` and `Square`
 * @import Square - from the current directory, to Square.tsx, for `Square` component
 */
import React, { useState, useEffect } from "react";
import Square from "./Square.tsx";

/**
 * @function App
 * @extends React.FC (functional component syntax)
 * @returns our app in all of its glory
 */
const App: React.FC = () =>
{
    const [keyPressed, setKeyPressed] = useState<string>("");
    const [keyString, setKeyString] = useState<string>("");
    /**
     * we use an array (mutable value) for the board squares
     * 2 solutions
     * 
     * 1: declare an initial array, pass that as initial state,
     *    rather than directly delaring it within `useState`
     * 
     * 2: use functional syntax of useState
     *    ex: useState(() => Array(36).fill(false))
     */
    const [doSquaresExist, setSquaresExist] = useState<boolean[]>(() => Array(36).fill(true));
    const [squareColors, setSquareColors] = useState<string[]>(() => Array(36).fill(""));
    const [squareLetters, setSquareLetters] = useState<string[]>(() => Array(36).fill(""));
    const initialState : boolean[] = Array<boolean>(36).fill(false);
    const [squareState, setSquareState] = useState<boolean[]>(initialState);

    /**
     * square color enumeration, 0-3
     */
    const colors =
    [
        "red", 
        "green",
        "blue",
        "brown"
    ];

    // id="top" 
    var head = document.getElementById("top");

    /**
     * set functionality for mouse entering top banner
     * 
     * @function handleMouseEnter
     */
    const handleMouseEnter = () =>
    {
        head ? head.style.color = "#101010" : null;
    }

    /**
     * functionality for mouse leaving top banner
     * 
     * @function handleMouseLeave
     */
    const handleMouseLeave = () =>
    {
        head ? head.style.color = "#efefef" : null;
    }

    /**
     * we want to initialize board state (square colors, letters)
     * 
     * @function initializeBoard()
     */
    const initializeBoard = () =>
    {
        const staticColors : string[] = Array(36).fill("");
        //let staticLetters : string[] = Array(36).fill("");
        const staticLetters : string[] = [...squareLetters];

        // for-each loop on the squares array
        doSquaresExist.forEach((existence, index) =>
        {
            // start with square colors
            // `randomColor` randomly generated number [0, colors.length)
            let randomColor : number = Math.floor(Math.random() * colors.length);
            staticColors[index] = colors[randomColor];
        
            // now square letters
            // `randomLetter` randomly generated number [0,26)
            let randomLetter = Math.floor(Math.random() * 26);
            staticLetters[index] = String.fromCharCode(randomLetter+65);
        });

        console.log(staticLetters);

        // dynamically update colors, letters, state (for some reason)
        setSquareColors(staticColors);
        setSquareLetters(staticLetters);
        setSquareState(initialState);
    }

    /**
     * called by keypresses as needed- determine which squares
     * are touched by the key pressed
     * 
     * @function calculateBoard()
     */
    const calculateBoard = (key : string) =>
    {
        let staticState = [...squareState];

        // console.log(`hello ${key}`);
        // console.log(squareLetters);

        // square array for-each
        doSquaresExist.forEach((existence, index) => 
        {
            // if square is not `touched`
            if (!squareState[index])
            {
                // key matches this square
                if (key === squareLetters[index])
                {
                    // TODO probably pass staticState to an external function
                    // that checks if the neighbors color match and are touched
                    staticState[index] = checkNeighbors(index);
                }
            }
        });

        setSquareState(staticState);
    }

    /**
     * 
     * @function checkNeighbors
     */
    const checkNeighbors = (index : number) =>
    {
        // pre-requisite: something has to be touched first
        // funny solution to use toString but it works
        // you could check with console.log
        // console.log(Array(36).fill(false).toString());
        if (squareState.toString() === Array(36).fill(false).toString())
        {
            return true;
        }

        // given square `index`, check neighbors
        // must have at least one neighbor that color matches and is visited
        // cases to consider

        // 1. index >= 6
        // we can check above square
        if (index >= 6)
        {
            if (squareState[index-6] && squareColors[index] === squareColors[index-6])
            {
                return true;
            }
        }

        // 2. index % 6 != 0
        // we can check left
        if (index % 6 != 0)
        {
            if (squareState[index-1] && squareColors[index] === squareColors[index-1])
            {
                return true;
            }
        }

        // 3. index % 6 != 5
        // check right
        if (index % 6 != 5)
        {
            if (squareState[index+1] && squareColors[index] === squareColors[index+1])
            {
                return true;
            }
        }

        // 4. index < 29
        // check below
        if (index < 29)
        {
            if (squareState[index+6] && squareColors[index] === squareColors[index+6])
            {
                return true;
            }
        }

        return false;
    }

    /**
     * called by spacebar
     * check the path and clear good ones
     * 
     * @function clearBoard()
     */
    const clearBoard = () =>
    {
        // TODO check path, clear things as necessary
        const staticColors = [...squareColors];
        const staticLetters = [...squareLetters];

        // for-each loop on squares
        doSquaresExist.forEach((existence, index) =>
        {
            // TODO see if there's squares to clear
            // look through the touched blocks
            if (squareState[index])
            {
                // TODO algorithm for checking neighbors (color match, then if touched)
                staticColors[index] = "";
                staticLetters[index] = "";
            }
        });

        // TODO set timeout
        // probably need to call another function? maybe we need another piece of state,
        // triggers when we change it here,
        // then we useEffect to have it call this setTimeout
        // and then re-balance the squares
        setTimeout(() =>
        {

        }, 500); // ms

        // dynamically update colors, letters, state
        setSquareColors(staticColors);
        setSquareLetters(staticLetters);
        setSquareState(initialState);
    }

    /**
     * detect when the user presses a key
     *
     * case: `event.key` is spacebar
     * clear the path
     * 
     * case: `event.key` alphabetical
     * we set the key to uppercase, update state of `keyPressed`
     *
     * otherwise we ignore the press
     *  
     * @function handleKeyDown()
     * @param event key press
     */
    const handleKeyDown = (event: any) =>
    {
        if (event.key === " ")
        {
            // reset the key string
            setKeyPressed(" ");
            setKeyString("");
            
            // clear the board
            // clearBoard();
        }
        /**
         * event.which is deprecated but still usable
         * note `setKeyPressed`
         * triggers listeneres that list `pressedKey`
         * as a dependency (squares)
         */
        else if (65 <= event.which && event.which <= 90)
        {
            // TODO calculate board state

            // functional declaration for setKeyString
            setKeyPressed(event.key.toUpperCase());
            setKeyString((keyString) => keyString + event.key.toUpperCase());

            // calculate board state (with given key)
            // calculateBoard(event.key.toUpperCase());
        }
    }

    /**
     * we need to do it like THIS so we maintain the state
     * 
     * @dependency keyPressed
     */
    useEffect(() =>
    {
        if (keyPressed === " ")
        {
            clearBoard();
        }
        else
        {
            calculateBoard(keyPressed);
        }
    }, [keyPressed]);

    /**
     * useEffect() was imported from "react", and we call it here
     * 
     * we pass a CALLBACK FUNCTION as the first argument, 
     * 
     * our callback function adds an event listener to `document`
     * which listens for key presses `keydown` and subsequently calls `handleKeyDown`
     * 
     * the second argument is the DEPENDENCY ARRAY
     * typically, when the state of a dependency changes, this function is called
     * since the dependency array is EMPTY, this function is only called ONCE, upon initial component mount
     * 
     * @call useEffect()
     * @dependency none
     * @return clean up event listener on component dismount to avoid memory leaks
     */
    useEffect(() =>
    {
        document.addEventListener('keydown', handleKeyDown);

        // initialize the board
        initializeBoard();

        // note that the return is also a callback function
        // prevents memory leaks
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
                    {
                    /**
                     * map function on array `doSquaresExist`
                     * uses a CALLBACK FUNCTION
                     * the arguments' names are arbitrary
                     * 
                     * first argument gives the value of array at index
                     * second argument gives the index
                     * third optional argument provides a reference to the ARRAY itself
                     * 
                     * @var childState value of current element in array
                     * @var index index of current element
                     */
                    doSquaresExist.map((existence, index) =>
                    (
                        <Square
                            color = {squareColors[index]}
                            letter = {squareLetters[index]}
                            key = {index}
                            //state = {childState}
                            state = {squareState[index]}
                        />
                    ))
                    }
                </div>
            </div>
        </>
    );
}

// declare this file's export
export default App;