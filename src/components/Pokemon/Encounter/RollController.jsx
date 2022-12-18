import { Button, Flex, Text } from "@chakra-ui/react";
import { FaDiceD20 } from "react-icons/fa";
import { GiHighGrass } from "react-icons/gi";

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
                <GiHighGrass size="24px"/>
            </Button>
            <Button 
                mx={2}
                title="Rolld20"
                disabled={disableDiceRoll}
                onClick={() => handleCatchDiceRoll()}
            >
                <FaDiceD20 size="18px"/>
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