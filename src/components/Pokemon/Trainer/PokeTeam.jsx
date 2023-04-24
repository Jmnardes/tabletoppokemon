import { Box, Center, Flex } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import Team from "../Team/Team"
import TeamTitle from '../Team/TeamTitle'

export default function PokeTeam() {
    const { pokeTeam, updatePokeBox, removeFromPokeTeam } = useContext(PlayerContext)

    return (
        <Center flexDir="column" flex="1">
            <TeamTitle pokeTeam={pokeTeam} />
            <Flex justifyContent="center" alignItems="center" flex="1">
                {pokeTeam?.map((poke) => {
                    return (
                        <Box key={poke.id} m={2} mt={4}>
                            <Team
                                poke={poke}
                                pokeTeam={pokeTeam}
                                updatePokeBox={updatePokeBox}
                                removeFromPokeTeam={removeFromPokeTeam}
                            />
                        </Box>
                    )
                })}
            </Flex>
        </Center>
    )
}