import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import ChallengeInfo from "./ChallengeInfo";
import ChallengePokemonChoice from "./ChallengePokemonChoice";

export default function ChallengeTeam({ event, bonus, setBonus, setTeamReady }) {
    const { teamIds, boxIds, pokemonData, player, session, emit } = useContext(PlayerContext)
    const [ready, setReady] = useState(false)
    const [selectedPokemonIds, setSelectedPokemonIds] = useState([])

    const allAvailableIds = [...teamIds, ...boxIds]
    const availablePokemons = allAvailableIds.map(id => pokemonData[id]).filter(Boolean)

    useEffect(() => {
        socket.on('event-challenge-start', res => {
            if (res.start === true) {
                if (res.bonus !== undefined) {
                    setBonus(res.bonus)
                }
                setTeamReady(true)
            }
        })

        socket.on('event-challenge-bonus-preview', res => {
            if (res.bonus !== undefined) {
                setBonus(res.bonus)
            }
        })

        return () => {
            socket.off('event-challenge-start')
            socket.off('event-challenge-bonus-preview')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (selectedPokemonIds.length > 0 && player?.id && session?.sessionCode) {
            emit('event-challenge-check-bonus', { pokemonIds: selectedPokemonIds }).catch(() => {})
        } else if (selectedPokemonIds.length === 0) {
            setBonus(0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemonIds])

    const handleTogglePokemon = (pokemonId) => {
        setSelectedPokemonIds(prev => {
            if (prev.includes(pokemonId)) {
                return prev.filter(id => id !== pokemonId)
            } else if (prev.length < 3) {
                return [...prev, pokemonId]
            }
            return prev
        })
    }

    const handleReady = async () => {
        if (!player?.id || !session?.sessionCode || selectedPokemonIds.length !== 3) {
            return
        }

        setReady(true)
        try {
            await emit('event-challenge-ready', { pokemonIds: selectedPokemonIds })
        } catch (error) {
            setReady(false)
        }
    }

    return (
        <Center flex flexDir={"column"} justifyContent={"space-between"} h="100%">
            <ChallengeInfo event={event} bonus={bonus} />

            <Center flex flexDir={"column"} w="100%">
                {!ready && (
                    <ChallengePokemonChoice 
                        availablePokemons={availablePokemons}
                        selectedIds={selectedPokemonIds}
                        onToggle={handleTogglePokemon}
                        maxSelection={3}
                    />
                )}
                {ready && (
                    <Text fontSize="lg" color="green.400">
                        Waiting for other players...
                    </Text>
                )}
            </Center>

            <Button 
                h={24} 
                w={"100%"} 
                mb={2} 
                isDisabled={selectedPokemonIds.length !== 3 || ready} 
                onClick={handleReady}
            >
                {ready ? 'Waiting for players...' : 'Ready'}
            </Button>
        </Center>
    )
}