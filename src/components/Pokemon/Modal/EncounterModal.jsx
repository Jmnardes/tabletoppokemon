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


export default function EncounterModal() {
    const { updateGame } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>Encontro pokemon</ModalHeader>
                    
                    <Divider my={4}  mb={6} />

                    <ModalFooter p={0}>

                        <Button h={12} onClick={() => {
                            updateGame({ openEncounterModal: false })
                        }}>
                            fechar
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}