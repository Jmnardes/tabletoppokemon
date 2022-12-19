import { Flex, Text } from '@chakra-ui/react'

function BlockController({ block }) {

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
            <Text fontSize="3xl" textAlign="center">{block}</Text>
        </Flex>
    )
}

export default BlockController