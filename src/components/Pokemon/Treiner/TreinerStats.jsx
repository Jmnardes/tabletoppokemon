import { Flex, Text } from "@chakra-ui/react";
import { FaWalking } from "react-icons/fa";
import { GiSpikes, GiSparkles, GiBullseye, GiCoins } from "react-icons/gi";

export function TreinerStats({
    walked,
    totalCatches,
    shinyCatches,
    totalCriticals,
    highestAmount
}) {
    return (
        <>
            <Flex alignItems="center" mx={4}>
                <FaWalking title="Distance Walked" size={24} />
                <Text ml={2}>{walked}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiSpikes title="Total catches" size={24} />
                <Text ml={2}>{totalCatches}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiSparkles title="Shiny catches" size={24} />
                <Text ml={2}>{shinyCatches}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiBullseye title="Criticals" size={24} />
                <Text ml={2}>{totalCriticals}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiCoins title="Highest amount" size={24} />
                <Text ml={2}>{highestAmount}</Text>
            </Flex>
        </>
    )
}