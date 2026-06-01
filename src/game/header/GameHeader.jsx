import { Badge, Center, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";
import TrainerBar from "./Trainer/TrainerBar";
import PokeballStats from './Pokeball/PokeballStats'
import Settings from './Buttons/Settings/Settings'
import NextEvent from "./NextEvent/NextEvent";
import BadgeCollectionTooltip from "./Buttons/BadgeCollection/BadgeCollectionModal";
import TaskBoardTooltip from "./Trainer/TaskBoardTooltip";
import ObjectivesTooltip from "./Trainer/ObjectivesTooltip";
import { FaExclamationCircle, FaTrophy } from "react-icons/fa";
import crownIcon from '@assets/images/game/crown.png';

export default function GameHeader() {
    const { player, nextEvent, game, session } = useContext(PlayerContext)
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
                {!game.hasEnded && (
                    <Tooltip label={<BadgeCollectionTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <Image src={crownIcon} title={'Badges'} w="24px" />
                            <Text ml={1} fontSize="2xs">{player.status.badges || 0} / {session.badgesToWin || 8}</Text>
                        </Flex>
                    </Tooltip>
                )}
                {!game.hasEnded && (
                    <Tooltip label={<TaskBoardTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <FaExclamationCircle size={20} color="orange" />
                        </Flex>
                    </Tooltip>
                )}
                {!game.hasEnded && (
                    <Tooltip label={<ObjectivesTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <FaTrophy size={18} color="gold" />
                        </Flex>
                    </Tooltip>
                )}
                <PokeballStats />
                <Settings />
            </Center>
        </Center>
    )
}