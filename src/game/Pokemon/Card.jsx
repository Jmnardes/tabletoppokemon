import { useEffect, useState } from "react"
import PokeStats from "./PokeStats"
import { stringToUpperCase, typeColor } from '../../util'
import { Flex, Image, Text, Center, useColorMode, Divider } from "@chakra-ui/react"
import Types from "./Types"
import { FaStar } from "react-icons/fa"
import CardTitle from "./CardTitle"

function Card({ poke, pokeTeam, updatePokeBox, removeFromPokeTeam, tooltip, bag }) {
    const [colorByType, setColorByType] = useState('#000000')
    const { colorMode } = useColorMode()

    // const rarityColor = (rarity) => {
    //     if(rarity === 1) return '#f06f6f'
    //     if(rarity === 2) return '#4682B4'
    //     if(rarity === 3) return '#d4af37'
    //     return '#8a8a8a'
    // }

    const PokeRarity = ({ rarity }) => {
        const renderStars = () => {
          const stars = [];
          
          for (let i = 0; i < rarity; i++) {
            stars.push(<FaStar key={i} size={12} />);
          }
      
          return stars;
        };
      
        return renderStars();
    };

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
            mx={2}
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
                        w={52}
                        my={4}
                        title={stringToUpperCase(poke.name)} 
                        src={poke.sprites.main}
                    />
                    <PokeStats poke={poke} />
                </Center>

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