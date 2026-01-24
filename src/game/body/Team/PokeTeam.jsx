import { Box, Center, Flex } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import Card from "@components/Pokemon/Card"
import TeamTitle from '@game/body/Team/TeamTitle'

export default function PokeTeam({ bag, challenge = false }) {
    const { getTeamWithData } = useContext(PlayerContext)

    return (
        <Center flexDir="column" flex="1">
            {!challenge && (
                <TeamTitle />
            )}
            <Flex justifyContent="center" alignItems="center" flex="1">
                {getTeamWithData?.map((poke) => {
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