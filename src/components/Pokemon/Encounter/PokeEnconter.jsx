import Pokeballs from "./Pokeballs";

export default function PokeEnconter({
        children,
        handleCatchDiceRoll,
        setBonusOnCatch,
        setEndTurnButton
    }) {

    return (
        <>
            <Pokeballs
                setBonusOnCatch={setBonusOnCatch}
                handleCatchDiceRoll={handleCatchDiceRoll}
                setEndTurnButton={setEndTurnButton}
            />
            {children}
        </>
    )
}