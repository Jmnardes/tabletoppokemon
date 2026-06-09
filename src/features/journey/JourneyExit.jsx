import { useContext, useState } from "react"
import { Flex, Text, Button, Badge } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import socket from "@client"

export default function JourneyExit({ journeyState, onLeave }) {
    const { player, session, setPlayer, syncPokemonsFromServer } = useContext(PlayerContext)
    const [exiting, setExiting] = useState(false)

    const handleExit = () => {
        setExiting(true)

        const request = {
            id: player.id,
            sessionCode: session.sessionCode,
            data: {},
        }

        socket.emit('journey-exit', request, (res) => {
            setExiting(false)
            if (res?.success) {
                const result = res.result
                if (result.pokeTeam) {
                    syncPokemonsFromServer(result.pokeTeam, result.pokeBox || [])
                }
                if (result.balls) {
                    setPlayer(prev => ({ ...prev, balls: result.balls }))
                }
                onLeave()
            }
        })
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center" p={4} w="100%" maxW="500px">
            <Text fontSize="xl" mb={2}>
                Journey Complete
            </Text>
            <Badge colorScheme="blue" fontSize="md" mb={4} p={2} borderRadius={8}>
                Round {journeyState.round} reached
            </Badge>

            <Button
                colorScheme="blue"
                size="lg"
                onClick={handleExit}
                isLoading={exiting}
            >
                Leave Journey
            </Button>
        </Flex>
    )
}
