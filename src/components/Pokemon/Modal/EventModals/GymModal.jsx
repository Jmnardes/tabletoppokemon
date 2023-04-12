import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    Button,
    ModalFooter,
    ModalOverlay,
    useColorMode,
    Divider,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import SuccessIcon from "../../../Icons/SuccessIcon"
import starIcon from '../../../../assets/images/game/star.png'
import GymBlock from "../../Event/GymBlock"


export default function GymModal({ pokeTeam }) {
    const { updateGame, event } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>{event.title}</ModalHeader>
                    
                    <GymBlock />
                    
                    <Divider my={4}  mb={6} />

                    <ModalFooter p={0}>

                        <Button h={12} onClick={() => {
                            updateGame({ openGymModal: false })
                        }}>
                            <SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} />
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}