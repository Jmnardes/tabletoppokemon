import { Flex, Image, Text } from "@chakra-ui/react";
import greatballIcon from '../../../assets/images/pokeballs/poke.png'
import superballIcon from '../../../assets/images/pokeballs/golden.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultra.png'
import premierballIcon from '../../../assets/images/pokeballs/premier.png'
import masterballIcon from '../../../assets/images/pokeballs/master.png'

export default function PokeballStats({
    greatball,
    superball,
    ultraball,
    premierball,
    masterball
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
                    src={premierballIcon} 
                    title={'+7'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{premierball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={masterballIcon} 
                    title={'+10'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{masterball}</Text>
            </Flex>
        </>
    )
}