import { Box, Button, Flex, useColorMode } from "@chakra-ui/react";
import { useContext, useState, useMemo } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import OpponentCard from "./OpponentCard";

export default function Opponents() {
    const { opponents } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    // const [opp, setOpp] = useState([])

    // const newOpp = () => {
    //     return {
    //         id: `${Date.now()}`,
    //         status: { trainerName: 'aaaaaaaaaa', level: 10 },
    //         currency: {
    //             crowns: 10,
    //             stars: 10,
    //             coins: 10,
    //         },
    //         online: Math.random() > 0.4,
    //         turnReady: Math.random() > 0.4,
    //     }
    // }

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
            >
                {column.map(opponent => (
                    <OpponentCard
                        key={opponent.id}
                        opponent={opponent}
                    />
                ))}
            </Flex>
        ))
    }, [opponents])

    return (
        <>
            {/* <Button onClick={() => setOpp(old => old.concat([ newOpp() ]))}>+</Button>
            <Button onClick={() => setOpp(old => old.slice(0, -1))}>-</Button> */}
            <Flex
                padding="1rem"
                gap="1rem"
                backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
            >
                {columns}
            </Flex>
        </>
    )
}
