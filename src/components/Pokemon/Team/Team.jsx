import { useEffect, useState } from "react"
import PokemonTable from "../Table/PokemonTable"
import { stringToUpperCase, typeColor } from '../../../util'
import { Flex, Image, Text, CloseButton, Center, Kbd } from "@chakra-ui/react"
import Types from "../Table/Types"
import { FaStar } from "react-icons/fa"

function Team({ poke, pokeTeam, updatePokeBox, removeFromPokeTeam, tooltip }) {
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
            border={`8px ridge ${rarityColor(poke.rarity.rarity)}`}
            borderRadius={8}
            my={1}
            p={1}
            backgroundColor={tooltip ? colorByType : `${colorByType}99`}
            background={ poke.shiny ? `linear-gradient(165deg, ${colorByType}15 15%, ${colorByType} 50%, ${colorByType}15 85%)` : ''}
            shadow="dark-lg"
            _hover={{
                backgroundColor: `${colorByType}70`
            }}
        >
            <Flex flexDirection="column">
                <Flex justifyContent={tooltip ? "center" : "space-between"}>
                    {!tooltip && (
                        <Flex w={6} />
                    )}
                    <Flex textAlign="center" flexDirection={"column"}>
                        <Center>
                            {poke.shiny && <FaStar title="Shiny" size={8}/>}
                            <Text fontWeight="bold" ml={1.5} letterSpacing={2}>
                                {stringToUpperCase(poke.name)}
                            </Text>
                        </Center>
                        <Center>
                            <Kbd w="fit-content">
                                <Center flexDir="row">
                                    {poke.tier} - {stringToUpperCase(poke.nature)} - <Types types={poke.types} w={3} h={3}/>
                                </Center>
                            </Kbd>
                        </Center>
                    </Flex>
                    {!tooltip && (
                        <CloseButton 
                            onClick={() => {
                                updatePokeBox(poke)
                                removeFromPokeTeam(poke, pokeTeam)
                            }}
                            size="sm" 
                        />
                    )}
                </Flex>
                <Center>
                    <Image
                        w={52}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.front}
                    />
                </Center>

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