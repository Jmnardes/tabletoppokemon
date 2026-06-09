import { useContext, useEffect, useState } from "react"
import { Flex, Image, Text, Center, Kbd, useColorMode } from "@chakra-ui/react"
import { stringToUpperCase, typeColor } from '@utils'
import PlayerContext from "@context/PlayerContext"

import PokeStats from "./PokeStats"
import Types from "@features/elements/Types"
import CardTitle from "./CardTitle"

import { PokeRarity } from "./PokemonRarity"
import AppliedItems from "./AppliedItems"
import ChanceToLevelUp from "./ChanceToLevelUp"
import { Star, ArrowBigUp, ArrowBigDown } from 'lucide-react'

function Card({ poke, tooltip, bag, isCaptured, challenge, size }) {
    const { moveToBox } = useContext(PlayerContext)
    const [colorByType, setColorByType] = useState('#000000')
    const { colorMode } = useColorMode()

    const effectiveSize = size || (isCaptured || challenge ? 'M' : (tooltip ? 'S' : 'L'))
    const isCompact = effectiveSize === 'M' || effectiveSize === 'S'

    const spriteW = { L: 36, M: 28, S: 20 }[effectiveSize]
    const showExtras = effectiveSize === 'L'

    const handleBackgroundColor = (poke) => {
        if (poke.shiny) {
            return `linear-gradient(145deg, ${colorByType} 35%, #d1d1d1 50%, ${colorByType} 65%)`
        }
        return colorMode === 'light' ? 'whiteAlpha.900' : 'gray.600'
    }

    useEffect(() => {
        let color = typeColor(poke.types)
        setColorByType(color)
    }, [poke])

    const cardBaseProps = {
        alignItems: "center",
        flexDirection: "column",
        border: `2px solid ${colorByType}`,
        borderRadius: 8,
        pt: 1,
        pb: 0,
        px: 0,
        backgroundColor: tooltip && colorByType,
        background: handleBackgroundColor(poke),
        shadow: "dark-lg",
    }

    const renderCardContent = () => (
        <Flex flexDirection="column" position="relative" px={2} w="100%">
            {/* Top row: Level + Name */}
            <Flex alignItems="center" justifyContent="space-between" w="100%" mt={1}>
                <Flex
                    h={6}
                    w={6}
                    borderRadius={4}
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="bold"
                    fontSize="xs"
                    backgroundColor={colorByType}
                >
                    {poke.level}
                </Flex>
                <CardTitle poke={poke} />
                <Flex w={6} />
            </Flex>

            {/* Sprite + Info */}
            <Flex alignItems="center" my={1} gap={2} w="100%">
                <Center flex={1}>
                    <Image
                        w={spriteW}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.main}
                        fallbackSrc={poke.sprites?.front}
                        sx={{ imageRendering: 'pixelated' }}
                    />
                </Center>
                {showExtras && (
                    <Flex flex={1} flexDir="column" gap={1} alignItems="center" justifyContent="center">
                        <PokeRarity rarity={poke.rarity.rarity} />
                        <Kbd px={2} py={0.5} fontSize="xs" fontWeight="bold">
                            {stringToUpperCase(poke.nature)}
                        </Kbd>
                        <Types types={poke.types} w={5} h={5} />
                    </Flex>
                )}
            </Flex>

            {/* Stats */}
            {showExtras && <PokeStats poke={poke} />}
            {isCompact && <PokeStats poke={poke} isMini />}

            {showExtras && (
                <>
                    <AppliedItems poke={poke} />

                    <ChanceToLevelUp selectedPokemon={poke} />

                    {/* Legend */}
                    <Center gap={3} mt={1} mb={2} opacity={0.6}>
                        <Center gap={1}>
                            <Star size={10} fill="#facc15" color="#facc15" />
                            <Text fontSize="7px">rank</Text>
                        </Center>
                        <Center gap={1}>
                            <ArrowBigUp size={10} fill="#22c55e" color="#22c55e" />
                            <Text fontSize="7px">/</Text>
                            <ArrowBigDown size={10} fill="#ef4444" color="#ef4444" />
                            <Text fontSize="7px">natureza</Text>
                        </Center>
                    </Center>
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
    )

    return (
        <Flex
            {...cardBaseProps}
            _hover={bag && {
                backgroundColor: `${colorByType}70`,
                cursor: 'pointer'
            }}
            onClick={() => {
                if(!bag) return
                moveToBox(poke.id)
            }}
        >
            {renderCardContent()}
        </Flex>
    )    
}

export default Card