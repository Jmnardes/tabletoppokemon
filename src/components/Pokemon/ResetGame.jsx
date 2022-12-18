import PokeModal from "./Modal/Modal";
import { FaRegWindowClose } from "react-icons/fa";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export function ResetGame({ handleGameReset }) {
    return (
        <PokeModal title={'Reiniciar Jogo'} button={<FaRegWindowClose size="20px"/>} size="sm">
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
                <Box>
                    <Text m={4} fontSize="2xl" textAlign="center">Tem certeza que deseja reiniciar o jogo?</Text>
                </Box>
                <Box>
                    <Text fontSize="sm" m={4}>(Todos seus dados serão perdidos)</Text>
                </Box>
                <Flex flexDirection="row">
                    <Button m={4} w={32} onClick={() => handleGameReset(true)}>Sim, reiniciar</Button>
                </Flex>
            </Flex>
        </PokeModal>
    )
}