import { useEffect, useState } from "react"
import {
    Flex,
    Tooltip,
    Box,
    Center,
    Text,
    Button
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import { FaStar } from "react-icons/fa";
import Team from "./Team"

function Inventary({ poke, battleBox, battleTeam, setBattleTeam, pokeBox, removeFromPokeBox }) {
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
            <Button
                alignItems="center" 
                flexDirection="column"
                background={colorByType}
                borderTop={ `6px solid ${rarityColor(poke.rarity.rarity)}`}
                borderRight={ `2px solid ${colorByType}`}
                borderLeft={ `2px solid ${colorByType}`}
                borderRadius={battleBox ? "4px" : "4px 4px 0 0"}
                _hover={battleBox && { 'opacity': 0.6 }}
                isDisabled={battleBox && battleTeam?.length === 6}
                onClick={() => {
                    setBattleTeam(old => [...old, poke])
                    removeFromPokeBox(poke, pokeBox)
                }}
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
            </Button>
        </>
    )
}

export default Inventary