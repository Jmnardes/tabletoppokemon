import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import socket from "../../client";
import PlayerContext from "../../Contexts/PlayerContext";

export default function GameJoin({ setIsPlayerInLobby }) {
    const { session } = useContext(PlayerContext)
    const [trainerName, setTrainerName] = useState('')
    const [sessionCode, setSessionCode] = useState('')
    
    useEffect(() => {
        session.sessionId && setIsPlayerInLobby(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.sessionId])

    return (
        <>
            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text fontSize="2xl" mb={2}>
                    Choose your name 
                </Text>
                <Input textAlign="center" fontSize="2xl" maxLength={14} onChange={(e) => {setTrainerName(e.target.value)}} />
            </Flex>

            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text fontSize="2xl" mb={2}>
                    Game Code 
                </Text>
                <Input textAlign="center" fontSize="2xl" maxLength={14} onChange={(e) => {setSessionCode(e.target.value)}} />
            </Flex>

            <Button w="100%" fontSize="3xl" h={12} mt={4} mb={4} onClick={() => {

                socket.emit('session-join', {
                    trainerName,
                    sessionCode
                })

            }}>Join Game</Button>
        </>
    )
}