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
    // `count` square count
    const count = 36;
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
    const [doSquaresExist, setSquaresExist] = useState<boolean[]>(() => Array(count).fill(true));
    const [squareColors, setSquareColors] = useState<string[]>(() => Array(count).fill(""));
    const [squareLetters, setSquareLetters] = useState<string[]>(() => Array(count).fill(""));
    const initialState : boolean[] = Array<boolean>(count).fill(false);
    const [squareState, setSquareState] = useState<boolean[]>(initialState);
    /**
     * track square groupings by adjacency and matching colors
     */
    const [squareGroupings, setSquareGroupings] = useState<number[][]>(() => []);

    /**
     * square color enumeration, 0-3
     * className="square red"
     * managed in index.css
     * .square.red
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
     * called during component mount as shown above
     * initialize square colors, letters
     * initially, no squares are touched,
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

        // dynamically update colors, letters
        // (we set state after these, as shown below)
        setSquareColors(staticColors);
        setSquareLetters(staticLetters);
    }

    /**
     * @call useEffect()
     * @dependency squareColor
     * 
     * called by color updates (setSquareColor)
     * occurs after board initialization (above) and on subsequent board moves
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
        // squares are grouped if adjacent and match color
        doSquaresExist.forEach((e, index) =>
        {
            // push if this square not already in a grouping
            if (!grouped[index])
            {
                // note we push to the end of `staticGroupings`
                // following which staticGroupings.length - 1 is `groupIndex`
                staticGroupings.push([index]);
                grouped[index] = true;

                // group this square together with neighbors
                // after this function call, all square neighbors are grouped together
                calcGroupings(index, staticGroupings, grouped);
            }
        });

        // log the groupings for debugging
        console.log(staticGroupings);

        // now save the 2d array
        // also have to save the state here for some reason ...
        setSquareGroupings(staticGroupings);
        setSquareState(initialState);
    }, [squareColors]);

    /**
     * @function calcGroupings()
     * @param index square index
     * @param staticGroupings[][]
     * @param grouped[]
     * 
     * our arrays are passed in as shown above,
     * they are mutable (passed by reference) so we modify them directly
     * and changes are maintained after
     * function execution
     * 
     * we consider right, then bottom, then left neighbors
     * when looking at neighbors we also check if they've already been grouped
     */
    const calcGroupings = (index : number, staticGroupings : number[][], grouped: boolean[]) =>
    {
        const groupIndex = staticGroupings.length - 1;

        // TODO consider that now the right neighbors could already be grouped
        // consider right, bottom neighbors recursively
        if (index % 6 != 5 && !grouped[index + 1] && squareColors[index] === squareColors[index + 1])
        {
            staticGroupings[groupIndex].push(index + 1);
            grouped[index + 1] = true;

            // recursive call with the modified arrays
            calcGroupings(index+1, staticGroupings, grouped);
        }
        // now bottom neighbors
        if (index <= 29 && !grouped[index + 6] && squareColors[index] === squareColors[index + 6])
        {
            staticGroupings[groupIndex].push(index + 6);
            grouped[index + 6] = true;

            // recursive call
            calcGroupings(index+6, staticGroupings, grouped);
        }

        // left neighbors and hopefully this doesn't do something bad
        if (index % 6 != 0 && !grouped[index - 1] && squareColors[index] === squareColors[index - 1])
        {
            staticGroupings[groupIndex].push(index - 1);
            grouped[index - 1] = true;

            // recursive
            calcGroupings(index-1, staticGroupings, grouped);
        }

        // top neighbors too...
        if (index >= 6 && !grouped[index - 6] && squareColors[index] === squareColors[index - 6])
        {
            staticGroupings[groupIndex].push(index - 6);
            grouped[index - 6] = true;

            // recursive
            calcGroupings(index-6, staticGroupings, grouped);
        }
    }

    /**
     * @function calcBoard()
     * 
     * called by keypresses as needed- determine which squares
     * are touched by the key pressed
     * 
     * TODO maybe we can track groupings of touched squares here too
     * either that or we calculate on spacebar press
     * that way we can decide whether or not we clear squares
     * but we probably have to do at least some calculations here regarding
     * groupings, if we want the functionality of un-touching squares
     * if keyString doesn't match
     * 
     * TODO maybe somehow like a for-each grouping thing, where we iterate through all
     * squares in groupings that are already touched,
     * and they go through their neighbors, now if at least one of these
     * has a neighbor that is not yet touched, matches the key, then we set that
     * grouping to true, and we can keep it alive
     * 
     * otherwise each square is untouched
     * etc etc.
     * 
     * HONESTLY if we do it this way it might be best because then we don't necessary
     * have to clean or even check `keyPressed`, `keyString`, since we don't rely on that
     * for touched, and the user then just has to clear the buffer (keyString) to move on
     * 
     * maybe like, when the board has squares cleared, thats when we introduce things
     * but that has a problem with stalling? well we can say at least one move per 5 seconds
     * or something
     * and then if that isnt satisfied then the player loses
     * thats actually quite an interesting proposition if i do say so myself
     */
    const calcBoard = (key : string) =>
    {
        const staticGroupings = [...squareGroupings];
        const staticState = [...squareState];

        // case: initial state, component mount
        // for some reason it calls this function
        // with the initial keyString ""
        if (keyString === "")
        {
            // do nothing
        }
        // case: first keypress
        // touch every square with matching letter
        // first part of conditional: before first move
        // second part of conditional is after first move (keyString now starts with " ")
        else if (keyString.length === 1 || (keyString.length === 2 && keyString[0] === " "))
        {
            doSquaresExist.forEach((e, index) =>
            {
                if (key === squareLetters[index])
                {
                    staticState[index] = true;
                }
            }); 
        }
        // case: no squares are touched
        // note we use `toString()` because we don't want to compare references
        else if (staticState.toString() === initialState.toString())
        {
            console.log(`you've just pressed a key when there were already no matches`);
        }
        // else: not first keypress, but there are touched squares
        // check groupings
        else
        {
            // for each GROUP
            staticGroupings.forEach((group, index) => 
            {
                // `change` track if there is a new square touched in this group
                let change : boolean = false;
                // `groupHasTouched` track if the group has at least one touched square
                let groupHasTouched : boolean = false;

                // TODO we could also change the functionality such that,
                // it is true if there is any square in the grouping that is touched
                // in that case, the blocks dont have to be IMMEDIATELY adjacent
                // in order to type, but rather just have to be in the same grouping
                //
                // so one run through to check for a touch
                // another run to check for something new to touch (or simpler: matching letter)
                // then we don't even need checkNeighbors ...

                // for each square in the group (note we use `i` here)
                group.forEach((i, index) =>
                {
                    if (staticState[i])
                    {
                        groupHasTouched = true;
                        // would be nice to have a break() here
                        // but we would need to restructure the for loop
                    }
                });

                // second run: look for untouched matching square
                // TODO decide if it has to also be untouched (more precise input)
                // maybe not though because imagine if you have
                // one grouping with one letter, but another grouping with 2 matching letter
                // ex: X, X X
                // tapping x once should be enough to clear i think
                if (groupHasTouched)
                {
                    group.forEach((i, index) =>
                    {
                        if (key === squareLetters[i])
                        {
                            staticState[i] = true;
                            change = true;
                        }
                    });
                }

                // after checking all squares in group,
                // if no new square was touched,
                // untouch all squares in the group
                if (!change)
                {
                    group.forEach((i, index) => 
                    {
                        staticState[i] = false;
                    });
                }
            });
        }
        // dynamically update state now
        setSquareState(staticState);
    }

    /**
     * @function clearBoard()
     * 
     * called by spacebar, after the keyString had changed
     * 
     * clear each grouping if every square is touched
     * otherwise, dont
     * 
     * TODO need a timeout, then a reset
     * maybe reset doesn't come here
     */
    const clearBoard = () =>
    {
        // TODO check path, clear things as necessary
        const staticColors = [...squareColors];
        const staticExists = [...doSquaresExist];
        const staticGroupings = [...squareGroupings];
        const staticLetters = [...squareLetters];
        const staticState = [...squareState];
        // const verifiedSquares : boolean[] = Array(36).fill(false);

        console.log(`STATIC STATE ${staticState}`);

        // for-each grouping
        staticGroupings.forEach((group, index) => 
        {
            // track if all squares in this group are touched (so we can clear it)
            let allTouched : boolean = true;

            // iterate through squares in group
            // if any of them are not touched, update `allTouched`
            group.forEach((i, index) => 
            {
                if (staticState[i] === false)
                {
                    allTouched = false;
                }
            });

            // only clear groupings that are completely touched
            if (!allTouched)
            {
                group.forEach((i, index) => 
                {
                    staticState[i] = false;
                });
            }
        });

        // for-each square
        // at this point any touched squares can be cleared
        // TODO we could track points here
        // we could also just move this to the previous second run
        doSquaresExist.forEach((e, index) =>
        {
            if (staticState[index])
            {
                // console.log(index);
                // staticColors[index] = "break";
                staticExists[index] = false;
                // staticLetters[index] = "";
                // staticState[index] = false;
            }
        });

       

        // dynamically update colors, letters, state
        setSquareColors(staticColors);
        // setSquareLetters(staticLetters);
        
        // TODO set timeout
        // probably need to call another function? maybe we need another piece of state,
        // trigger here,
        // then useEffect to call setTimeout
        // and then re-balance the squares

        setTimeout(() =>
        {
            // here is where we reset state
            // TODO move down squares, then initialize new top ones
            // setSquareColors(Array(count).fill("brown"));
            setSquaresExist(staticExists);
            setSquareState(initialState);
        }, 500); // ms
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
            setKeyString(" ");
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

            // note that `setKeyString` triggers the useEffect()
            // function that we define below,
            // where we calculate the board state
        }
    }

    /**
     * we need to do it like THIS so we maintain the state
     * ok previously we had it dependent on `keyPressed` but that had issues
     * specifically regarding two adjacent letters that match color and letter
     * and we had them within a string
     * but anyhow, now we will just have it dependent on keyString, as that DOES
     * change everytime (except on subsequent spacebars? i'll take a look at that)
     * but im not sure it will affect program behavior,
     * 
     * but in any case now it should still update with the appropriate value for keyPressed?
     * hopefully? we'll see...
     * 
     * @dependency keyString
     */
    useEffect(() =>
    {
        // console.log("checking key now");

        // initial state: keystring === ""
        if (keyString === "")
        {
            // do nothing
        }
        else if (keyString === " ")
        {
            console.log("correct clear");
            clearBoard();
        }
        else
        {
            console.log(`checking ${keyString[keyString.length - 1]}`);
            calcBoard(keyString[keyString.length - 1]);
        }
    }, [keyString]);


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
                     * // TODO decide if we check exists here or in squares
                     * 
                     * @var childState value of current element in array
                     * @var index index of current element
                     */
                    doSquaresExist.map((e, index) =>
                    (
                        <Square
                            color = {squareColors[index]}
                            exist = {doSquaresExist[index]}
                            index = {index}
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