import { Flex, Heading, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import pokemonJSON from '../../../assets/json/pokemons.json'

function BlockController({ 
    block,
    setDisableShop,
    coins,
    setCoins,
    setTrophy,
    trophy,
    pokemonsTeam
}) {
    const handlePassiveCoins = (value, isPositive) => {
        if (isPositive) {
            setCoins(coins + value)
        } else {
            setCoins(coins - value)
        }
    }

    useEffect(() => {
        block?.type === 'economy' && handlePassiveCoins(block?.change?.value, block?.change?.isPositive)

        if(block?.type === 'event') {
            if(block?.change?.type === 'element') {
                //eslint-disable-next-line array-callback-return
                pokemonsTeam?.map((data) => {
                    let types = pokemonJSON[data.pokemonId].type

                    // eslint-disable-next-line array-callback-return
                    types.map((element) => {
                        if (element.toLowerCase() === (block?.change?.element).toLowerCase()) {
                            block?.change?.category === 'coin' ? setCoins(coins + block?.change?.value) : setTrophy(trophy + 1)
                        }
                    })
                })
            } else if(block?.change?.type === 'nature') {
                // eslint-disable-next-line array-callback-return
                pokemonsTeam?.map((data) => {
                    if ((data.nature.nature).toLowerCase() === (block?.change?.nature).toLowerCase()) {
                        block?.change?.category === 'coin' ? setCoins(coins + block?.change?.value) : setTrophy(trophy + 1)
                    }
                })
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [block])

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
            <Heading mb={12} fontSize="4xl" textAlign="center">{block?.title}</Heading>
            <Text mb={12} fontSize="3xl" textAlign="center">{block?.label}</Text>
            {block?.rules && (
                <Text fontSize="1xl" textAlign="center" color={'red'} fontWeight="bold">({block?.rules})</Text>
            )}

            {block?.type === 'shop' && setDisableShop(false)}
        </Flex>
    )
}

export default BlockController