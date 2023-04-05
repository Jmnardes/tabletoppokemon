import Pokeballs from "./Pokeballs";

export default function PokeEnconter({
        children,
        handleCatchDiceRoll,
        setBonusOnCatch,
    }) {

    return (
        <>
            <Pokeballs
                setBonusOnCatch={setBonusOnCatch}
                handleCatchDiceRoll={handleCatchDiceRoll}
            />
            {children}
        </>
    )
}