// import { Button, Flex, Image } from "@chakra-ui/react";
// import {  useState } from "react";
// import { diceRoll } from "../../../util";
// import BlockController from "./BlockController";
// import { blockType } from "./blockFunctions";
// import swarmIcon from '@assets/images/game/swarm.png'
// import directionIcon from '@assets/images/game/direction.png'

// export default function TurnController({ 
//     setIsPokemonEncounter, 
//     setWalkedBlocks, 
//     walkedBlocks,
//     setMercant,
//     rollBlockDisabed, 
//     setRollBlockDisabed,
//     pokemonsTeam,
// }) {
//     const [block, setBlock] = useState([])

//     function handleBlockRoll() {
//         setBlock(blockType())
//         setRollBlockDisabed(true)
//         setWalkedBlocks(() => walkedBlocks + diceRoll(4) + 1)
//     }

//     return (
//         <Flex justifyContent="center" alignItems="center">
//             <Flex flexDirection="column" w="100%">
//                 <Flex mt={4} w="100%">
//                     <Button w="100%" mx={2} onClick={handleBlockRoll} isDisabled={rollBlockDisabed}>
//                         <Image
//                             mr={2}
//                             src={directionIcon} 
//                             title={'Route encounter'}
//                             w="34px"
//                         ></Image>
//                     </Button>
//                     <Button
//                         title="Go to pokemon encounter"
//                         w="100%" 
//                         mx={2} 
//                         onClick={() => {
//                             setIsPokemonEncounter(true)
//                             setRollBlockDisabed(false)
//                         }} 
//                         isDisabled={block?.length === 0}
//                     >
//                         <Image
//                             mr={2}
//                             src={swarmIcon}
//                             w="34px"
//                         ></Image>
//                         <Image
//                             mr={2}
//                             src={swarmIcon}
//                             w="34px"
//                         ></Image>
//                         <Image
//                             src={swarmIcon}
//                             w="34px"
//                         ></Image>
//                     </Button>
//                 </Flex>

//                 <BlockController 
//                     block={block}
//                     setMercant={setMercant}
//                     pokemonsTeam={pokemonsTeam}
//                 />
//             </Flex>
//         </Flex>
//     )
// }