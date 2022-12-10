import { useEffect, useState } from "react"
import pokemon from '../../assets/json/pokemons.json'
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react"
import { catchDifficulty, pokemonBaseStat } from '../pokemonFunctions'
import { stringToUpperCase, typeColor } from '../../util'
import PokemonTable from "./Table/PokemonTable"
import Types from "./Table/Types"

function ShowPokemon({ pokemonId, nature, shiny, diceRollResult, handleAddInventory }) {
    const [colorByType, setColorByType] = useState('#000000')
    const [rollDifficulty, setRollDifficulty] = useState(0)
    const [disableCard, setDisableCard] = useState(true)

    const handleDifficulty = (tier, isShiny) => {
        setRollDifficulty(() => catchDifficulty(isShiny ? tier + 1 : tier))
    }

    const handleCard = () => {
        if (diceRollResult >= rollDifficulty) {
            setDisableCard(false)
        } else {
            setDisableCard(true)
        }
    }

    useEffect(() => {
        let color = typeColor(pokemon[pokemonId].type)

        setColorByType(color)
        handleDifficulty(pokemon[pokemonId].tier, shiny.shiny)
        handleCard()
    }, [pokemonId, diceRollResult, rollDifficulty])

    return (
        <>
            <Button
                w={48} 
                h={48} 
                background="transparent" 
                _hover="disabled"
                disabled={disableCard}
                onClick={handleAddInventory}
            >
                <Flex
                    alignItems="center" 
                    flexDirection="column" 
                    border={ shiny.shiny ? `3px ridge ${colorByType}80` : `3px solid ${colorByType}50`}
                    borderRadius={6}
                    width={44}
                    height={40}
                    m={1}
                    p={1}
                    backgroundColor='#FFFFFF30'
                    background={ shiny.shiny ? `linear-gradient(165deg, ${colorByType}05 15%, ${colorByType} 50%, ${colorByType}05 85%)` : ''}
                    _hover={disableCard ? '' : {
                        backgroundColor: `${colorByType}40`,
                        border: `${shiny.shiny ? '4px outset' : '4px outset'} ${colorByType}`,
                        cursor: "pointer"
                    }}
                >
                    <Box textAlign="center" display="flex" alignItems="center">
                        <Text mb={1} fontWeight="bold">{stringToUpperCase(pokemon[pokemonId].name)}</Text>
                    </Box>
                    <Flex width="100%" justifyContent="space-between">
                        <Image 
                            w={28}
                            title={stringToUpperCase(pokemon[pokemonId].name)}
                            backgroundColor={`${colorByType}90`}
                            borderRadius="50%"
                            src={pokemon[pokemonId].sprite[`${shiny.shiny ? 'shiny' : 'default'}`]}
                        />
                        <Flex justifyContent="end" px={2} pt={1}>
                            <Types 
                                types={pokemon[pokemonId].type} 
                                shiny={shiny.shiny}
                                tier={pokemon[pokemonId].tier} 
                                color={colorByType}
                                nature={''}
                            />
                        </Flex>
                    </Flex>

                    <PokemonTable
                        health={pokemonBaseStat(pokemon[pokemonId].stats, 'hp', nature, shiny)}
                        attack={pokemonBaseStat(pokemon[pokemonId].stats, 'atk', nature, shiny)}
                        defense={pokemonBaseStat(pokemon[pokemonId].stats, 'def', nature, shiny)}
                        speed={pokemonBaseStat(pokemon[pokemonId].stats, 'spd', nature, shiny)}
                        tier={pokemon[pokemonId].tier}
                        type={pokemon[pokemonId].type}
                        nature={nature}
                        name={pokemon[pokemonId].name}
                        shiny={shiny.shiny}
                        showingType={'roll'}
                    />
                    <Text position="absolute" bottom="20px">Difficulty: {rollDifficulty}</Text>
                </Flex>
            </Button>
        </>
    )    
}

export default ShowPokemon