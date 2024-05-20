import { Button, Center, Flex, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import ControlBox from "./ControlBox";
import BattleScreen from "./BattleScreen";
import { FaDoorOpen } from "react-icons/fa";
import { useEffect } from "react";
import socket from "../../../client";

export default function BattleContent({
    battleId,
    myPokemonHp,
    isMyTurn,
    opponents,
    isPokemonBattling
}) {
    const { pokeTeam, updateGame } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [pokemon, setPokemon] = useState()
    const [displayText, setDisaplayText] = useState('')
    const [hitAnimation, setHitAnimation] = useState('')

    const battleEnd = () => {
        updateGame({ openBattleModal: false, openEncounterModal: true })
    }

    useEffect(() => {
        socket.on('battle-end', battleEnd)

        return () => {
            socket.off('battle-end', battleEnd)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex flex="1">
            <Center flexDir="column" flex="1">
                <Center w="100%" flex="1" p={4}>
                    <BattleScreen 
                        pokemon={pokemon} 
                        hitAnimation={hitAnimation} 
                        setHitAnimation={setHitAnimation}
                        myPokemonHp={myPokemonHp}
                        opponents={opponents}
                    />
                </Center>
                <Center h={60} w="100%" background={colorMode === 'light' ? "gray.300" : "gray.600"} borderRadius={16}>
                    <ControlBox
                        battleId={battleId}
                        isMyTurn={isMyTurn}
                        team={pokeTeam}
                        pokemon={pokemon}
                        setPokemon={setPokemon}
                        displayText={displayText}
                        setDisaplayText={setDisaplayText}
                        setHitAnimation={setHitAnimation}
                        isPokemonBattling={isPokemonBattling}
                    />
                    <Button h="100%" title="Leave" onClick={() => {
                        updateGame({ openBattleModal: false })
                        
                    }}>
                        <FaDoorOpen size="24px"/>
                    </Button>
                </Center>
            </Center>
        </Flex>
    )
}