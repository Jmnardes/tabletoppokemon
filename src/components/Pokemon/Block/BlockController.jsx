import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

function BlockController({ 
    block,
    setDisableShop,
    coins,
    setCoins
}) {
    const handlePassiveCoins = (value, isPositive) => {
        value = Number(value)

        if (isPositive) {
            setCoins(() => coins + value)
        } else {
            setCoins(() => coins - value)
        }
    }

    useEffect(() => {
        {block?.type === 'shop' && setDisableShop(false)}

        {block?.type === 'economy' && handlePassiveCoins(block?.change?.value, block?.change?.isPositive)}
    }, [block, setDisableShop])

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
            <Heading mb={12} fontSize="4xl" textAlign="center">{block?.title}</Heading>
            <Text mb={12} fontSize="3xl" textAlign="center">{block?.label}</Text>
            {block?.rules && (
                <Text fontSize="1xl" textAlign="center" color={'red'} fontWeight="bold">({block?.rules})</Text>
            )}

            {/* {console.log(block)}
            {block?.change?.category}
            {block?.change?.type}
            {block?.change?.value}
            {block?.change?.negative} */}
        </Flex>
    )
}

export default BlockController