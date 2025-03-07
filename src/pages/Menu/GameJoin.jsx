import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client";

export default function GameJoin() {
    const { handleToast } = useContext(PlayerContext)
    const [trainerName, setTrainerName] = useState('')
    const [sessionCode, setSessionCode] = useState('')

    return (
        <>
            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    Choose your name 
                </Text>
                <Input textAlign="center" maxLength={14} onChange={(e) => {setTrainerName(e.target.value)}} />
            </Flex>

            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    Room Code 
                </Text>
                <Input textAlign="center" maxLength={14} onChange={(e) => {setSessionCode(e.target.value)}} />
            </Flex>

            <Button w="100%" h={12} mt={4} mb={4} onClick={() => {

                if (trainerName.length < 3) {
                    handleToast({
                        id: 'name-length',
                        title: "Error",
                        description: "Name should have at least 3 caracters",
                        position: 'top',
                        status: 'error',
                    })
                    return
                }

                socket.emit('session-join', {
                    trainerName,
                    sessionCode
                })

            }}>Join Room</Button>
        </>
    )
}