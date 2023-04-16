import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { pokemonBaseStat } from '../../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../../util'
import { Flex, Image, Text, CloseButton } from "@chakra-ui/react"
import Types from "../Table/Types"

function Team({ poke }) {
    const [colorByType, setColorByType] = useState('#000000')

    useEffect(() => {
        let color = typeColor(poke.type)

        setColorByType(color)
    }, [poke])

    return (
        <Flex
            alignItems="center" 
            flexDirection="column"
            border={ poke.shiny ? `8px ridge ${colorByType}` : `8px ridge ${colorByType}`}
            borderRadius={8}
            width={64}
            height={72}
            m={1}
            p={1}
            backgroundColor={ `${colorByType}90` }
            background={ poke.shiny ? `linear-gradient(165deg, ${colorByType}15 15%, ${colorByType} 50%, ${colorByType}15 85%)` : ''}
            shadow="dark-lg"
            _hover={{
                backgroundColor: `${colorByType}70`
            }}
        >
            <Flex flexDir="row" width="100%">
                <Flex width="100%" textAlign="center" flexDirection={"column"}>
                    <Text fontWeight="bold" letterSpacing={2}>{stringToUpperCase(poke.name)}</Text>
                    <Text fontSize={"sm"}>({poke.nature})</Text>
                </Flex>
                <CloseButton 
                    // onClick={removeFromTeam}
                    size="sm" 
                />
            </Flex>
            <Flex justifyContent="space-between" flexDirection="column">
                <Flex justifyContent="space-between">
                    <Flex>
                        <Image
                            w={44}
                            title={stringToUpperCase(poke.name)} 
                            src={poke.sprites.front} 
                        />
                    </Flex>
                    <Flex justifyContent="end" px={1/2} pt={1/2} width="20%">
                        <Types
                            types={poke.type} 
                            shiny={poke.shiny}
                            tier={poke.tier} 
                            nature={poke.nature}
                            color={`${colorByType}`}
                        />
                    </Flex>
                </Flex>

                <PokemonTable
                    health={pokemonBaseStat(poke.stats, 'hp', poke.nature, poke.shiny)}
                    attack={pokemonBaseStat(poke.stats, 'atk', poke.nature, poke.shiny)}
                    defense={pokemonBaseStat(poke.stats, 'def', poke.nature, poke.shiny)}
                    speed={pokemonBaseStat(poke.stats, 'spd', poke.nature, poke.shiny)}
                    tier={poke.tier}
                    type={poke.types}
                    nature={poke.nature}
                    name={poke.name}
                    shiny={poke.shiny}
                />
            </Flex>
        </Flex>
    )    
}

export default Team