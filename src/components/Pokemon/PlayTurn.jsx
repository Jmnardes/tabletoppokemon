import PokeModal from "./Modal/Modal";
import PokeEnconter from "./Encounter/PokeEnconter";
import locationIcon from '../../assets/images/game/location.png'
import { Image } from "@chakra-ui/react";

export function PlayTurn({ 
    children,
    pokemonArrayLength,
    disablePokeCatch,
    handleCatchDiceRoll,
    disablePokeballs,
    setBonusOnCatch,
    setDisablePokeballs,
    closeModal,
    setCloseModal,
    rollBlockDisabed,
    setEndTurnButton
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
                disablePokeCatch={disablePokeCatch}
                handleCatchDiceRoll={handleCatchDiceRoll}
                disablePokeballs={disablePokeballs}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
                setEndTurnButton={setEndTurnButton}
            >
                {children}
            </PokeEnconter>
        </PokeModal>
    )
}