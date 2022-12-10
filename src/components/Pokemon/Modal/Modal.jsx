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

function PokeModal({ title, button, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button title={title} mr={4} onClick={onOpen}>
                {button}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth="35rem" minHeight="35rem">
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* {title === 'Cards' &&
                            <Pokecards/>
                        }
                        {title === 'Pokedex' &&
                            <PokeDex/>
                        }
                        {title === 'Gym' &&
                            'Gym'
                        } */}
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal