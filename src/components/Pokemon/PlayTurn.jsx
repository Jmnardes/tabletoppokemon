import PokeModal from "./Modal/Modal";
import PokeEnconter from "./Encounter/PokeEnconter";
import locationIcon from '../../assets/images/game/location.png'
import { Image } from "@chakra-ui/react";

export function PlayTurn({ 
    children,
    handleCatchDiceRoll,
    setBonusOnCatch,
    closeModal,
    setCloseModal,
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
            modalClose={closeModal}
            setCloseModal={setCloseModal}
        >
            <PokeEnconter
                setBonusOnCatch={setBonusOnCatch}
                handleCatchDiceRoll={handleCatchDiceRoll}
            >
                {children}
            </PokeEnconter>
        </PokeModal>
    )
}