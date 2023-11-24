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
     * @var filled whether or not this square has something inside it
     * @var letter the inner letter of the square, provided it is filled
     * @var classList list of classes that the square belongs to
     */
    const [filled, setFilled] = useState<boolean>(false);
    const [letter, setLetter] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [touched, setTouched] = useState<string>("");

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
     * behavior of square, for now when mouse enters
     * but it will be something else
     * @function handleMouseEnter
     */
    const handleMouseEnter = () =>
    {
        if (filled)
        {
            setFilled(false);
            setLetter("");
        }
        else
        {
            setFilled(true);
            // `randomLetter` randomly generated number [0,26)
            var randomLetter = Math.floor(Math.random() * 26);
            setLetter(String.fromCharCode(randomLetter + 65));

            // `randomColor` randomly generated number [0, colors.length)
            var randomColor = Math.floor(Math.random() * colors.length);
            setColor(colors[randomColor]);
        }
    }

    /**
     * when `Square` mounts, we want to initialize a random state
     * 
     * @call useEffect()
     * @dependency none - called once on component mount
     */
    useEffect(() => {
        handleMouseEnter();
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
            setTouched("");
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
                setTouched("touched");
            }
        }
    }, [pressedKey]);


    return (
        <div className={"square " + color + " " + touched} onMouseEnter={handleMouseEnter}>
            {letter}
        </div>
    );
}

// declare this file's export
export default Square;