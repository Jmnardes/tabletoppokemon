import { Button, Flex, Image } from "@chakra-ui/react";
import pikachuIcon from '../../../assets/images/pokemons/pikachu.png'

export default function RollController({
    pokemonArrayLength,
    handlePokemonRoll,
    children
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

            {children}
        </Flex>
    )
}