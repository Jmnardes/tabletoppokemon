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

    return (
        <Center flex="1" overflow="auto">
            <Flex justifyContent="center" alignItems="center" flex="1" gap={1} px={2}>
                {teamPokemons.map((poke) => {
                    return (
                        <Box key={poke.id} flex="1" minW={0} maxW="200px">
                            <Card
                                poke={poke}
                                bag={bag && teamIds.length > 1}
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