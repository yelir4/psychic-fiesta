/**
 * App.tsx
 * 
 * lets burn everything for now
 * 
 * useState for dynamic changes
 * useEffect for listening to keypresses "side effects"
 */
import { useState, useEffect } from "react";

/**
 * @function Square()
 * 
 * squares make up our game grid
 * they can either be empty, have a letter, or have something else (tbd)
 * 
 * 
 * @return dynamic square css element
 */
const Square = () =>
{
    /**
     * @var filled whether or not this square has something inside it
     * @var letter the inner letter of the square, provided it is filled
     */
    const [filled, setFilled] = useState(false);
    const [letter, setLetter] = useState("");

    /*
        behavior of square, for now when mouse enters
        but it will be something else
    */
    function handleMouseEnter ()
    {
        if (filled)
        {
            setFilled(false);
            setLetter("");
        }
        else
        {
            setFilled(true);
            setLetter(String.fromCharCode(Math.floor(Math.random()*26)+65));
        }
    }


    return (
        <div className="square" onMouseEnter={handleMouseEnter}>
            {letter}
        </div>
    )
}

/**
 * @function App
 * 
 * @returns our app in all of its glory
 */
const App = () =>
{
    const [value, setValue] = useState(String(""));
    var head = document.getElementById("top");

    const handleMouseEnter = () =>
    {
        setValue("lol!");
        
        
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
        setValue("nooo!!");
        
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
     * we extract the pressed `key` and set `value` to it
     */
    const handleKeyDown = (event: any) =>
    {
        setValue(event.key);
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
                psychic fiesta {value}
            </div>

            <div id="middle">
                <div id="grid">
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />

                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                    <Square />
                </div>
            </div>
        </>
    );
}


// declare our export
export default App;