import { useEffect, useState } from "react"
import PokeStats from "../Card/PokeStats"
import { stringToUpperCase, typeColor } from '../../../util'
import { Flex, Image, Text, Center, Kbd } from "@chakra-ui/react"
import Types from "../Card/Types"
import { FaStar } from "react-icons/fa"

function Team({ poke, pokeTeam, updatePokeBox, removeFromPokeTeam, tooltip, bag }) {
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
                backgroundColor: `${colorByType}70`,
                cursor: 'pointer'
            }}
            onClick={() => {
                if(!bag) return
                updatePokeBox(poke)
                removeFromPokeTeam(poke, pokeTeam)
            }}
        >
            <Flex flexDirection="column">
                <Center flexDirection={"column"}>
                    <Center>
                        {poke.shiny && <FaStar title="Shiny" size={8}/>}
                        <Text fontSize={"2xl"} fontWeight="bold" ml={1.5} letterSpacing={2}>
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
                </Center>
                <Center>
                    <Image
                        w={48}
                        my={4}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.main}
                    />
                </Center>

                <PokeStats poke={poke} />
            </Flex>
        </Flex>
    )    
}

export default Team