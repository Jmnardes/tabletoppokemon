import { Flex, Text } from '@chakra-ui/react'

function BlockController({ block }) {

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12}>
            <Text fontSize="3xl">{block}</Text>
        </Flex>
    )
}

export default BlockController