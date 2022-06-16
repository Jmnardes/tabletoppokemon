import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Image,
    Text,
} from "@chakra-ui/react"
import { stringToUpperCase } from "../../../util"
import Pokecards from "../../Pokecards"
import PokeDex from "../PokeDex"

function PokeModal({ title, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button title={title} mr={4} onClick={onOpen}>{children}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth="35rem" minHeight="35rem">
                    <ModalHeader textAlign="center">{stringToUpperCase(title)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {title === 'Cards' &&
                            <Pokecards/>
                        }
                        {title === 'Pokedex' &&
                            <PokeDex/>
                        }
                        {title === 'Gym' &&
                            'Gym'
                        }
                        {title === 'Team Rocket' &&
                            <>
                                <Image
                                    src="https://c.tenor.com/x23TdFVIGW4AAAAC/team-rocket-pokemon.gif" 
                                    alt={title}
                                    m="4px auto"
                                    height="16rem"
                                    objectFit='cover'
                                    borderRadius={8}
                                    mb={2}
                                />
                                <Text fontWeight="bold">Roll d20:</Text>
                                <Text m={1}>1: They steal a pokemon from your team.</Text>
                                <Text m={1}>2-4: They steal a random treasure from you(if you don't have, 2 items then).</Text>
                                <Text m={1}>5-10: They steal a random item from you.</Text>
                                <Text m={1}>11-19: You escape.</Text>
                                <Text m={1}>20: You earn a treasure.</Text>
                            </>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PokeModal