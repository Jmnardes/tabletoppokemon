import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import Team from "../Inventary/Team"

export default function PokeTeam() {
    const { pokeBox } = useContext(PlayerContext)

    return (
        <Flex justifyContent="center" alignItems="center">
            {pokeBox?.map((poke) => {
                return (
                    <Box key={poke.id} m={2} mt={4}>
                        <Team poke={poke} />
                    </Box>
                )
            })}
        </Flex>
    )
}