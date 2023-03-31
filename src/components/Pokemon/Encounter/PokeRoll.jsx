import Pokeballs from "./Pokeballs";
import RollController from "./RollController";

export default function PokeRoll({
        children,
        pokemonArrayLength,
        handlePokemonRoll,
        disableDiceRoll,
        handleCatchDiceRoll,
        catchDiceRoll,
        resultDiceRoll,
        endTurnButton,
        handlePokemonRollClean,
        disablePokeballs,
        setBonusOnCatch,
        setDisablePokeballs
    }) {
    return (
        <>
            <RollController
                pokemonArrayLength={pokemonArrayLength}
                handlePokemonRoll={handlePokemonRoll}
                disableDiceRoll={disableDiceRoll}
                handleCatchDiceRoll={handleCatchDiceRoll}
                catchDiceRoll={catchDiceRoll}
                resultDiceRoll={resultDiceRoll}
                endTurnButton={endTurnButton}
                handlePokemonRollClean={handlePokemonRollClean}
            />
            
            <Pokeballs
                disablePokeballs={disablePokeballs}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
            />
            {children}
        </>
    )
}