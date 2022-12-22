import { Flex, Image, Text } from "@chakra-ui/react";
import greatballIcon from '../../../assets/images/pokeballs/poke.png'
import superballIcon from '../../../assets/images/pokeballs/golden.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultra.png'

export default function PokeballStats({
    greatball,
    superball,
    ultraball
}) {
    return (
        <>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={greatballIcon} 
                    alt={'greatball'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{greatball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={superballIcon} 
                    alt={'superball'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{superball}</Text>
            </Flex>
            <Flex alignItems="center" mx={3}>
                <Image
                    src={ultraballIcon} 
                    alt={'ultraball'}
                    w="28px"
                ></Image>
                <Text fontSize="14px" mt={1} ml={0.5}>{ultraball}</Text>
            </Flex>
        </>
    )
}