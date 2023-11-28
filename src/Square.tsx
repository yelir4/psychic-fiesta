/**
 * Square.tsx
 */
import React, { useState } from "react";

/**
 * @interface SquareProps
 */
interface SquareProps
{
    color: string;
    exist: boolean;
    index: number;
    letter: string;
    state: boolean;
}

/**
 * squares make up our game grid
 * they can either be empty, have a letter, or have something else (tbd)
 * 
 * @function Square()
 * @param pressedKey passed in by App, keystroke
 * @return dynamic square css element
 */
const Square: React.FC<SquareProps> = ({letter, exist, index, color, state}) =>
{
    /**
     * @var color square color
     * @var filled whether this square has something inside it
     * @var letter square's letter, provided it is filled
     * @var touched whether the square is highlighted
     */
    const [filled, setFilled] = useState<boolean>(false);

    /**
     * @var debug if true, displays square indices
     */
    const debug : boolean = false;

    return (
        <div className={`square ${exist ? color : "break"} ${state ? "touched" : ""}`}>
            {letter}{debug ? index : ""}
        </div>
    );
}

// declare this file's export
export default Square;