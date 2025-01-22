import { useContext } from "react";
import { Center, Image, Text } from "@chakra-ui/react";

import PlayerContext from "@Contexts/PlayerContext";

import greatballIcon from '@images/pokeballs/pokeball.png'
import superballIcon from '@images/pokeballs/greatball.png'
import ultraballIcon from '@images/pokeballs/ultraball.png'
import masterballIcon from '@images/pokeballs/masterball.png'
import stealIcon from '@images/items/steal.png'
import fightIcon from '@images/items/fight.png'
import eggIcon from '@images/items/egg.png'
import incubatorGreatIcon from '@images/items/incubator-great.png'

export default function PokeballStats() {
    const { player } = useContext(PlayerContext)

    return (
        <Center mx={2}>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.pokeball}x</Text>
                <Image
                    src={greatballIcon} 
                    title={'+0'}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.greatball}x</Text>
                <Image
                    src={superballIcon} 
                    title={'+2'}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.ultraball}x</Text>
                <Image
                    src={ultraballIcon} 
                    title={'+5'}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.masterball}x</Text>
                <Image
                    src={masterballIcon} 
                    title={'+99'}
                    w="24px"
                ></Image>
            </Center>
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