import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase } from "@utils"
import Card from "@components/Pokemon/Card"
import PlayerContext from "@Contexts/PlayerContext"

export default function PokeBox({ poke, pokeBox }) {
    const { pokeTeam, updatePokeTeam, removeFromPokeBox, session } = useContext(PlayerContext)
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
        PokemonTooltip()
    }, [poke])

    return (
        <Button
            h={"auto"}
            w={"auto"}
            isDisabled={pokeTeam?.length === session.teamLength}
            onClick={() => {
                updatePokeTeam(poke)
                removeFromPokeBox(poke, pokeBox)
            }}
        >
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image
                    h={12}
                    w={16}
                    position="absolute"
                    title={stringToUpperCase(poke.name)} 
                    src={poke.sprites.mini}
                    fallbackSrc={poke.sprites.front}
                />
            </Tooltip>
        </Button>
    )
}