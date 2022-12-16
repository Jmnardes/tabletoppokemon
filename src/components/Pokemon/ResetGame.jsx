import PokeModal from "./Modal/Modal";
import { FaRegWindowClose } from "react-icons/fa";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

export function ResetGame({ handleGameReset }) {
    const [closeGameRestartModal, setCloseGameRestartModal] = useState(false)

    return (
        <PokeModal title={'Reset'} button={<FaRegWindowClose size="20px"/>} size="sm" modalClose={closeGameRestartModal}>
            <Flex justifyContent="center" alignItems="center" flexDirection="column">
                <Text m={4}>Tem certeza que deseja resetar o jogo?</Text>
                <Flex flexDirection="row">
                    <Button m={4} onClick={() => handleGameReset(true)}>Sim</Button>
                    <Button m={4} onClick={() => setCloseGameRestartModal(!closeGameRestartModal)}>Não</Button>
                </Flex>
            </Flex>
        </PokeModal>
    )
}