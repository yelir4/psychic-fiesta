/**
 * Square.tsx
 */
import React, { useState, useEffect, useRef } from "react";

/**
 * @interface SquareProps
 */
interface SquareProps
{
    pressedKey: string;
}

/**
 * squares make up our game grid
 * they can either be empty, have a letter, or have something else (tbd)
 * 
 * @function Square()
 * @param pressedKey passed in by App, keystroke
 * @return dynamic square css element
 */
const Square: React.FC<SquareProps> = ({pressedKey}) =>
{
    /**
     * @var color square color
     * @var filled whether this square has something inside it
     * @var letter square's letter, provided it is filled
     * @var touched whether the square is highlighted
     */
    const [color, setColor] = useState<string>("");
    const [filled, setFilled] = useState<boolean>(false);
    const [letter, setLetter] = useState<string>("");
    const [touched, setTouched] = useState<boolean>(false);

    /**
     * color enumeration
     * enumerated from 0-3
     * colors.
     */
    const colors =
    [
        "red", 
        "green",
        "blue",
        "brown"
    ];

    /**
     * called on component mount, initializing square
     * but it will be something else
     * @function initSquare
     */
    const initSquare = () =>
    {
        setFilled(true);
        // `randomLetter` randomly generated number [0,26)
        var randomLetter = Math.floor(Math.random() * 26);
        setLetter(String.fromCharCode(randomLetter + 65));

        // `randomColor` randomly generated number [0, colors.length)
        var randomColor = Math.floor(Math.random() * colors.length);
        setColor(colors[randomColor]);
    }

    /**
     * called by spacebar clear, reset all square variables
     * 
     * @function resetSquare
     */
    const resetSquare = () =>
    {
        setColor("");
        setFilled(false);
        setLetter("");
        setTouched(false);
    }

    /**
     * when `Square` mounts, we want to initialize a random state
     * 
     * @call useEffect()
     * @dependency none - called once on component mount
     */
    useEffect(() => {
        initSquare();
    }, []);

    /**
     * modify square Behavior when we detect changes in the state of `pressedKey`
     * if Square's `letter` matches `pressedKey` we highlight the square
     * 
     * @call useEffect()
     * @dependency pressedKey
     */
    useEffect(() => {
        /**
         * @todo keep square's color
         * clear the path with spacebar
         */
        if (pressedKey === " ")
        {
            if (touched)
            {
                resetSquare();
                setTimeout(() => 
                {
                    initSquare();
                }, 500);
            }
        }
        /**
         * only do comparison if Square is `filled`
         */
        else if (filled)
        {
            // console.log("pressed key is " + pressedKey);
            // console.log("letter is " + letter);
            if (pressedKey === letter)
            {
                setTouched(true);
            }
        }
    }, [pressedKey]);


    return (
        <div className={"square " + color + (touched ? " touched" : "")}> 
            {letter}
        </div>
    );
}

// declare this file's export
export default Square;