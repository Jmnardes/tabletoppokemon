import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import Encounter from "../Encounter/Encounter"

export default function EncounterModal({ augments }) {
    const { session } = useContext(PlayerContext)

    const isStarter = session.turns === 0

    return (
        <>
            <Modal isOpen size={isStarter ? "3xl" : "xl"} isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        {session.turns === 0 ? (
                            'Starter Pokémon'
                        ) : (
                            'Pokémon Encounter'
                        )}
                    </ModalHeader>

                    <Encounter augments={augments} />
                </ModalContent>
            </Modal>
        </>
    )
}