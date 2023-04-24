import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import Team from "../Team/Team"
import PlayerContext from "../../../Contexts/PlayerContext"

export default function BoxPoke({ poke, battleBox, battleTeam, setBattleTeam, pokeBox }) {
    const { pokeTeam, updatePokeTeam, removeFromPokeBox, session } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Team poke={poke} tooltip={true} />
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        let color = typeColor(poke.types)
        
        PokemonTooltip()
        setColorByType(color)
    }, [poke])

    return (
        <Button
            alignItems="center" 
            flexDirection="column"
            h={20}
            w={20}
            border={`2px solid ${colorByType}`}
            borderRadius={8}
            _hover={battleBox && { 'opacity': 0.6 }}
            isDisabled={battleBox ? battleTeam?.length === 6 : pokeTeam?.length === session.teamLength}
            onClick={() => {
                if(battleBox) {
                    setBattleTeam(old => [...old, poke])
                } else {
                    updatePokeTeam(poke)
                }
                removeFromPokeBox(poke, pokeBox)
            }}
        >
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image
                    position="absolute"
                    h={20}
                    w={20}
                    title={stringToUpperCase(poke.name)} 
                    src={poke.sprites.front}
                />
            </Tooltip>
        </Button>
    )
}