import PokeModal from "./Modal/Modal";
import { FaPlay } from "react-icons/fa";
import TurnController from "./Block/TurnController";
import PokeRoll from "./Encounter/PokeRoll";

export function PlayTurn({ 
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
        isPokemonEncounter,
        setIsPokemonEncounter,
        closeModal,
        setCloseModal,
        walkedBlocks,
        setWalkedBlocks
    }) {

    return (
        <PokeModal 
            title={isPokemonEncounter ? 'Pokemon encounter' : 'Turn roll'} 
            button={<FaPlay size="24px"/>}
            disableModalClose={!isPokemonEncounter}
            modalClose={closeModal}
            setCloseModal={setCloseModal}
        >
            {isPokemonEncounter ? (
                <PokeRoll
                    pokemonArrayLength={pokemonArrayLength}
                    handlePokemonRoll={handlePokemonRoll}
                    disableDiceRoll={disableDiceRoll}
                    handleCatchDiceRoll={handleCatchDiceRoll}
                    catchDiceRoll={catchDiceRoll}
                    resultDiceRoll={resultDiceRoll}
                    endTurnButton={endTurnButton}
                    handlePokemonRollClean={handlePokemonRollClean}
                    greatball={greatball}
                    superball={superball} 
                    ultraball={ultraball} 
                    disablePokeballs={disablePokeballs}
                    setGreatBall={setGreatBall}
                    setSuperBall={setSuperBall}
                    setUltraBall={setUltraBall}
                    setBonusOnCatch={setBonusOnCatch}
                    setDisablePokeballs={setDisablePokeballs}
                >
                    {children}
                </PokeRoll>
            ) : (
                <TurnController setIsPokemonEncounter={setIsPokemonEncounter} walkedBlocks={walkedBlocks} setWalkedBlocks={setWalkedBlocks} />
            )}
        </PokeModal>
    )
}