import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { stringToUpperCase, typeColor } from '../../../util'
import { Flex, Image, Text, CloseButton } from "@chakra-ui/react"
import Types from "../Table/Types"

function Team({ poke, pokeTeam, updatePokeBox, removeFromPokeTeam }) {
    const [colorByType, setColorByType] = useState('#000000')

    const rarityColor = (rarity) => {
        if(rarity === 1) return '#ff666690'
        if(rarity === 2) return '#4682B4'
        if(rarity === 3) return '#d4af37'
        return '#FFFFFF50'
    }

    useEffect(() => {
        let color = typeColor(poke.types)

        setColorByType(color)
    }, [poke])

    return (
        <Flex
            alignItems="center" 
            flexDirection="column"
            border={`6px ridge ${rarityColor(poke.rarity.rarity)}`}
            borderRadius={8}
            my={1}
            p={1}
            backgroundColor={ `${colorByType}90` }
            background={ poke.shiny ? `linear-gradient(165deg, ${colorByType}15 15%, ${colorByType} 50%, ${colorByType}15 85%)` : ''}
            shadow="dark-lg"
            _hover={{
                backgroundColor: `${colorByType}70`
            }}
        >
            <Flex justifyContent="space-between" flexDirection="column">
                <Flex width="100%">
                    <Flex width="100%" textAlign="center" flexDirection={"column"}>
                        <Text fontWeight="bold" letterSpacing={2}>{stringToUpperCase(poke.name)}</Text>
                        {/* <Text fontSize={"sm"}>({poke.nature})</Text> */}
                    </Flex>
                    <CloseButton 
                        onClick={() => {
                            updatePokeBox(poke)
                            removeFromPokeTeam(poke, pokeTeam)
                        }}
                        size="sm" 
                    />
                </Flex>
                <Flex justifyContent="space-between">
                    <Flex>
                        <Image
                            w={52}
                            title={stringToUpperCase(poke.name)} 
                            src={poke.sprites.front}
                        />
                    </Flex>
                    <Flex justifyContent="end" px={1/2} pt={1/2} width="20%">
                        <Types
                            types={poke.types} 
                            shiny={poke.shiny}
                            tier={poke.tier}
                            nature={poke.nature}
                            color={`${colorByType}`}
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
                />
            </Flex>
        </Flex>
    )    
}

export default Team