import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import pokemonJSON from '../../../assets/json/pokemons.json'

import eggIcon from '../../../assets/images/items/egg.png'

function BlockController({ 
    block,
    setMercant,
    pokemonsTeam,
    coins,
    setCoins,
    trophy,
    setTrophy,
    medal,
    setMedal,
    greatball,
    setGreatBall,
    superball,
    setSuperBall,
    ultraball,
    setUltraBall,
    masterball,
    setMasterBall,
    steal,
    setSteal,
    fight,
    setFight,
    pokemonEgg,
    setPokemonEgg,
    shinyPercentage,
    setShinyPercentage,
    handleToast
}) {
    const handlePassiveCoins = (value, isPositive) => {
        if (isPositive) {
            setCoins(coins + value)
        } else {
            if (value > coins) {
                setCoins(0)
            } else {
                setCoins(coins - value)
            }
        }
    }

    const itemFunction = (block) => {
        if (block?.change?.category === 'coin') {
            setCoins(coins + block.change?.value)
        }

        if (block?.change?.category === 'item') {
            if(block.change?.item === 'superball') setSuperBall(superball + 1)
            if(block.change?.item === 'ultraball') setUltraBall(ultraball + 1)
            if(block.change?.item === 'steal') setSteal(steal + 1)
            if(block.change?.item === 'egg') {
                setPokemonEgg(pokemonEgg + 1)
                handleToast(
                    'egg', 
                    'Egg', 
                    'Be careful, your egg can rot in a few turns, better put it in an incubator',
                    <Image src={eggIcon} w="36px"></Image>,
                    'warning',
                    10000
                )
            }
            if(block.change?.item === 'fight') setFight(fight + 1)
            if(block.change?.item === 'incense') setShinyPercentage(shinyPercentage + 1)
            if(block.change?.item === 'medal') setMedal(medal + 1)
        }

        if (block?.change?.category === 'treasure') {
            if(block.change?.item === 'ultraball') setUltraBall(ultraball + 2)
            if(block.change?.item === 'steal') setSteal(steal + 1)
            if(block.change?.item === 'medal') setMedal(medal + 1)
            if(block.change?.item === 'incense') setShinyPercentage(shinyPercentage + 1)
            if(block.change?.item === 'masterball') setMasterBall(masterball + 1)
            if(block.change?.item === 'trophy') setTrophy(trophy + 1)
        }
    }

    useEffect(() => {
        block?.type === 'economy' && handlePassiveCoins(block.change?.value, block.change?.isPositive)

        block?.type === 'shop' && setMercant(true)

        if(block?.type === 'event') {
            if(block.change?.category === 'coin') {
                
                if(block.change?.type === 'element') {
                    //eslint-disable-next-line array-callback-return
                    pokemonsTeam?.map((data) => {
                        let types = pokemonJSON[data.pokemonId].type

                        // eslint-disable-next-line array-callback-return
                        types.map((element) => {
                            if (element.toLowerCase() === (block.change?.element).toLowerCase()) {
                                
                                itemFunction(block)

                            }
                        })
                    })
                } else if(block.change?.type === 'nature') {
                    // eslint-disable-next-line array-callback-return
                    pokemonsTeam?.map((data) => {
                        if ((data.nature.nature).toLowerCase() === (block.change?.nature).toLowerCase()) {

                            itemFunction(block)

                        }
                    })
                }

            }
        }

        if(block?.type === 'item') {
            switch(block?.change?.type) {
                case 'superball':
                    setSuperBall(superball + block.change?.value)
                    return
                case 'ultraball':
                    setUltraBall(ultraball + block.change?.value)
                    return
                case 'fight':
                    setFight(fight + block.change?.value)
                    return
                case 'steal':
                    setSteal(steal + block.change?.value)
                    return
                case 'medal':
                    setMedal(medal + block.change?.value)
                    return
                case 'masterball':
                    setMasterBall(masterball + block.change?.value)
                    return
                case 'trophy':
                    setTrophy(trophy + block.change?.value)
                    return
                case 'egg':
                    setPokemonEgg(pokemonEgg + block.change?.value)
                    handleToast(
                        'egg', 
                        'Egg', 
                        'Be careful, your egg can rot in a few turns, better put it in an incubator',
                        <Image src={eggIcon} w="36px"></Image>,
                        'warning',
                        10000
                    )
                    return
                case 'incense':
                    setShinyPercentage(shinyPercentage + block.change?.value)
                    return
                default: //greatball
                    setGreatBall(greatball + block.change?.value)
                    return
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
        </Flex>
    )
}

export default BlockController