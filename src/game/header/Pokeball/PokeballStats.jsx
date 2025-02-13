import { useContext } from "react";
import { Center, Image, Text } from "@chakra-ui/react";

import PlayerContext from "@Contexts/PlayerContext";

import greatballIcon from '@assets/images/pokeballs/pokeball.png'
import superballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

import { FaInfinity } from "react-icons/fa"

export default function PokeballStats() {
    const { player } = useContext(PlayerContext)

    return (
        <Center mx={2}>
            <Center mx={2}>
                <FaInfinity size={18} />
                <Image
                    src={greatballIcon} 
                    title={'+0'}
                    w="24px"
                    ml={1}
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.greatball}x</Text>
                <Image
                    src={superballIcon} 
                    title={'+3'}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.ultraball}x</Text>
                <Image
                    src={ultraballIcon} 
                    title={'+6'}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.masterball}x</Text>
                <Image
                    src={masterballIcon} 
                    title={'+10'}
                    w="24px"
                ></Image>
            </Center>
        </Center>
    )
}