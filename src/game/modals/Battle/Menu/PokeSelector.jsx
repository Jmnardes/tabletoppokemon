import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "@utils"
import Card from "@components/Pokemon/Card"
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"

export default function PokeSelector({ poke, setPokemon, battleId }) {
    const { emit, setLoading, player } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Card poke={poke} tooltip={true} />
            )
        })
    }

    const battleChoosePokemon = (pokeId) => {
        if(poke.id === pokeId) {
            setPokemon(poke)
            setLoading({ loading: false })
        }
    }
    
    const battleTurnUpdate = (res) => {
        let players = res.players

        players.forEach(battlingPlayer => {
            if(battlingPlayer.player === player.id) {
                if(battlingPlayer.pokemon) {
                    battleChoosePokemon(battlingPlayer.pokemon.pokemonId)
                }
            }
        })
    }

    /* eslint-disable */
    useEffect(() => {
        let color = typeColor(poke.types)
        
        PokemonTooltip()
        setColorByType(color)
    }, [poke])

    useEffect(() => {
        socket.on('battle-update', res => battleTurnUpdate(res))

        return () => {
            socket.off('battle-update', battleTurnUpdate)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Button
            mx={6}
            alignItems="center" 
            flexDirection="column"
            h={20}
            w={20}
            border={`2px solid ${colorByType}`}
            borderRadius={8}
            onClick={() => {
                setLoading({ loading: true, text: 'Choosing pokemon...' })
                emit('battle-choose-pokemon', {battleId: battleId, pokemonId: poke.id, moveElement: 0})
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