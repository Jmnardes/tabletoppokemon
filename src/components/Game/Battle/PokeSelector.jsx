import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import Card from "../Pokemon/Card"
import PlayerContext from "../../../Contexts/PlayerContext"
import socket from "../../../client"

export default function PokeSelector({ poke, setPokemon, battleId }) {
    const { emit, setLoadingApi } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Card poke={poke} tooltip={true} />
            )
        })
    }

    const battleChoosePokemon = () => {
        setLoadingApi(false)
        setPokemon(poke)
    }

    /* eslint-disable */
    useEffect(() => {
        let color = typeColor(poke.types)
        
        PokemonTooltip()
        setColorByType(color)
    }, [poke])

    useEffect(() => {
        socket.on('battle-choose-pokemon', battleChoosePokemon)

        return () => {
            socket.off('battle-choose-pokemon', battleChoosePokemon)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                setLoadingApi(true)
                emit('battle-choose-pokemon', {battleId: battleId, pokemonId: poke.id})
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