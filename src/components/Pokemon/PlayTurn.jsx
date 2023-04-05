import PokeModal from "./Modal/Modal";
import PokeEnconter from "./Encounter/PokeEnconter";
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
}) {
    return (
        <PokeModal 
            title={'Pokemon encounter'} 
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
            <PokeEnconter
                pokemonArrayLength={pokemonArrayLength}
                handlePokemonEncounter={handlePokemonEncounter}
                disableDiceRoll={disableDiceRoll}
                handleCatchDiceRoll={handleCatchDiceRoll}
                disablePokeballs={disablePokeballs}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
            >
                {children}
            </PokeEnconter>
        </PokeModal>
    )
}