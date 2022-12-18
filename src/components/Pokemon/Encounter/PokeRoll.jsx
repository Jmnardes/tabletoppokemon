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
        greatball,
        superball, 
        ultraball, 
        disablePokeballs,
        setGreatBall,
        setSuperBall,
        setUltraBall,
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
                greatball={greatball}
                superball={superball} 
                ultraball={ultraball} 
                disablePokeballs={disablePokeballs}
                setGreatBall={setGreatBall}
                setSuperBall={setSuperBall}
                setUltraBall={setUltraBall}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
            />
            {children}
        </>
    )
}