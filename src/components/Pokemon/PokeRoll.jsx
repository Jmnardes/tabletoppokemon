import PokeModal from "./Modal/Modal";
import { FaPlay } from "react-icons/fa";
import Pokeballs from "./Encounter/Pokeballs";
import RollController from "./Encounter/RollController";

export function PokeRoll({ 
        children,
        handlePokemonRoll,
        pokemonArrayLength,
        disableDiceRoll,
        handleCatchDiceRoll,
        catchDiceRoll,
        resultDiceRoll,
        endTurnButton,
        handlePokemonRollClean,
        disablePokeballs,
        setBonusOnCatch,
        setDisablePokeballs,
        greatball,
        setGreatBall,
        superball,
        setSuperBall,
        ultraball,
        setUltraBall,
    }) {

    return (
        <PokeModal 
            title={'Pokemon encounter'} 
            button={<FaPlay size="24px"/>}
        >
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
        </PokeModal>
    )
}