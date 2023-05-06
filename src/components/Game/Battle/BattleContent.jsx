import { Center, Flex, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import ControlBox from "./ControlBox";
import Screen from "./Screen";

export default function BattleContent({
    battleId,
    myPokemonHp,
    pokemonOther,
    isMyTurn,
}) {
    const { pokeTeam } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [pokemon, setPokemon] = useState()
    const [isPokemonBattling, setIsPokemonBattling] = useState(false)
    const [displayText, setDisaplayText] = useState('')
    const [hitAnimation, setHitAnimation] = useState('')

    return (
        <Flex flex="1">
            <Center flexDir="column" flex="1">
                <Center w="100%" flex="1" p={4}>
                    <Screen 
                        pokemon={pokemon} 
                        hitAnimation={hitAnimation} 
                        setHitAnimation={setHitAnimation}
                        pokemonOther={pokemonOther}
                        myPokemonHp={myPokemonHp}
                    />
                </Center>
                <Center h={60} w="100%" background={colorMode === 'light' ? "gray.300" : "gray.600"} borderRadius={16}>
                    <ControlBox
                        battleId={battleId}
                        isMyTurn={isMyTurn}
                        team={pokeTeam}
                        pokemon={pokemon}
                        setPokemon={setPokemon}
                        isPokemonBattling={isPokemonBattling}
                        setIsPokemonBattling={setIsPokemonBattling}
                        displayText={displayText}
                        setDisaplayText={setDisaplayText}
                        setHitAnimation={setHitAnimation}
                    />
                </Center>
            </Center>
        </Flex>
    )
}