import PokeModal from "./Modal/Modal";
import TurnController from "./Block/TurnController";
import PokeRoll from "./Encounter/PokeRoll";
import locationIcon from '../../assets/images/game/location.png'
import { Image } from "@chakra-ui/react";

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
    closeModal,
    setCloseModal,
    walkedBlocks,
    setWalkedBlocks,
    setMercant,
    rollBlockDisabed,
    setRollBlockDisabed,
    isPokemonEncounter,
    setIsPokemonEncounter,
    setCoins,
    coins,
    pokemonsTeam,
    setTrophy,
    trophy,
    medal,
    setMedal,
    steal,
    setSteal,
    fight,
    setFight,
    pokemonEgg,
    setPokemonEgg,
    shinyPercentage,
    setShinyPercentage,
    handleToast
}) {
    return (
        <PokeModal 
            title={isPokemonEncounter ? 'Pokemon encounter' : 'Turn roll'} 
            button={
                <Image
                    src={locationIcon} 
                    title={'Go!'}
                    w="28px"
                ></Image>
            }
            disableModalClose={rollBlockDisabed}
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
                    disablePokeballs={disablePokeballs}
                    setBonusOnCatch={setBonusOnCatch}
                    setDisablePokeballs={setDisablePokeballs}
                >
                    {children}
                </PokeRoll>
            ) : (
                <TurnController 
                    setIsPokemonEncounter={setIsPokemonEncounter} 
                    walkedBlocks={walkedBlocks} 
                    setWalkedBlocks={setWalkedBlocks}
                    setMercant={setMercant}
                    rollBlockDisabed={rollBlockDisabed}
                    setRollBlockDisabed={setRollBlockDisabed}
                    setCoins={setCoins}
                    coins={coins}
                    pokemonsTeam={pokemonsTeam}
                    setTrophy={setTrophy}
                    trophy={trophy}
                    medal={medal}
                    setMedal={setMedal}
                    steal={steal}
                    setSteal={setSteal}
                    fight={fight}
                    setFight={setFight}
                    shinyPercentage={shinyPercentage}
                    setShinyPercentage={setShinyPercentage}
                    pokemonEgg={pokemonEgg}
                    setPokemonEgg={setPokemonEgg}
                    handleToast={handleToast}
                />
            )}
        </PokeModal>
    )
}