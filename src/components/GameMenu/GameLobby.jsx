import { Button, CircularProgress, Divider, Flex, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "../../Contexts/PlayerContext";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

export default function GameLobby() {
    const {emit, status, session, opponents, player} = useContext(PlayerContext)
    const [isLoading, setIsLoading] = useState(false)

    const ConfigurationSlot = ({name1, data1, name2, data2}) => {
        return (
            <Flex  fontSize="xs"  justifyContent={"space-between"}>
                <Flex>
                    <Text mx={2}>{name1}:</Text>
                    <Text>{data1}</Text>
                </Flex>
                <Divider orientation='vertical' />
                <Flex>
                    <Text mx={2}>{name2}:</Text>
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

    useEffect(() => {
        setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.ready])

    return (
        <>
            <Text fontSize="4xl" mb={2}>
                {session.sessionCode}
            </Text>
            <Divider my={4} />
                <ConfigurationSlot 
                    name1={'Difficulty'}
                    data1={session.gameDifficulty}
                    name2={'Generation'}
                    data2={session.generation}
                />
                <ConfigurationSlot 
                    name1={'Team length'}
                    data1={session.teamLength}
                    name2={'Shiny percent'}
                    data2={session.shinyChance}
                />
                <ConfigurationSlot 
                    name1={'Min players'}
                    data1={session.minPlayers}
                    name2={'Max players'}
                    data2={session.maxPlayers}
                />
            <Divider my={4} />
            <Flex width={"100%"} justifyContent={"space-between"} mb={6}>
                <Text fontWeight={"bold"}>Name</Text>
                <Text fontWeight={"bold"}>Ready</Text>
            </Flex>
            <Flex width={"100%"} justifyContent={"space-between"} m={2}>
                <Text>{status.trainerName}</Text>
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

            <Button isDisabled={isLoading} mb={4} mt={2} width={32} onClick={() => {
                setIsLoading(true)

                emit('lobby-ready', !player.ready)
            }}>
                {player.ready ? "Cancel" : "Ready"}
            </Button>
        </>
    )
}