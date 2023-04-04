import PokeModal from "./Modal/Modal";
import PokeRoll from "./Encounter/PokeRoll";
import locationIcon from '../../assets/images/game/location.png'
import { Image } from "@chakra-ui/react";

export function PlayTurn({ 
    children,
    handlePokemonEncounter,
    pokemonArrayLength,
    disableDiceRoll,
    handleCatchDiceRoll,
    disablePokeballs,
    setBonusOnCatch,
    setDisablePokeballs,
    closeModal,
    setCloseModal,
    rollBlockDisabed,
    isPokemonEncounter,
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
            <PokeRoll
                pokemonArrayLength={pokemonArrayLength}
                handlePokemonEncounter={handlePokemonEncounter}
                disableDiceRoll={disableDiceRoll}
                handleCatchDiceRoll={handleCatchDiceRoll}
                disablePokeballs={disablePokeballs}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
            >
                {children}
            </PokeRoll>
            {/* {isPokemonEncounter ? (
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
                    pokemonsTeam={pokemonsTeam}
                />
            )} */}
        </PokeModal>
    )
}