import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import Encounter from "../Encounter/Encounter"

export default function EncounterModal() {
    const { session } = useContext(PlayerContext)

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        {session.turns === 1 ? (
                            'Starter Pokémon'
                        ) : (
                            'Pokémon Encounter'
                        )}
                    </ModalHeader>

                    <Encounter />
                </ModalContent>
            </Modal>
        </>
    )
}