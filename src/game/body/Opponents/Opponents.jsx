import { Flex } from "@chakra-ui/react";
import { useContext, useMemo } from "react";
import PlayerContext from "@context/PlayerContext";
import OpponentCard from "./OpponentCard";

const MAX_PER_COLUMN = 5

export default function Opponents() {
    const { opponents, waitingForPlayers } = useContext(PlayerContext)

    const columns = useMemo(() => {
        const cols = opponents.reduce((acc, cur, index) => {
            if (index % MAX_PER_COLUMN === 0) acc.push([])
            acc[acc.length - 1].push(cur)
            return acc
        }, [])

        return cols.map((column, index) => (
            <Flex
                key={index}
                direction="column"
                gap="0.5rem"
                justify="center"
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
        <Flex gap="0.5rem" h="full" align="center">
            {columns}
        </Flex>
    )
}
