/**
 * Top.tsx
 * 
 * provides top banner
 */
const Top = () =>
{
    // note `!` is a non-null assertion operator
    // basically asserting that yes, this element exists
    var head = document.getElementById("top")!;

    // verify that `head` exists within the document
    const handleMouseEnter = () => {
        head.style.color = "#101010";
    }

    const handleMouseLeave = () => {
        head.style.color = "#efefef";
    }

    return (
        <>
            <div id="top" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {/* TODO make psychic fiesta logo */}
                psychic fiesta
            </div>
        </>
    );
}


export default Top;