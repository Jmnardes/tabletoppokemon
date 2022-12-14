import PokeModal from '../Pokemon/Modal/Modal'
import { Button, Flex, Text } from "@chakra-ui/react";
import { GiTwoCoins } from "react-icons/gi";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export function Coins({ coins, handleAddOneCoin, handleRemoveOneCoin, handleAddFiveCoins, handleRemoveFiveCoins }) {
    return (
        <PokeModal title={"Economy"} button={<><GiTwoCoins /> <Text ml={2}>{coins}</Text></>}>
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
        </PokeModal>
    )
}