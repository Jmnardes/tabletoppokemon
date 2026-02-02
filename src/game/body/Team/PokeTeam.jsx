import { Box, Center, Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import Card from "@components/Pokemon/Card"
import TeamTitle from '@game/body/Team/TeamTitle'

export default function PokeTeam({ bag, challenge = false }) {
    const { teamIds, pokemonData, moveToBox, session } = useContext(PlayerContext)

    useEffect(() => {
        if(teamIds.length > session.teamLength) {
            // Move o excedente para a box
            const excessId = teamIds[session.teamLength]
            if (excessId) {
                moveToBox(excessId)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamIds])

    const teamPokemons = teamIds.map(id => pokemonData[id]).filter(Boolean)

    return (
        <Center flexDir="column" flex="1">
            {!challenge && (
                <TeamTitle pokemons={teamPokemons} />
            )}
            <Flex justifyContent="center" alignItems="center" flex="1">
                {teamPokemons.map((poke) => {
                    return (
                        <Box key={poke.id} m={2} mt={4}>
                            <Card
                                poke={poke}
                                bag={bag}
                                challenge={challenge}
                            />
                        </Box>
                    )
                })}
            </Flex>
        </Center>
    )
}