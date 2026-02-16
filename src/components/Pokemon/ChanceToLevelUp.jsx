import { useContext, useEffect, useState } from "react"
import PlayerContext from "../../Contexts/PlayerContext"
import { Box, Progress, Text, Tooltip } from "@chakra-ui/react"
import { upgradePokemonLevelChance } from '@utils'

export default function ChanceToLevelUp({ selectedPokemon }) {
    const { session } = useContext(PlayerContext)
    const [changeToLevelUp, setChanceToLevelUp] = useState(0)

    useEffect(() => {
        if (selectedPokemon) {
            const levelChance = upgradePokemonLevelChance({ sessionLevel: session.level, pokeLevel: selectedPokemon.level, dusts: selectedPokemon.dust, berries: selectedPokemon.berries })
            setChanceToLevelUp(levelChance)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon, selectedPokemon?.dust, selectedPokemon?.berries])

    return (
        <Tooltip label="Chance in leveling up next turn" p={4} borderRadius={6}>
            <Box position="absolute" bottom={0}>
                <Progress
                    value={changeToLevelUp} max={100} 
                    size="md" w={64}
                    colorScheme={"purple"}
                    borderRadius={6}
                />
                <Text
                    position="absolute"
                    top="50%" left="50%"
                    transform="translate(-50%, -50%)"
                    fontSize="xx-small"
                >
                    {changeToLevelUp}%
                </Text>
            </Box>
        </Tooltip>
    )
}