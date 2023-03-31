import { Button, Flex, Image, Text } from "@chakra-ui/react";
import pokeballIcon from '../../../assets/images/game/pokeball.png'
import arrowIcon from '../../../assets/images/game/arrow.png'
import pikachuIcon from '../../../assets/images/pokemons/pikachu.png'

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
                mx={4}
                title="Roll"
                isDisabled={pokemonArrayLength >= 4}
                onClick={() => handlePokemonRoll()}
            >
                <Image
                    src={pikachuIcon} 
                    title={'Find a pokemon'}
                    w="34px"
                ></Image>
            </Button>
            <Button 
                mx={4}
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
                mx={4}
                w={12}
                borderRadius={4}
                textAlign="center"
            >{resultDiceRoll}</Text>
            <Button 
                mx={4}
                title="Clean"
                disabled={endTurnButton}
                onClick={() => handlePokemonRollClean()}
                >
                    <Image
                        src={arrowIcon} 
                        title={'End turn!'}
                        w="34px"
                        style={{ transform: 'rotate(90deg)' }}
                    ></Image>
            </Button>
        </Flex>
    )
}