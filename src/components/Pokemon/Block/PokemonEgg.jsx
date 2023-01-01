import { Button, Center, Image, Text, useColorMode } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import eggIcon from '../../../assets/images/items/egg.png'
import { useEffect, useState } from "react";
import { diceRoll } from "../../../util";
import { sortPokemon } from "../../sortPokemon";
import { shinyRoll, whatNaturePokemonIs } from "../../pokemonFunctions";
import pokemonJSON from '../../../assets/json/pokemons.json'

export default function PokemonEgg({ pokemonEgg, setPokemonEgg, turn, handleAddInventory, tier, generation, shinyPercentage, handleToast }) {
    const { colorMode } = useColorMode()
    const [hatchingTurn, setHatchingTurn] = useState(0)
    const [eggHatched, setEggHatched] = useState(false)
    const [disableButtonAdd, setDisableButtonAdd] = useState(true)
    const [pokemon, setPokemon] = useState([])

    function handlePokemon() {
        let poke = sortPokemon(tier + 1, generation)
        let sh = shinyRoll(shinyPercentage)
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
        } disableButton={pokemonEgg === 0 && hatchingTurn === 0 && !eggHatched}>
            <Center flexDirection="column">

                <Center>
                    <Text mr={2} fontSize="2xl">Incubate Egg</Text>
                    <Button disabled={pokemonEgg === 0 || hatchingTurn !== 0 || eggHatched} onClick={() => {
                        setPokemonEgg(pokemonEgg - 1)
                        setHatchingTurn(diceRoll(5) + 4)
                    }}>
                        <Image
                            src={eggIcon}
                            title={'Pokemon Egg'}
                            w="32px"
                        ></Image>
                    </Button>
                </Center>

               <Text mt={12} textAlign="center">
               {hatchingTurn !== 0 && hatchingTurn + ' turns left to hatch the Egg...'}
               </Text>

                <Center mt={12} w={96} h={64} flexDirection="column" borderRadius={8} background={colorMode === 'light' ? "gray.200" : "RGBA(255, 255, 255, 0.08)"}>
                    {eggHatched && 
                        <>
                            <Image 
                                w={44}
                                borderRadius="50%"
                                src={pokemonJSON[pokemon?.pokemon].sprite[`${pokemon?.shiny.shiny ? 'shiny' : 'default'}`]}
                            />
                            <Button disabled={disableButtonAdd} onClick={() => {
                                handleAddToInventory()
                                setPokemon([])
                                setEggHatched(false)
                                setHatchingTurn(0)
                                setDisableButtonAdd(true)
                            }}>Add to team</Button>
                        </>
                    }
                </Center>

            </Center>
        </PokeModal>
    )
}