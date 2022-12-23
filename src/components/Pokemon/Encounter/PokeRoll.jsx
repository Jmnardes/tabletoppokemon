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
        masterball, 
        disablePokeballs,
        setGreatBall,
        setSuperBall,
        setUltraBall,
        setMasterBall,
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
                masterball={masterball} 
                disablePokeballs={disablePokeballs}
                setGreatBall={setGreatBall}
                setSuperBall={setSuperBall}
                setUltraBall={setUltraBall}
                setMasterBall={setMasterBall}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
            />
            {children}
        </>
    )
}