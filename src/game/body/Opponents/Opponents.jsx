import { Center, Flex } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import OpponentCard from "./OpponentCard";

export default function Opponents() {
    const { opponents, waitingForPlayers } = useContext(PlayerContext)

    const columns = useMemo(() => {
        const columns = opponents.reduce((acc, cur, index) => {
            if (index % 4 === 0) acc.push([])
            acc[acc.length - 1].push(cur)
            return acc
        }, [])

        return columns.map((column, index) => (
            <Flex
                key={index}
                direction="column"
                justify="space-evenly"
                h="full"
            >
                {column.map(opponent => (
                    <OpponentCard
                        key={opponent.id}
                        opponent={opponent}
                        inFront={waitingForPlayers}
                    />
                ))}
            </Flex>
        ))
    }, [opponents, waitingForPlayers])

    return (
        <>
            <Center minW={56} h={"full"}>
                {columns}
            </Center>
        </>
    )
}
