import { Badge, Center, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";
import TrainerBar from "./Trainer/TrainerBar";
import PokeballStats from './Pokeball/PokeballStats'
import NextEvent from "./NextEvent/NextEvent";

export default function GameHeader() {
    const { player, nextEvent } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    return (
        <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center flex="1" justifyContent={"start"}>
                <Badge
                    title={player.status.trainerName}
                    maxW={48} p={2} px={4} ml={4}
                    backgroundColor={bgColor}
                    borderRadius={6}
                    isTruncated
                    fontWeight="bold"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {player.status.trainerName}
                </Badge>
                <TrainerBar />
            </Center>
            <Center>
                <NextEvent nextEvent={nextEvent} />
            </Center>
            <Center flex="1" justifyContent={"end"}>
                <PokeballStats />
            </Center>
        </Center>
    )
}