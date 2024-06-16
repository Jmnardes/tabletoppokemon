import { useEffect, useState } from "react"
import { Tooltip, Image, Box } from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import Types from "../Pokemon/Types"

export default function OpponentPoke({ poke }) {
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Types types={poke.types} w={6} h={6} />
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
        <Box
            mx={2} h={20} w={20} borderRadius={8}
            alignItems="center" flexDirection="column"
            border={`2px solid ${colorByType}`}
        >
            <Tooltip label={pokeStatsTooltip} background="none">
                <Image
                    position="absolute" h={20}
                    title={stringToUpperCase(poke.name)} 
                    src={poke.sprites.front}
                />
            </Tooltip>
        </Box>
    )
}