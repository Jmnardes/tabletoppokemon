import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    ModalFooter,
    ModalOverlay,
    Text,
    Center,
    useColorMode,
    Divider
} from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import SuccessIcon from "../../../Icons/SuccessIcon"

export default function WalkModal() {
    const { updateGame, game, event } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(2px) hue-rotate(0deg)'
        />
    )

    const [overlay, setOverlay] = useState(<Overlay />)

    useEffect(() => {
        if(game.openWalkModal) {
            setOverlay(<Overlay />)
            onOpen()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.openWalkModal])

    return (
        <>
            <Modal isOpen={isOpen} size="xl" isCentered>
                {overlay}
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>{event.title}</ModalHeader>
                    <Center flexDirection="column">
                        <ModalBody p={2} w="100%" bg={colorMode === 'light' ? "gray.200" : "gray.650"} borderRadius={8}>
                            <Center flexDirection="column">
                                <Text fontSize="2xl">{event.description}</Text>
                            </Center>
                        </ModalBody>
                    </Center>

                    <Divider my={4}  mb={6} />

                    <ModalFooter p={0}>

                        <Button h={12} onClick={() => {
                            updateGame({ openWalkModal: false })
                            onClose()
                        }}><SuccessIcon c={colorMode === 'light' ? "green.500" : "green.400"} /></Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}