import { useEffect, useState } from "react"
import {
    Flex,
    Tooltip,
    Box,
    Center,
    Text
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import { FaStar } from "react-icons/fa";
import Team from "./Team"

function Inventary({ poke }) {
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Team poke={poke} tooltip={true} />
            )
        })
    }

    const rarityColor = (rarity) => {
        if(rarity === 1) return '#ff666690'
        if(rarity === 2) return '#4682B4'
        if(rarity === 3) return '#d4af37'
        return '#FFFFFF50'
    }

    /* eslint-disable */
    useEffect(() => {
        let color = typeColor(poke.types)
        
        PokemonTooltip()
        setColorByType(color)
    }, [poke])

    return (
        <>
            <Flex
                alignItems="center" 
                flexDirection="column"
                background={colorByType}
                borderTop={ `6px solid ${rarityColor(poke.rarity.rarity)}`}
                borderRight={ `2px solid ${colorByType}`}
                borderLeft={ `2px solid ${colorByType}`}
                borderRadius="4px 4px 0 0"
            >
                <Tooltip label={pokeStatsTooltip} background="none">
                    <Flex>
                        <Flex 
                            borderRadius={0} 
                            width="max-content"
                            minWidth={28}
                            textAlign="center" 
                            fontWeight="bold" 
                            p={1}
                            _hover={{
                                cursor: 'pointer'
                            }}
                        >
                            <Center w="100%">
                                {(poke.shiny &&
                                    <Box mr={1} display="flex" alignItems="center" justifyContent="center">
                                        <FaStar title="Shiny" size={10}/>
                                    </Box>
                                )}
                                <Text textAlign="center">{`(${poke.tier})` + ' ' + stringToUpperCase(poke.name)}</Text>
                            </Center>
                        </Flex>
                    </Flex>
                </Tooltip>
            </Flex>
        </>
    )
}

export default Inventary