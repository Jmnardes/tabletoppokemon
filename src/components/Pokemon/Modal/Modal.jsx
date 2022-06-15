import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from "@chakra-ui/react"
import { stringToUpperCase } from "../../../util"
import Pokecards from "../../Pokecards"
import PokeDex from "../PokeDex"

function PokeModal({ title }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button size="sm" mr={4} onClick={onOpen}>{title}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth="35rem" minHeight="35rem">
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {title === 'cards' ? (
                            <Pokecards/>
                        ) : (
                            <PokeDex/>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal