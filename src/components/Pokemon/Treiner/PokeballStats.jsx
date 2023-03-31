import { Flex, Image, Text } from "@chakra-ui/react";
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'
import stealIcon from '../../../assets/images/items/steal.png'
import fightIcon from '../../../assets/images/items/fight.png'
import eggIcon from '../../../assets/images/items/egg.png'
import incubatorGreatIcon from '../../../assets/images/items/incubator-great.png'

export default function PokeballStats({
    greatball,
    superball,
    ultraball,
    masterball,
    fight,
    steal,
    pokemonEgg,
    greatIncubator
}) {
    return (
        <>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={greatballIcon} 
                    title={'+2'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{greatball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={superballIcon} 
                    title={'+3'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{superball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={ultraballIcon} 
                    title={'+5'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{ultraball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={masterballIcon} 
                    title={'+10'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{masterball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={stealIcon} 
                    title={'Team Rocket Pass'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{steal}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={fightIcon} 
                    title={'Special Move'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{fight}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={eggIcon} 
                    title={'Pokemon Egg'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{pokemonEgg}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={incubatorGreatIcon} 
                    title={'Great Incubator'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{greatIncubator}</Text>
            </Flex>
        </>
    )
}