// import { Flex, Heading, Image, Text } from '@chakra-ui/react'
// import { useContext, useEffect } from 'react'
// import pokemonJSON from '../../../assets/json/pokemons.json'
// import PlayerContext from "@Contexts/PlayerContext";

// import eggIcon from '@images/items/egg.png'

// function BlockController({ 
//     block,
//     setMercant,
//     pokemonsTeam,
// }) {
//     const { player, updateBall, updateItem, updateCurrency, changeCurrency, handleToast } = useContext(PlayerContext)

//     const handlePassiveCoins = (value, isPositive) => {
//         if (isPositive) {
//             updateCurrency(value, 'coins')
//         } else {
//             if (value > player.currency.coins) {
//                 changeCurrency(0, 'coins')
//             } else {
//                 updateCurrency(-value, 'coins')
//             }
//         }
//     }

//     const itemFunction = (block) => {
//         if (block?.change?.category === 'coin') {
//             updateCurrency(block.change?.value, 'coins')
//         }

//         if (block?.change?.category === 'item') {
//             if(block.change?.item === 'greatball') updateBall(1,'greatball')
//             if(block.change?.item === 'ultraball') updateBall(1,'ultraball')
//             if(block.change?.item === 'steal') updateItem(1, 'steal')
//             if(block.change?.item === 'egg') {
//                 updateItem(1, 'pokemonEgg')
//                 handleToast({
//                     id: 'egg', 
//                     title: 'Egg', 
//                     description: 'Be careful, your egg can rot in a few turns, better put it in an incubator',
//                     icon:<Image src={eggIcon} w="36px"></Image>,
//                     status: 'warning',
//                     duration: 10000
//                 })
//             }
//             if(block.change?.item === 'fight') updateItem(1, 'fight')
//             if(block.change?.item === 'incense') updateItem(1, 'incense')
//             if(block.change?.item === 'star') updateCurrency(1, 'stars')
//         }

//         if (block?.change?.category === 'treasure') {
//             if(block.change?.item === 'ultraball') updateBall(2, 'ultraball')
//             if(block.change?.item === 'steal') updateItem(1, 'steal')
//             if(block.change?.item === 'star') updateCurrency(1, 'stars')
//             if(block.change?.item === 'incense') updateItem(1, 'incense')
//             if(block.change?.item === 'masterball') updateBall(1, 'masterball')
//             if(block.change?.item === 'crown') updateCurrency(1, 'crowns')
//         }
//     }

//     useEffect(() => {
//         block?.type === 'economy' && handlePassiveCoins(block.change?.value, block.change?.isPositive)

//         block?.type === 'shop' && setMercant(true)

//         if(block?.type === 'event') {
//             if(block.change?.category === 'coin') {
                
//                 if(block.change?.type === 'element') {
//                     //eslint-disable-next-line array-callback-return
//                     pokemonsTeam?.map((data) => {
//                         let types = pokemonJSON[data.pokemonId].type

//                         // eslint-disable-next-line array-callback-return
//                         types.map((element) => {
//                             if (element.toLowerCase() === (block.change?.element).toLowerCase()) {
                                
//                                 itemFunction(block)

//                             }
//                         })
//                     })
//                 } else if(block.change?.type === 'nature') {
//                     // eslint-disable-next-line array-callback-return
//                     pokemonsTeam?.map((data) => {
//                         if ((data.nature.nature).toLowerCase() === (block.change?.nature).toLowerCase()) {

//                             itemFunction(block)

//                         }
//                     })
//                 }

//             }
//         }

//         if(block?.type === 'item') {
//             switch(block?.change?.type) {
//                 case 'greatball':
//                     updateBall(block.change?.value, 'greatball')
//                     return
//                 case 'ultraball':
//                     updateBall(block.change?.value, 'ultraball')
//                     return
//                 case 'fight':
//                     updateItem(block.change?.value, 'fight')
//                     return
//                 case 'steal':
//                     updateItem(block.change?.value, 'steal')
//                     return
//                 case 'star':
//                     updateCurrency(block.change?.value, 'stars')
//                     return
//                 case 'masterball':
//                     updateBall(block.change?.value, 'masterball')
//                     return
//                 case 'crown':
//                     updateCurrency(block.change?.value, 'crowns')
//                     return
//                 case 'egg':
//                     updateItem(block.change?.value, 'pokemonEgg')
//                     handleToast({
//                         id: 'egg', 
//                         title: 'Egg', 
//                         description: 'Be careful, your egg can rot in a few turns, better put it in an incubator',
//                         icon:<Image src={eggIcon} w="36px"></Image>,
//                         status: 'warning',
//                         duration: 10000
//                     })
//                     return
//                 case 'incense':
//                     updateItem(block.change?.value, 'incense')
//                     return
//                 default: //pokeball
//                     updateBall(block.change?.value, 'pokeball')
//                     return
//             }
//         }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [block])

//     return (
//         <Flex flexDirection="column" justifyContent="center" alignItems="center" my={12} mt={8} h="100%">
//             <Heading mb={12} fontSize="4xl" textAlign="center">{block?.title}</Heading>
//             <Text mb={12} fontSize="3xl" textAlign="center">{block?.label}</Text>
//             {block?.rules && (
//                 <Text fontSize="1xl" textAlign="center" color={'red'} fontWeight="bold">({block?.rules})</Text>
//             )}
//         </Flex>
//     )
// }

// export default BlockController