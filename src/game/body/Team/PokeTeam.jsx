import { Box, Center, Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "@context/PlayerContext"
import Card from "@features/pokemon/Card"

export default function PokeTeam({ bag, challenge = false }) {
    const { teamIds, pokemonData, moveToBox } = useContext(PlayerContext)

    useEffect(() => {
        if(teamIds.length > 6) {
            // Move o excedente para a box
            const excessId = teamIds[6]
            if (excessId) {
                moveToBox(excessId)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamIds])

    const teamPokemons = teamIds.map(id => pokemonData[id]).filter(Boolean)
    const cardWidth = "31%"

    return (
        <Center flexDir="column" flex="1">
            <Flex justifyContent="center" alignItems="center" flexWrap="wrap" flex="1" maxW="750px">
                {teamPokemons.map((poke) => {
                    return (
                        <Box key={poke.id} m={1} mt={3} w={cardWidth}>
                            <Card
                                poke={poke}
                                bag={bag}
                                challenge={challenge}
                                size="L"
                            />
                        </Box>
                    )
                })}
            </Flex>
        </Center>
    )
}