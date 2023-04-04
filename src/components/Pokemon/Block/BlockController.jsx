import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import pokemonJSON from '../../../assets/json/pokemons.json'
import PlayerContext from "../../../Contexts/PlayerContext";

import eggIcon from '../../../assets/images/items/egg.png'

function BlockController({ 
    block,
    setMercant,
    pokemonsTeam,
}) {
    const { balls, updateBalls, items, updateItems, currency, updateCurrency, handleToast } = useContext(PlayerContext)

    const handlePassiveCoins = (value, isPositive) => {
        if (isPositive) {
            updateCurrency(currency, {coins: currency.coins + value})
        } else {
            if (value > currency.coins) {
                updateCurrency(currency, {coins: 0})
            } else {
                updateCurrency(currency, {coins: currency.coins - value})
            }
        }
    }

    const itemFunction = (block) => {
        if (block?.change?.category === 'coin') {
            updateCurrency(currency, {coins: currency.coins + block.change?.value})
        }

        if (block?.change?.category === 'item') {
            if(block.change?.item === 'greatball') updateBalls(balls, {greatball: balls.greatball + 1})
            if(block.change?.item === 'ultraball') updateBalls(balls, {ultraball: balls.ultraball + 1})
            if(block.change?.item === 'steal') updateItems(items,  {steal: items.steal + 1})
            if(block.change?.item === 'egg') {
                updateItems(items,  {pokemonEgg: items.pokemonEgg + 1})
                handleToast({
                    id: 'egg', 
                    title: 'Egg', 
                    description: 'Be careful, your egg can rot in a few turns, better put it in an incubator',
                    icon:<Image src={eggIcon} w="36px"></Image>,
                    status: 'warning',
                    duration: 10000
                })
            }
            if(block.change?.item === 'fight') updateItems(items,  {fight: items.fight + 1})
            if(block.change?.item === 'incense') updateItems(items,  {incense: items.incense + 1})
            if(block.change?.item === 'star') updateCurrency(currency,  {stars: currency.stars + 1})
        }

        if (block?.change?.category === 'treasure') {
            if(block.change?.item === 'ultraball') updateBalls(balls, {ultraball: balls.ultraball + 2})
            if(block.change?.item === 'steal') updateItems(items,  {steal: items.steal + 1})
            if(block.change?.item === 'star') updateCurrency(currency,  {stars: currency.stars + 1})
            if(block.change?.item === 'incense') updateItems(items,  {incense: items.incense + 1})
            if(block.change?.item === 'masterball') updateBalls(balls, {masterball: balls.masterball + 1})
            if(block.change?.item === 'crown') updateCurrency(currency,  {crowns: currency.crowns + 1})
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
                case 'greatball':
                    updateBalls(balls, {greatball: balls.greatball + block.change?.value})
                    return
                case 'ultraball':
                    updateBalls(balls, {ultraball: balls.ultraball + block.change?.value})
                    return
                case 'fight':
                    updateItems(items, {fight: items.fight + block.change?.value})
                    return
                case 'steal':
                    updateItems(items, {steal: items.steal + block.change?.value})
                    return
                case 'star':
                    updateCurrency(currency,  {stars: currency.stars + block.change?.value})
                    return
                case 'masterball':
                    updateBalls(balls, {masterball: balls.masterball + block.change?.value})
                    return
                case 'crown':
                    updateCurrency(currency,  {crowns: currency.crowns + block.change?.value})
                    return
                case 'egg':
                    updateItems(items, {pokemonEgg: items.pokemonEgg + block.change?.value})
                    handleToast({
                        id: 'egg', 
                        title: 'Egg', 
                        description: 'Be careful, your egg can rot in a few turns, better put it in an incubator',
                        icon:<Image src={eggIcon} w="36px"></Image>,
                        status: 'warning',
                        duration: 10000
                    })
                    return
                case 'incense':
                    updateItems(items,  {incense: items.incense + block.change?.value})
                    return
                default: //pokeball
                    updateBalls(balls, {pokeball: balls.pokeball + block.change?.value})
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