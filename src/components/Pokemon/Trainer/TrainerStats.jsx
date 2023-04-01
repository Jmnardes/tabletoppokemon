import { Flex, Text } from "@chakra-ui/react";
import { FaWalking } from "react-icons/fa";
import { GiSpikes, GiSparkles, GiBullseye, GiCoins } from "react-icons/gi";

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export function TrainerStats() {
    const { status } = useContext(PlayerContext)

    return (
        <>
            <Flex alignItems="center" mx={4}>
                <FaWalking title="Distance Walked" size={24} />
                <Text ml={2}>{status.walkedBlocks}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiSpikes title="Total catches" size={24} />
                <Text ml={2}>{status.catches}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiSparkles title="Shiny catches" size={24} />
                <Text ml={2}>{status.shinyCatches}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiBullseye title="Criticals" size={24} />
                <Text ml={2}>{status.criticals}</Text>
            </Flex>
            <Flex alignItems="center" mx={4}>
                <GiCoins title="Highest amount" size={24} />
                <Text ml={2}>{status.highestAmount}</Text>
            </Flex>
        </>
    )
}