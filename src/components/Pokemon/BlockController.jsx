import { Flex, Text } from '@chakra-ui/react'
import PokeModal from "./Modal/Modal"
import { FaWalking } from "react-icons/fa";

function BlockController() {

    return (
        <PokeModal title={'Block walk'} button={<FaWalking size="20px"/>}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" mb={4}>
                <Text>bloco</Text>
            </Flex>
        </PokeModal>
    )
}

export default BlockController