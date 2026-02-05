import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import ChallengeInfo from "./ChallengeInfo";
import ChallengePokemonChoice from "./ChallengePokemonChoice";
import { pokemonHasChallengeBerry } from "@utils";

export default function ChallengeTeam({ event, bonus, setBonus, setTeamReady }) {
    const { teamIds, boxIds, pokemonData, player, session, emit } = useContext(PlayerContext)
    const [ready, setReady] = useState(false)
    const [selectedPokemonIds, setSelectedPokemonIds] = useState([])

    const allAvailableIds = [...teamIds, ...boxIds]
    const availablePokemons = allAvailableIds.map(id => pokemonData[id]).filter(Boolean)
    const selectedPokemons = selectedPokemonIds.map(id => pokemonData[id]).filter(Boolean)

    const checkChallengeBonus = (team) => {
        if (!player?.status) return

        setBonus(() => {
            const augmentBonus = player.status.challengeBonus || 0;
            
            const generalBonuses =
            team?.reduce((acc, poke) => {
                if (event.advantage.type !== "element") return acc;

                const types = poke.types ?? [];
                const challengeBonus = pokemonHasChallengeBerry(poke) ? 1 : 0;

                const perType = types.reduce((sum, element) => {
                const isAdv = event.advantage.value.includes(element);
                const isDis = event.disadvantage?.value?.includes(element);

                const base = isAdv ? 1 : isDis ? -1 : 0;
                return sum + base + challengeBonus;
                }, 0);

                return acc + perType;
            }, 0) ?? 0;

            return generalBonuses + (team?.length ?? 0) + augmentBonus;
        });
    };

    useEffect(() => {
        socket.on('event-challenge-start', res => {
            if (res.start === true) {
                if (res.bonus !== undefined) {
                    setBonus(res.bonus)
                }
                setTeamReady(true)
            }
        })

        return () => {
            socket.off('event-challenge-start')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        checkChallengeBonus(selectedPokemons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemonIds, pokemonData])

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