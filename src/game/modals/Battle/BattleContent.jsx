import { Box, Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import PlayerContext from "@context/PlayerContext";
import socket from "@client";

import BattleTeamSelect from "./Menu/BattleTeamSelect";
import BattlePlayback from "./Screen/BattlePlayback";
import BattleResultPanel from "./Menu/BattleResultPanel";
import OpponentPokes from "./Screen/OpponentPokes";

export default function BattleContent({
    battleId,
    opponentTrainer,
    battlePhase,
    setBattlePhase,
    battleResult,
    event,
    onBattleComplete
}) {
    const { t } = useTranslation()
    const { teamIds, pokemonData, updateGame, emit, player, handleToast } = useContext(PlayerContext)

    const teamPokemons = teamIds.map(id => pokemonData[id]).filter(Boolean)
    const [selectedTeamIds, setSelectedTeamIds] = useState([])
    const [defeatedIds, setDefeatedIds] = useState([])

    const handleTeamSelect = (pokemonIds) => {
        setSelectedTeamIds(pokemonIds)
        emit('battle-select-team', { battleId, pokemonIds }).catch(() => {
            setBattlePhase('select')
            handleToast({
                id: 'battle-select-error',
                title: t('common.error'),
                description: t('toast.connectionError'),
                status: 'error',
                position: 'top',
            })
        })
        setBattlePhase('waiting')
    }

    const handleBattleEnd = () => {
        setBattlePhase('result')
    }

    const handlePokemonDefeated = (loserId) => {
        setDefeatedIds(prev => [...prev, loserId])
    }

    useEffect(() => {
        socket.on('battle-end', () => {
            if (onBattleComplete) {
                onBattleComplete()
            } else {
                updateGame({ openBattleModal: false })
            }
        })

        return () => {
            socket.off('battle-end')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex flex="1" h={"100%"} overflow="hidden">
            <Center flexDir="column" flex="1" h="100%">
                {(battlePhase === 'battle' || battlePhase === 'result') && battleResult ? (
                    <Flex align="center" justify="center" gap={4} py={2}>
                        <Flex gap={1}>
                            {selectedTeamIds.map(id => pokemonData[id]).filter(Boolean).map(poke => (
                                <Box key={poke.id} position="relative" w={16} h={16} borderRadius={8}
                                    border="2px solid" borderColor="blue.400" overflow="hidden">
                                    <Image src={poke.sprites?.front} h="100%" mx="auto" />
                                    {defeatedIds.includes(poke.id) && (
                                        <Center position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.700" borderRadius={6}>
                                            <Text fontSize="2xl" color="red.500" fontWeight="bold">✕</Text>
                                        </Center>
                                    )}
                                </Box>
                            ))}
                        </Flex>
                        <Text fontStyle="italic" color="red.400" fontSize="lg">VS</Text>
                        <Flex gap={1}>
                            {(battleResult.opponentTeam || []).map(poke => (
                                <Box key={poke.id} position="relative" w={16} h={16} borderRadius={8}
                                    border="2px solid" borderColor="red.400" overflow="hidden">
                                    <Image src={poke.sprite} h="100%" mx="auto" />
                                    {defeatedIds.includes(poke.id) && (
                                        <Center position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.700" borderRadius={6}>
                                            <Text fontSize="2xl" color="red.500" fontWeight="bold">✕</Text>
                                        </Center>
                                    )}
                                </Box>
                            ))}
                        </Flex>
                    </Flex>
                ) : (
                    <OpponentPokes opponent={opponentTrainer} prizes={event.prizes} />
                )}

                <Center w="100%" flex="1" p={4} overflow="hidden" minH={0}>
                    {battlePhase === 'select' && (
                        <BattleTeamSelect
                            team={teamPokemons}
                            onConfirm={handleTeamSelect}
                        />
                    )}

                    {battlePhase === 'waiting' && (
                        <Center flexDir="column" gap={4}>
                            <Spinner size='xl' />
                            <Text fontSize="2xl">{t('battle.waitingOpponent')}</Text>
                        </Center>
                    )}

                    {battlePhase === 'battle' && battleResult && !battleResult.wo && (
                        <BattlePlayback
                            battleResult={battleResult}
                            myPlayerId={player.id}
                            myTrainerName={player.status?.trainerName || 'You'}
                            opponentTrainerName={opponentTrainer?.name || 'Opponent'}
                            onBattleEnd={handleBattleEnd}
                            onPokemonDefeated={handlePokemonDefeated}
                        />
                    )}

                    {((battlePhase === 'result' && battleResult) || (battlePhase === 'battle' && battleResult?.wo)) && (
                        <BattleResultPanel
                            battleResult={battleResult}
                            myPlayerId={player.id}
                        />
                    )}
                </Center>
            </Center>
        </Flex>
    )
}