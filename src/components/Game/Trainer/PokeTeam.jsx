import { Box, Center, Flex } from "@chakra-ui/react"
import { useContext, useEffect } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import Card from "../Pokemon/Card"
import TeamTitle from '../Team/TeamTitle'

export default function PokeTeam({ bag }) {
    const { pokeTeam, updatePokeBox, removeFromPokeTeam, session } = useContext(PlayerContext)

    useEffect(() => {
        if(pokeTeam.length > session.teamLength) {
            updatePokeBox(pokeTeam[3])
            removeFromPokeTeam(pokeTeam[3], pokeTeam)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeTeam])

    return (
        <Center flexDir="column" flex="1">
            <TeamTitle pokeTeam={pokeTeam} />
            <Flex justifyContent="center" alignItems="center" flex="1">
                {pokeTeam?.map((poke) => {
                    return (
                        <Box key={poke.id} m={2} mt={4}>
                            <Card
                                poke={poke}
                                pokeTeam={pokeTeam}
                                updatePokeBox={updatePokeBox}
                                removeFromPokeTeam={removeFromPokeTeam}
                                bag={bag}
                            />
                        </Box>
                    )
                })}
            </Flex>
        </Center>
    )
}