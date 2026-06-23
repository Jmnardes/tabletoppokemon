import { Badge, Button, CircularProgress, Divider, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";
import { FaRegCheckCircle, FaRegTimesCircle, FaRegCopy, FaTimes, FaPlay } from "react-icons/fa";
import PLAYER_COLORS from "@constants/playerColors";

import crownIcon from '@assets/images/game/crown.png'

export default function GameLobby() {
    const {emit, session, opponents, player, version, lobbyLocked, lobbyCountdown} = useContext(PlayerContext)
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation()

    const isAdmin = session.adminId === player.id

    const ConfigurationSlot = ({name1, data1, name2, data2}) => {
        return (
            <Flex fontSize="2xs" justifyContent={"space-between"} w="100%">
                <Flex>
                    <Text mr={2}>{name1}:</Text>
                    <Text>{data1}</Text>
                </Flex>
                <Flex>
                    <Text mr={2}>{name2}:</Text>
                    <Text>{data2}</Text>
                </Flex>
            </Flex>
        )
    }

    const PlayerSlot = ({trainerName, isReady, colorIndex, playerId}) => {
        return (
            <Flex width={"100%"} justifyContent={"space-between"} alignItems="center" m={2}>
                <Flex alignItems="center" gap={2}>
                    <Badge
                        bg={PLAYER_COLORS[colorIndex] || PLAYER_COLORS[0]}
                        color="white"
                        px={2} py={0.5}
                        borderRadius={4}
                        fontSize="xs"
                    >
                        {trainerName}
                    </Badge>
                </Flex>
                <Flex alignItems="center" gap={2}>
                    {isReady ? (
                        <FaRegCheckCircle size={20} color="green" />
                    ) : (
                        <FaRegTimesCircle size={20} color="red" />
                    )}
                    {isAdmin && playerId && (
                        <IconButton
                            icon={<FaTimes />}
                            size="xs"
                            variant="ghost"
                            colorScheme="red"
                            aria-label={t('lobby.kick')}
                            onClick={() => emit('lobby-kick', { targetId: playerId })}
                        />
                    )}
                </Flex>
            </Flex>
        )
    }
    const handleCopyCode = () => {
        navigator.clipboard.writeText(session.sessionCode)
    }

    useEffect(() => {
        setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.ready])

    return (
        <>
            <Flex alignItems="center" mt={4}>
                <Text fontSize="3xl">
                    {session.sessionCode}
                </Text>
                <Flex mb={1} ml={2} 
                    justifyContent="center" 
                    _hover={{ 'cursor': 'pointer', 'opacity': 0.9 }}
                    onClick={handleCopyCode}
                >
                    <FaRegCopy title={t('lobby.copyCode')} size={24} />
                </Flex>
            </Flex>
            <Divider my={4} />
            
            <Flex 
                width="100%" 
                flexDirection="column" 
                alignItems="center" 
                bg="rgba(255, 215, 0, 0.1)" 
                borderRadius="md" 
                p={3} 
                mt={4}
                mb={4}
            >
                <Text fontSize="sm" fontWeight="bold" mb={3}>
                    {t('lobby.gameObjective')}
                </Text>
                <Flex 
                    width="100%"
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center"
                    bg="rgba(255, 215, 0, 0.15)"
                    borderRadius="md"
                    p={3}
                >
                    <Image
                        src={crownIcon} 
                        title={'Badges'}
                        w="28px"
                        mb={1}
                    />
                    <Text fontSize="2xs" textAlign="center">
                        {t('lobby.firstToWin', { count: session.badgesToWin || 8 })}
                    </Text>
                </Flex>
            </Flex>

            <Divider my={4} />

                <ConfigurationSlot 
                    name1={t('lobby.catchDifficulty')}
                    data1={session.gameDifficulty}
                    name2={t('lobby.shinyChance')}
                    data2={session.shinyChance}
                />
                <ConfigurationSlot 
                    name1={t('lobby.teamLength')}
                    data1={6}
                    name2={t('lobby.stagesPerJourney')}
                    data2={session.stagesPerJourney}
                />
                <ConfigurationSlot 
                    name1={t('lobby.journeyTeam')}
                    data1={session.journeyTeamLength}
                    name2={t('lobby.battleFrequency')}
                    data2={session.battleFrequency}
                />
                <ConfigurationSlot 
                    name1={t('lobby.gymStrength')}
                    data1={session.gymStrengthBonus}
                    name2={t('lobby.gymRegion')}
                    data2={t(`config.region_${session.gymRegion || 'totalRandom'}`)}
                />
            <Divider my={4} />
            <Flex width={"100%"} justifyContent={"space-between"} mb={6}>
                <Text fontWeight={"bold"}>{t('common.player')}</Text>
                <Text fontWeight={"bold"}>{t('common.ready')}</Text>
            </Flex>
            <Flex width={"100%"} justifyContent={"space-between"} alignItems="center" m={2}>
                <Badge
                    bg={PLAYER_COLORS[player.colorIndex] || PLAYER_COLORS[0]}
                    color="white"
                    px={2} py={0.5}
                    borderRadius={4}
                    fontSize="xs"
                >
                    {player.status.trainerName}
                </Badge>
                {isLoading ? (
                    <CircularProgress isIndeterminate size={6} />
                ) : (
                    player.ready ? (
                        <FaRegCheckCircle size={20} color="green" />
                    ) : (
                        <FaRegTimesCircle size={20} color="red" />
                    )
                )}
            </Flex>
            {
                opponents?.length > 0 && opponents.map(opponent => {
                    return (
                        <PlayerSlot
                            key={opponent?.id}
                            trainerName={opponent?.status?.trainerName} 
                            isReady={opponent?.ready}
                            colorIndex={opponent?.colorIndex}
                            playerId={opponent?.id}
                        />
                    )
                })
            }
            
            <Divider my={4} />

            <Text fontSize={"2xl"} position={"absolute"} bottom={0} left={0}>@Version {Number(version).toFixed(2)}</Text>

            {lobbyCountdown && (
                <Flex
                    position="absolute"
                    top={0} left={0} right={0} bottom={0}
                    bg="blackAlpha.700"
                    zIndex={10}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                >
                    <Text fontSize="8xl" fontWeight="bold" color="white">
                        {lobbyCountdown}
                    </Text>
                </Flex>
            )}

            <Flex direction="column" width="100%" gap={2} mb={4} mt={2}>
                <Button 
                    isDisabled={isLoading || lobbyLocked} 
                    width="100%" 
                    onClick={() => {
                        setIsLoading(true)
                        emit('lobby-ready', !player.ready)
                    }}
                >
                    {player.ready ? t('common.cancel') : t('common.ready')}
                </Button>

                {isAdmin && (
                    <Button
                        colorScheme="green"
                        width="100%"
                        isDisabled={!session.allReady || lobbyLocked}
                        leftIcon={<FaPlay />}
                        onClick={() => emit('lobby-start-game')}
                    >
                        {t('lobby.startGame')}
                    </Button>
                )}
            </Flex>
        </>
    )
}