import { Badge, Center, Text, Tooltip, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"

export default function NextEvent() {
    const { player, nextEvent } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    if (!nextEvent) return
    
    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    // const EventBlock = () => {
    //     switch (nextEvent.type) {
    //         case 'battle':
    //             return <Text>Your opponent is {nextEvent.event[0].battle.participants.reduce(battlingPlayer => battlingPlayer.id !== player.id)}</Text>
    //         case 'walk':
    //             return <Text>walk</Text>
    //         case 'challenge':
    //             return <Text>challenge</Text>
    //         default:
    //             return <Text>No event</Text>
    //     }
    // }

    const TooltipContainer = () => {
        return (
            <Center flex flexDirection={"column"} gap={8}>
                <Text>Your next event will be a {nextEvent}</Text>
                {/* <EventBlock /> */}
            </Center>
        )
    }

    return (
        <>
            {nextEvent && <Tooltip label={(
                <TooltipContainer />
            )} p={8} textAlign={"center"} borderRadius={8}>
                <Badge p={2} px={4} backgroundColor={bgColor} borderRadius={6}>{nextEvent}</Badge>
            </Tooltip>}
        </>
    )
}