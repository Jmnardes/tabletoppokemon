import { Button, Center, Image, Text, useColorMode, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { diceRoll, stringToUpperCase } from "../../../util";
import { sortPokemon } from "../../sortPokemon";
import { shinyRoll, whatNaturePokemonIs } from "../../pokemonFunctions";
import pokemonJSON from '../../../assets/json/pokemons.json'
import { motion } from 'framer-motion'

import PokeModal from "../Modal/Modal";
import eggIcon from '../../../assets/images/items/egg.png'
import eggHatchedIcon from '../../../assets/images/items/egg-hatching.png'
import incubatorBasicIcon from '../../../assets/images/items/incubator-basic.png'
import incubatorGreatIcon from '../../../assets/images/items/incubator-great.png'

export default function PokemonEgg({ 
    pokemonEgg, 
    setPokemonEgg, 
    turn,
    handleAddInventory, 
    tier, 
    generation, 
    shinyPercentage, 
    handleToast,
    greatIncubator,
    setGreatIncubator

}) {
    const { colorMode } = useColorMode()
    const [hatchingTurn, setHatchingTurn] = useState(0)
    const [eggAnimationSpeed, setEggAnimationSpeed] = useState(2)
    const [eggHatched, setEggHatched] = useState(false)
    const [disableButtonAdd, setDisableButtonAdd] = useState(true)
    const [closePokemonEgg, setClosePokemonEgg] = useState(false)
    const [pokemon, setPokemon] = useState([])

    const animationKeyframes = keyframes`
        0% { transform: scale(0.96) rotate(0); }
        10% { transform: scale(0.98) rotate(12deg); }
        20% { transform: scale(1) rotate(-12deg); }
        20% { transform: scale(0.98) rotate(0); }
        50% { transform: scale(0.96) rotate(7deg); }
        70% { transform: scale(0.94) rotate(-7deg); }
        100% { transform: scale(0.94) rotate(0); }
    `;

    const shakeAnimationKeyframes = keyframes`
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    `;

    const eggMovingAnimation = `${animationKeyframes} ${eggAnimationSpeed}s ease-in-out infinite`;
    const eggShakingAnimation = `${shakeAnimationKeyframes} 1.5s ease-in-out infinite`;

    function handlePokemon() {
        let poke = sortPokemon(tier + 1, generation)
        let sh = shinyRoll(shinyPercentage + 5)
        let nat = whatNaturePokemonIs()

        setPokemon({
            pokemon: poke,
            nature: nat,
            shiny: sh
        })

        setDisableButtonAdd(false)
    }

    function handleAddToInventory() {
        handleAddInventory({
            pokemonId: pokemon.pokemon,
            nature: pokemon.nature,
            shiny: pokemon.shiny
        }, false)
    }

    useEffect(() => {
        hatchingTurn > 0 && setHatchingTurn(hatchingTurn - 1)

        if(hatchingTurn === 2) {
            handleToast(
                'hatchegg', 
                'Oh?', 
                '...',
                <Image src={eggHatchedIcon} w="32px"></Image>
            )
        }

        if(hatchingTurn === 1) {
            handleToast(
                'egg', 
                'Pokemon Egg', 
                'Your pokemon egg has hatched, go see what you got!',
                <Image src={eggIcon} w="32px"></Image>
            )
            setEggHatched(true)
            handlePokemon()
        }

        if(pokemon.length > 0) {
            setPokemon([])
            setEggHatched(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn])

    return (
        <PokeModal title={'Pokemon Egg'} button={
            <Image
                src={eggIcon}
                title={'Pokemon Egg'}
                w="24px"
            ></Image>
        } disableButton={pokemonEgg === 0 && hatchingTurn === 0 && !eggHatched} modalClose={closePokemonEgg} setCloseModal={setClosePokemonEgg}>
            <Center flexDirection="column">
                <Center>
                    <Center flexDirection="column" mx={6}>
                        <Text mb={2}>Basic incubator</Text>
                        <Button 
                            w="100%" 
                            h={16} 
                            p={0} 
                            background="transparent" 
                            _hover={{}}
                            disabled={pokemonEgg === 0 || hatchingTurn !== 0 || eggHatched} 
                            onClick={() => {
                                setPokemonEgg(pokemonEgg - 1)
                                setHatchingTurn(diceRoll(4) + 4)
                            }}
                        >
                            <Image
                                src={incubatorBasicIcon}
                                title={'16 to 20 steps to hatch it'}
                                w="48px"
                                _hover={{ width: '58px' }}
                            ></Image>
                        </Button>
                    </Center>

                    <Center flexDirection="column" mx={6}>
                        <Text mb={2}>Great incubator</Text>
                        <Button 
                            w="100%" 
                            h={16} 
                            p={0} 
                            background="transparent" 
                            _hover={{}}
                            disabled={pokemonEgg === 0 || greatIncubator === 0 || hatchingTurn !== 0 || eggHatched} onClick={() => {
                                setGreatIncubator(greatIncubator - 1)
                                setPokemonEgg(pokemonEgg - 1)
                                setHatchingTurn(diceRoll(2) + 2)
                            }}
                        >
                            <Image
                                src={incubatorGreatIcon}
                                title={'4 to 8 steps to hatch it'}
                                w="48px"
                                _hover={{ width: '58px' }}
                            ></Image>
                        </Button>
                    </Center>
                </Center>

                <Text mt={6} textAlign="center">
                    {hatchingTurn !== 0 && (
                        hatchingTurn === 1 ? `${hatchingTurn} turn left to hatch the Egg...` : `${hatchingTurn} turns left to hatch the Egg...`
                    )}
                </Text>

                <Center mt={6} w={96} h={64} flexDirection="column" borderRadius={8} background={colorMode === 'light' ? "gray.200" : "RGBA(255, 255, 255, 0.08)"}>
                    {eggHatched ? 
                        <>
                            <Text fontWeight="bold">{stringToUpperCase(pokemonJSON[pokemon?.pokemon].name)}</Text>
                            <Image 
                                w={44}
                                borderRadius="50%"
                                src={pokemonJSON[pokemon?.pokemon].sprite[`${pokemon?.shiny.shiny ? 'shiny' : 'default'}`]}
                            />
                            <Button disabled={disableButtonAdd} onClick={() => {
                                handleAddToInventory()
                                setPokemon([])
                                setEggHatched(false)
                                setClosePokemonEgg(true)
                                setHatchingTurn(0)
                                setDisableButtonAdd(true)
                            }}>Add to team</Button>
                        </>
                    :
                        hatchingTurn === 1 ?
                            <Center
                                as={motion.div}
                                animation={eggShakingAnimation}
                            >
                                <Image
                                    src={eggHatchedIcon}
                                    height='112px'
                                    width='112px'
                                    cursor="pointer"
                                    _hover={{ width: '116px', height: '116px' }}
                                ></Image>
                            </Center>
                        :
                            <Center
                                as={motion.div}
                                animation={eggMovingAnimation}
                                onClick={() => setEggAnimationSpeed(`${diceRoll(2) + 1}.${diceRoll(10)}`)}
                            >
                                <Image
                                    src={eggIcon}
                                    height='98px'
                                    width='98px'
                                    cursor="pointer"
                                    _hover={{ width: '102px', height: '102px' }}
                                ></Image>
                            </Center>
                    }
                </Center>

            </Center>
        </PokeModal>
    )
}