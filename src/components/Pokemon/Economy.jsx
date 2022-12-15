import PokeModal from '../Pokemon/Modal/Modal'
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GiTwoCoins, GiRibbonMedal, GiTrophyCup } from "react-icons/gi";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import pokeball from '../../assets/images/pokeballs/poke.png'

export function Economy({ coins, medal, trophy, handleAddOneCoin, handleRemoveOneCoin, handleAddFiveCoins, handleRemoveFiveCoins, handleAddMedal, handleRemoveMedal, handleAddTrophy, handleRemoveTrophy }) {
    return (
        <PokeModal title={"Economy"} button={<><GiTwoCoins /> <Text ml={2}>{coins}</Text></>}>
            <Flex flexDirection="column">
                <Flex justifyContent="center" alignItems="center">
                    <GiTwoCoins size="40px" /> <Text fontSize="3xl" ml={2}>{coins}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Flex m={4}>
                        <Button m={2} onClick={handleAddFiveCoins}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>5</Text> </Button>
                        <Button m={2} onClick={handleAddOneCoin}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveOneCoin}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveFiveCoins}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>5</Text> </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection="column">
                <Flex justifyContent="center" alignItems="center">
                    <GiRibbonMedal size="40px" /> <Text fontSize="3xl" ml={2}>{medal}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Flex m={4}>
                        <Button m={2} onClick={handleAddMedal}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveMedal}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection="column">
                <Flex justifyContent="center" alignItems="center">
                    <GiTrophyCup size="40px" /> <Text fontSize="3xl" ml={2}>{trophy}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Flex m={4}>
                        <Button m={2} onClick={handleAddTrophy}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveTrophy}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex>
                <Image
                    src={pokeball} 
                    alt={'pokeball'}
                    w="40px"
                ></Image>
            </Flex>
        </PokeModal>
    )
}