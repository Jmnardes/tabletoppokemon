import { useContext, useEffect, useState } from "react"
import {
    Tooltip,
    Button,
    Image
} from "@chakra-ui/react"
import { stringToUpperCase } from "../../../util"
import Team from "../Team/Team"
import PlayerContext from "../../../Contexts/PlayerContext"

export default function BoxPoke({ poke, pokeBox }) {
    const { pokeTeam, updatePokeTeam, removeFromPokeBox, session } = useContext(PlayerContext)
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
                />
            </Tooltip>
        </Button>
    )
}