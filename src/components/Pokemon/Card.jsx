import { useEffect, useState } from "react"
import { Flex, Image, Text, Center, useColorMode, Divider } from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from '@utils'

import PokeStats from "./PokeStats"
import Types from "../Elements/Types"
import CardTitle from "./CardTitle"

import { PokeRarity } from "./PokemonRarity"
import AppliedItems from "./AppliedItems"

function Card({ poke, pokeTeam, updatePokeBox, removeFromPokeTeam, tooltip, bag, isCaptured }) {
    const [colorByType, setColorByType] = useState('#000000')
    const { colorMode } = useColorMode()

    const handleBackgroundColor = (poke) => {
        if (poke.shiny) {
            return `linear-gradient(145deg, ${colorByType} 35%, #d1d1d1 50%, ${colorByType} 65%)`
        }

        if (!bag) {
            return colorMode === 'light' ? 'whiteAlpha.900' : 'gray.600'
        }
    }

    useEffect(() => {
        let color = typeColor(poke.types)
        setColorByType(color)
    }, [poke])

    return (
        <Flex
            alignItems="center" 
            flexDirection="column"
            border={`2px solid ${colorByType}`}
            borderRadius={8}
            p={2}
            backgroundColor={tooltip && colorByType}
            background={handleBackgroundColor(poke)}
            shadow="dark-lg"
            _hover={bag && {
                backgroundColor: `${colorByType}70`,
                cursor: 'pointer'
            }}
            onClick={() => {
                if(!bag) return
                updatePokeBox(poke)
                removeFromPokeTeam(poke, pokeTeam)
            }}
        >
            <Flex flexDirection="column" position="relative">
                <Flex
                    h={8}
                    w={8}
                    top="-15px"
                    left="-15px"
                    position="absolute"
                    borderRadius="50%"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    backgroundColor={colorByType}
                >
                    {poke.level}
                </Flex>
                
                <CardTitle poke={poke} />

                <Divider mt={2} />

                <Center pt={2} minH={6}>
                    <PokeRarity rarity={poke.rarity.rarity} />
                </Center>

                <Center>
                    <Image
                        w={isCaptured ? 24 : 52}
                        my={4}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.main}
                    />
                    <PokeStats poke={poke} isCaptured={isCaptured} />
                </Center>

                {!isCaptured && (
                    <>
                        <Divider />

                        <AppliedItems poke={poke} />
                    </>
                )}

                {tooltip && (
                    <Center justifyContent="space-between">
                        <Text my={2} fontWeight="bold">
                            {stringToUpperCase(poke.nature)}
                        </Text>
                        <Types types={poke.types} w={6} h={6} />
                    </Center>
                )}
            </Flex>
        </Flex>
    )    
}

export default Card