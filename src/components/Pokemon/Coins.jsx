import { Button, Flex, Text } from "@chakra-ui/react";
import { GiTwoCoins } from "react-icons/gi";

export function Coins({ coins }) {
    return (
        <Flex mx={4}>
            <Button><GiTwoCoins /> <Text ml={2}>{coins}</Text> </Button>
        </Flex>
    )
}