import { Flex, Text } from '@chakra-ui/react'

function BlockController({ 
    block,
    setDisableShop
}) {
    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
            <Text mb={12} fontSize="4xl" textAlign="center">{block?.title}</Text>
            <Text mb={12} fontSize="3xl" textAlign="center">{block?.label}</Text>
            {block?.rules && (
                <Text fontSize="1xl" textAlign="center">({block?.rules})</Text>
            )}

            {/* {block.type === 'shop' && setDisableShop(false)}
            {console.log(block)}
            {block?.change?.category}
            {block?.change?.type}
            {block?.change?.value}
            {block?.change?.negative} */}
        </Flex>
    )
}

export default BlockController