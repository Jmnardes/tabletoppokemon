import { useEffect, useState } from "react"
import {
    Image,
    Flex,
    Tooltip,
    Box,
    Center,
    Text
} from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from "../../../util"
import PokemonTable from "../Table/PokemonTable"
import Types from "../Table/Types"
import { FaStar } from "react-icons/fa";

function Inventary({ poke }) {
    const [colorByType, setColorByType] = useState('#000000')
    const [pokeStatsTooltip, setpokeStatsTooltip] = useState('')

    const PokemonTooltip = () => {
        setpokeStatsTooltip(() => {
            return (
                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Flex justifyContent="space-between" width="100%">
                        <Box mb={48}>
                            <Image
                                w={28}
                                width="80%"
                                position="absolute"
                                left="28px"
                                title={stringToUpperCase(poke.name)} 
                                src={poke.sprites.front} 
                            />
                        </Box>
                        <Flex justifyContent="end" px={1/2} pt={1/2} width="20%">
                            <Types
                                types={poke.types}
                                shiny={poke.shiny}
                                tier={poke.tier} 
                                nature={poke.nature}
                            />
                        </Flex>
                    </Flex>
    
                    <PokemonTable
                        health={poke.stats.hp}
                        attack={poke.stats.atk}
                        defense={poke.stats.def}
                        accuracy={poke.stats.acc}
                        evasion={poke.stats.evs}
                        critical={poke.stats.crt}
                        tier={poke.tier}
                        type={poke.types}
                        nature={poke.nature}
                        name={poke.name}
                        shiny={poke.shiny}
                        showingType={'inventary'}
                    />
                </Flex>
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
        <>
            <Flex
                alignItems="center" 
                flexDirection="column" 
                borderTop={ `2px solid ${colorByType}`}
                borderRight={ `2px solid ${colorByType}`}
                borderLeft={ `2px solid ${colorByType}`}
                borderRadius="8px 8px 0 0"
            >
                <Tooltip label={pokeStatsTooltip} borderRadius={16}>
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