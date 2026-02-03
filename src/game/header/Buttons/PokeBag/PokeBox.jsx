import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase } from "@utils"
import Card from "@components/Pokemon/Card"
import PlayerContext from "@Contexts/PlayerContext"

export default function PokeBox({ poke }) {
    const { teamIds, moveToTeam, session } = useContext(PlayerContext)
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
            isDisabled={teamIds?.length === session.teamLength}
            onClick={() => {
                moveToTeam(poke.id)
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