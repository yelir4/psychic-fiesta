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
const Square: React.FC<SquareProps> = ({letter, color, state}) =>
{
    /**
     * @var color square color
     * @var filled whether this square has something inside it
     * @var letter square's letter, provided it is filled
     * @var touched whether the square is highlighted
     */
    const [filled, setFilled] = useState<boolean>(false);

    return (
        <div className={`square ${color} ${state ? "touched" : ""}`}>
            {letter}
        </div>
    );
}

// declare this file's export
export default Square;