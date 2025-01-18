import { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    Text,
    CloseButton,
    Center,
    ModalBody,
} from "@chakra-ui/react"
import PlayerContext from "../../Contexts/PlayerContext"
import PokeShop from "../PokeShop"

export default function PokeShopModal() {
    const { updateGame } = useContext(PlayerContext)

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center justifyContent="space-between">
                            <Flex />
                            <Text>Poke Shop</Text>
                            <CloseButton onClick={() => updateGame({ updateShop: true })} />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <PokeShop />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}