import { Button, Flex, Image, Text } from "@chakra-ui/react";
import stepsIcon from '../../../assets/images/game/steps.png'
import pokeballIcon from '../../../assets/images/game/pokeball.png'

export default function RollController({
        pokemonArrayLength,
        handlePokemonRoll,
        disableDiceRoll,
        handleCatchDiceRoll,
        catchDiceRoll,
        resultDiceRoll,
        endTurnButton,
        handlePokemonRollClean
    }) {
    return (
        <Flex justifyContent="center">
            <Button
                mx={2}
                title="Roll"
                isDisabled={pokemonArrayLength >= 4}
                onClick={() => handlePokemonRoll()}
            >
                <Image
                    src={stepsIcon} 
                    title={'Find pokemon'}
                    w="34px"
                ></Image>
            </Button>
            <Button 
                mx={2}
                title="Rolld20"
                disabled={disableDiceRoll}
                onClick={() => handleCatchDiceRoll()}
            >
                <Image
                    src={pokeballIcon} 
                    title={'Catch roll!'}
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                    w="28px"
                ></Image>
            </Button>
            <Text
                background={
                    catchDiceRoll === 20 && "#2EC92E"
                }
                fontSize='2xl'
                ml={2}
                w={12}
                borderRadius={4}
                textAlign="center"
            >{resultDiceRoll}</Text>
            <Button 
                mx={4}
                w={40}
                title="Clean"
                disabled={endTurnButton}
                onClick={() => handlePokemonRollClean()}
                >
                    End Turn!
            </Button>
        </Flex>
    )
}