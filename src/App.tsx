/**
 * App.tsx
 * 
 * is 36 a magic number? well i have no immediate plans to
 * change the board size but if i did, i guess it is
 * well definitely in any case its a magic number but i feel
 * like this is simple enough to understand ...
 * 
 * @import React - for some purpose
 * @import useState - for dynamic changes
 * @import useEffect - for listening to keypresses "side effects"
 * @import Square - `Square` component
 * @import Top - title bar component 
 */
import React, { useState, useEffect } from "react";
import Square from "./Square.tsx";
import Top from "./Top.tsx"

/**
 * @function App
 * @extends React.FC (functional component syntax)
 * @returns our app in all of its glory
 * TODO maybe refactor so this is just Grid.tsx ?
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
     * track square groupings by adjacency and matching colors
     */
    const [squareGroupings, setSquareGroupings] = useState<number[][]>(() => []);

    /**
     * square color enumeration, 0-3
     * className="square red"
     */
    const colors =
    [
        "red", 
        "green",
        "blue",
        "brown"
    ];

    /**
     * @call useEffect() on component mount
     * 
     * pass a CALLBACK FUNCTION as the first argument,
     * which adds an event listener to `document`
     * which listens for key press events`keydown`, subsequently calling `handleKeyDown`
     * 
     * the second argument is the DEPENDENCY ARRAY
     * useEffect() is called when the state of a dependency changes
     * @dependency [] the dependency array is EMPTY, this function only calls ONCE,
     * upon initial component mount
     * 
     * we also initialize the board and find initial square groupings
     * 
     * @return clean up event listener on component dismount to avoid memory leaks
     */
    useEffect(() =>
    {
        document.addEventListener('keydown', handleKeyDown);

        // initialize the board
        initializeBoard();

        // note that the return is also a callback function
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    /**
     * @function initializeBoard()
     * 
     * called by component mount as shown above
     * initialize board state (square colors, letters)
     * initially, none of the squares are touched,
     * and they should all be filled
     */
    const initializeBoard = () =>
    {
        const staticColors : string[] = Array(36).fill("");
        //let staticLetters : string[] = Array(36).fill("");
        const staticLetters : string[] = [...squareLetters];

        // for-each loop on the squares array
        doSquaresExist.forEach((e, index) =>
        {
            // initialize square colors
            // `randomColor` randomly generated number [0, colors.length)
            let randomColor : number = Math.floor(Math.random() * colors.length);
            staticColors[index] = colors[randomColor];
        
            // initialize square letters
            // `randomLetter` randomly generated number [0,26)
            let randomLetter = Math.floor(Math.random() * 26);
            staticLetters[index] = String.fromCharCode(randomLetter+65);
        });

        // dynamically update colors, letters, state (for some reason)
        setSquareColors(staticColors);
        setSquareLetters(staticLetters);
        setSquareState(initialState);
    }

    /**
     * @call useEffect()
     * @dependency squareColor
     * 
     * called by color updates (setSquareColor)
     * this occurs sometime after component mount and also on board moves
     * 
     * group adjacent squares that match color
     * go through each square in a way
     */
    useEffect(() =>
    {
        const staticGroupings : number[][] = [];
        // which squares have been grouped?
        const grouped : boolean[] = Array(36).fill(false);

        // iterate through all squares
        // push to staticGroupings
        // squares share grouping if they are neighbors and share same color
        doSquaresExist.forEach((e, index) =>
        {
            const numGroupings = staticGroupings.length;
            
            // push if this square not already in a grouping
            if (!grouped[index])
            {
                // note we push to staticGroupings[numGroupings]
                staticGroupings.push([index]);
                grouped[index] = true;
                // consider right and bottom neighbors
                if (index % 6 != 0 && squareColors[index] === squareColors[index+1])
                {
                    staticGroupings[numGroupings].push(index+1);
                    grouped[index+1] = true;
                }
            }

        });

        // dynamically set now
        setSquareGroupings(staticGroupings);
    }, [squareColors]);

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
        doSquaresExist.forEach((e, index) => 
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
     * @param index
     * @return true if at least one neighbor matches color and is touched
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
     * @function verifyNeighbors()
     * @param index
     * @return true if ALL neighbors that match color are touched
     */
    const verifyNeighbors = (index : number) =>
    {
        // given square `index`, check neighbors
        // must have at least one neighbor that color matches and is visited
        // cases to consider

        // 1. index >= 6
        // we can check above square
        if (index >= 6 && squareColors[index] === squareColors[index-6])
        {
            if (!squareState[index-6])
            {
                return false;
            }
        }

        // 2. index % 6 != 0
        // we can check left
        if (index % 6 != 0 && squareColors[index] === squareColors[index-1])
        {
            if (!squareState[index-1])
            {
                return false;
            }
        }

        // 3. index % 6 != 5
        // check right
        if (index % 6 != 5 && squareColors[index] === squareColors[index+1])
        {
            if (!squareState[index+1])
            {
                return false;
            }
        }

        // 4. index < 29
        // check below
        if (index < 29 && squareColors[index] === squareColors[index+6])
        {
            if (!squareState[index+6])
            {
                return false;
            }
        }

        return true;
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
        const staticState = [...squareState];
        const verifiedSquares : boolean[] = Array(36).fill(false);

        // for-each loop on squares
        doSquaresExist.forEach((e, index) =>
        {
            // TODO see if there's squares to clear
            // look through the touched blocks
            // opt to look for local copy so we can edit within execution?
            // we'll have to pass in staticState
            if (staticState[index])
            {
                // TODO algorithm for checking neighbors (color match, then if touched)
                // TODO so what we need is a function that returns an array of all
                // satisfied neighbors, then we cross check that with ...
                if (verifyNeighbors(index))
                {
                    staticColors[index] = "";
                    staticLetters[index] = "";
                }
                
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

            // note that `setKeyPressed` triggers the useEffect()
            // function that we define below,
            // where we calculate the board state
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


    return (
        <>
            <Top />
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
                    doSquaresExist.map((e, index) =>
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