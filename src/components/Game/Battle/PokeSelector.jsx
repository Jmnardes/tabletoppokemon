import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import Card from "../Pokemon/Card"
import PlayerContext from "../../../Contexts/PlayerContext"

export default function PokeSelector({ poke, setPokemon, battleId }) {
    const { emit } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Card poke={poke} tooltip={true} />
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
            mx={2}
            alignItems="center" 
            flexDirection="column"
            h={20}
            w={20}
            border={`2px solid ${colorByType}`}
            borderRadius={8}
            onClick={() => {
                setPokemon(poke)

                emit('battle-choose-pokemon', {battleId, id: poke.id})
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