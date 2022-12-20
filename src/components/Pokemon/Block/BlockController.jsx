import { Flex, Text } from '@chakra-ui/react'

function BlockController({ block }) {

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
            <Text mb={12} fontSize="4xl" textAlign="center">{block.title}</Text>
            <Text mb={12} fontSize="3xl" textAlign="center">{block.label}</Text>
            {block.rules && (
                <Text fontSize="1xl" textAlign="center">({block.rules})</Text>
            )}
        </Flex>
    )
}

export default BlockController