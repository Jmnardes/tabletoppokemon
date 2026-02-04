import { Button, CircularProgress, Divider, Flex, Text, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import { FaRegCheckCircle, FaRegTimesCircle, FaRegCopy } from "react-icons/fa";

import crownIcon from '@assets/images/game/crown.png'
import starIcon from '@assets/images/game/star.png'

export default function GameLobby() {
    const {emit, session, opponents, player, version} = useContext(PlayerContext)
    const [isLoading, setIsLoading] = useState(false)

    const ConfigurationSlot = ({name1, data1, name2, data2}) => {
        return (
            <Flex fontSize="2xs" justifyContent={"space-between"} w="100%">
                <Flex>
                    <Text mr={2}>{name1}:</Text>
                    <Text>{data1}</Text>
                </Flex>
                <Flex>
                    <Text mr={2}>{name2}:</Text>
                    <Text>{data2}</Text>
                </Flex>
            </Flex>
        )
    }

    const PlayerSlot = ({trainerName, isReady}) => {
        return (
            <Flex width={"100%"} justifyContent={"space-between"} m={2}>
                <Text>{trainerName}</Text>
                {isReady ? (
                    <FaRegCheckCircle size={24} color="green" />
                ) : (
                    <FaRegTimesCircle size={24} color="red" />
                )}
            </Flex>
        )
    }
    const handleCopyCode = () => {
        navigator.clipboard.writeText(session.sessionCode)
    }

    useEffect(() => {
        setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.ready])

    return (
        <>
            <Flex alignItems="center" mt={4}>
                <Text fontSize="3xl">
                    {session.sessionCode}
                </Text>
                <Flex mb={1} ml={2} 
                    justifyContent="center" 
                    _hover={{ 'cursor': 'pointer', 'opacity': 0.9 }}
                    onClick={handleCopyCode}
                >
                    <FaRegCopy title="Copy code" size={24} />
                </Flex>
            </Flex>
            <Divider my={4} />
            
            <Flex 
                width="100%" 
                flexDirection="column" 
                alignItems="center" 
                bg="rgba(255, 215, 0, 0.1)" 
                borderRadius="md" 
                p={3} 
                mb={4}
            >
                <Text fontSize="sm" fontWeight="bold" mb={3}>
                    Game Objective
                </Text>
                <Flex width="100%" gap={2} justifyContent="space-between">
                    <Flex 
                        flex={1}
                        flexDirection="column" 
                        alignItems="center" 
                        justifyContent="center"
                        bg="rgba(255, 215, 0, 0.15)"
                        borderRadius="md"
                        p={2}
                    >
                        <Image
                            src={crownIcon} 
                            title={'Badges'}
                            w="28px"
                            mb={1}
                        />
                        <Text fontSize="2xs" textAlign="center">
                            Win {session.badgesToWin || 8} badges to end the game
                        </Text>
                    </Flex>
                    <Flex 
                        flex={1}
                        flexDirection="column" 
                        alignItems="center" 
                        justifyContent="center"
                        bg="rgba(255, 215, 0, 0.15)"
                        borderRadius="md"
                        p={2}
                    >
                        <Image
                            src={starIcon}
                            title={'Ranking Points'}
                            w="28px"
                            mb={1}
                        />
                        <Text fontSize="2xs" textAlign="center">
                            Highest ranking wins
                        </Text>
                    </Flex>
                </Flex>
            </Flex>

            <Divider my={4} />

                <ConfigurationSlot 
                    name1={'Difficulty'}
                    data1={session.gameDifficulty}
                    name2={'Shiny chance %'}
                    data2={session.shinyChance}
                />
                <ConfigurationSlot 
                    name1={'Badges to win'}
                    data1={session.badgesToWin}
                    name2={'Team length'}
                    data2={session.teamLength}
                />
                <ConfigurationSlot 
                    name1={'Level up/turn'}
                    data1={session.levelUpgradePerTurn}
                    name2={'Turns until gym'}
                    data2={session.turnsUntilNextGym}
                />
                <ConfigurationSlot 
                    name1={'Gym strength'}
                    data1={session.gymStrengthBonus}
                    name2={'Generation'}
                    data2={session.generation}
                />
            <Divider my={4} />
            <Flex width={"100%"} justifyContent={"space-between"} mb={6}>
                <Text fontWeight={"bold"}>Player</Text>
                <Text fontWeight={"bold"}>Ready</Text>
            </Flex>
            <Flex width={"100%"} justifyContent={"space-between"} m={2}>
                <Text>{player.status.trainerName}</Text>
                {isLoading ? (
                    <CircularProgress isIndeterminate size={6} />
                ) : (
                    player.ready ? (
                        <FaRegCheckCircle size={24} color="green" />
                    ) : (
                        <FaRegTimesCircle size={24} color="red" />
                    )
                )}
            </Flex>
            {
                opponents?.length > 0 && opponents.map(opponent => {
                    return (
                        <PlayerSlot
                            key={opponent?.id}
                            trainerName={opponent?.status?.trainerName} 
                            isReady={opponent?.ready} 
                        />
                    )
                })
            }
            
            <Divider my={4} />

            <Text fontSize={"2xl"} position={"absolute"} bottom={0} left={0}>@Version {Number(version).toFixed(2)}</Text>

            <Button isDisabled={isLoading} mb={4} mt={2} width="100%" onClick={() => {
                setIsLoading(true)

                emit('lobby-ready', !player.ready)
            }}>
                {player.ready ? "Cancel" : "Ready"}
            </Button>
        </>
    )
}