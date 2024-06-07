import { Center, Image, Text } from "@chakra-ui/react";
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'
import stealIcon from '../../../assets/images/items/steal.png'
import fightIcon from '../../../assets/images/items/fight.png'
import eggIcon from '../../../assets/images/items/egg.png'
import incubatorGreatIcon from '../../../assets/images/items/incubator-great.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function PokeballStats() {
    const { player } = useContext(PlayerContext)

    return (
        <Center mx={2}>
            {player.balls.pokeball > 0 && (
                <Center mx={3}>
                    <Text mr={1}>{player.balls.pokeball}x</Text>
                    <Image
                        src={greatballIcon} 
                        title={'+0'}
                        w="24px"
                    ></Image>
                </Center>
            )}
            {player.balls.greatball > 0 && (
                <Center mx={3}>
                    <Text mr={1}>{player.balls.greatball}x</Text>
                    <Image
                        src={superballIcon} 
                        title={'+2'}
                        w="24px"
                    ></Image>
                </Center>
            )}
            {player.balls.ultraball > 0 && (
                <Center mx={3}>
                    <Text mr={1}>{player.balls.ultraball}x</Text>
                    <Image
                        src={ultraballIcon} 
                        title={'+5'}
                        w="24px"
                    ></Image>
                </Center>
            )}
            {player.balls.masterball > 0 && (
                <Center mx={3}>
                    <Text mr={1}>{player.balls.masterball}x</Text>
                    <Image
                        src={masterballIcon} 
                        title={'+20'}
                        w="24px"
                    ></Image>
                </Center>
            )}
            {/* <Flex alignItems="center" mx={3}>
                <Image
                    src={stealIcon} 
                    title={'Team Rocket Pass'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{player.items.steal}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={fightIcon} 
                    title={'Special Move'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{player.items.fight}</Text>
            </Flex> */}
            {/* <Flex alignItems="center" mx={3}>
                <Image
                    src={eggIcon} 
                    title={'Pokemon Egg'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{player.items.pokemonEgg}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={incubatorGreatIcon} 
                    title={'Great Incubator'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{player.items.incubator}</Text>
            </Flex> */}
        </Center>
    )
}