import { useContext } from "react";
import { Box, Button, Center, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";
import TeamContainer from "./Team/TeamContainer";
import DayCarePanel from "@game/header/Buttons/PokeDayCare/DayCarePanel";
import TrainingCampPanel from "@game/header/Buttons/TrainingCamp/TrainingCampPanel";
import PlayerAugmentsPanel from "@game/header/Buttons/Augments/PlayerAugmentsPanel";
import GymPanel from "@game/modals/Gym/GymPanel";
import FarmPanel from "@features/farm/FarmPanel";
import CraftPanel from "@features/craft/CraftPanel";
import JourneyPreviewPanel from "@features/journey/JourneyPreviewPanel";
import JourneyScreen from "@features/journey/JourneyScreen";
import JourneySelection from "@features/journey/JourneySelection";
import BattleScreen from "@game/modals/EventModals/BattleModal";
import SettingsPanel from "@game/header/Buttons/Settings/SettingsPanel";
import { FaArrowRight, FaCheck } from "react-icons/fa";

import battleIcon from '@assets/images/game/battle.png';
import stepsIcon from '@assets/images/game/steps.png';
import bagIcon from '@assets/images/game/bag.png';

function getNextTurnPhases(turn, battleFrequency = 3) {
    const nextTurn = (turn || 0) + 1
    if (nextTurn <= 1) return ['journey', 'freeActions']
    const phases = []
    if (battleFrequency > 0 && nextTurn % battleFrequency === 0) phases.push('battle')
    phases.push('freeActions')
    phases.push('journey')
    phases.push('freeActions')
    return phases
}

const panels = {
    bag: TeamContainer,
    daycare: DayCarePanel,
    training: TrainingCampPanel,
    augments: PlayerAugmentsPanel,
    gym: GymPanel,
    farm: FarmPanel,
    craft: CraftPanel,
    journey: JourneyPreviewPanel,
    settings: SettingsPanel,
}

const PHASE_ICONS = {
    battle: battleIcon,
    journey: stepsIcon,
    freeActions: bagIcon,
}

const PHASE_LABELS = {
    battle: 'Battle',
    journey: 'Journey',
    freeActions: 'Free',
}

function PhaseNode({ phase, state }) {
    const isPast = state === 'past'
    const isCurrent = state === 'current'
    const icon = PHASE_ICONS[phase] || bagIcon
    const label = PHASE_LABELS[phase] || phase

    return (
        <Flex flexDir="column" alignItems="center" gap={0}>
            <Center
                w="36px"
                h="36px"
                borderRadius="full"
                bg={isCurrent ? 'green.600' : isPast ? 'gray.600' : 'whiteAlpha.200'}
                border="2px solid"
                borderColor={isCurrent ? 'green.300' : isPast ? 'gray.500' : 'whiteAlpha.400'}
                position="relative"
                transform={isCurrent ? 'scale(1.15)' : 'none'}
                transition="all 0.2s ease"
                title={label}
            >
                <Image
                    src={icon}
                    w="20px" h="20px"
                    objectFit="contain"
                    opacity={isPast ? 0.4 : 1}
                    filter={isPast ? 'grayscale(100%)' : 'none'}
                />
                {isPast && (
                    <Center
                        position="absolute"
                        top="-4px" right="-4px"
                        w="14px" h="14px"
                        borderRadius="full"
                        bg="green.500"
                    >
                        <FaCheck size={8} color="white" />
                    </Center>
                )}
            </Center>
            <Text
                fontSize="2xs"
                color={isCurrent ? 'green.300' : isPast ? 'gray.500' : 'whiteAlpha.700'}
                fontWeight={isCurrent ? 'bold' : 'normal'}
                mt="2px"
            >
                {label}
            </Text>
        </Flex>
    )
}

function PhaseConnector({ isPast }) {
    return (
        <Box
            h="2px"
            w="20px"
            bg={isPast ? 'green.500' : 'whiteAlpha.300'}
            transition="background 0.2s ease"
        />
    )
}

function BottomBar() {
    const { advancePhase, teamIds, bagDirty, turnPhases, currentPhaseIndex, session } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const minTeamSize = 3
    const needsFullTeam = teamIds.length < minTeamSize
    const isTurnDisabled = needsFullTeam || bagDirty
    const nextPhase = turnPhases[currentPhaseIndex + 1] || null
    const nextTurnPhases = getNextTurnPhases(session.turns, session.battleFrequency)

    const getButtonLabel = () => {
        if (!nextPhase) return t('action.endTurn')
        if (nextPhase === 'journey') return t('action.startJourney')
        if (nextPhase === 'freeActions') return t('common.continue')
        return t('action.next')
    }

    return (
        <Flex
            w="100%"
            p={2}
            px={4}
            backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
            alignItems="center"
            gap={2}
        >
            {/* Phase Timeline: Current Turn */}
            <Flex alignItems="center" gap={0}>
                {turnPhases.map((phase, i) => {
                    const state = i < currentPhaseIndex ? 'past' : i === currentPhaseIndex ? 'current' : 'future'
                    return (
                        <Flex key={i} alignItems="center">
                            {i > 0 && <PhaseConnector isPast={i <= currentPhaseIndex} />}
                            <PhaseNode phase={phase} state={state} />
                        </Flex>
                    )
                })}
            </Flex>

            {/* Turn Separator */}
            <Flex flexDir="column" alignItems="center" mx={1}>
                <Box h="20px" w="1px" bg="whiteAlpha.300" />
                <Text fontSize="2xs" color="whiteAlpha.400" px={1}>T{(session.turns || 0) + 1}</Text>
                <Box h="20px" w="1px" bg="whiteAlpha.300" />
            </Flex>

            {/* Phase Timeline: Next Turn */}
            <Flex alignItems="center" gap={0} opacity={0.5}>
                {nextTurnPhases.map((phase, i) => (
                    <Flex key={`next-${i}`} alignItems="center">
                        {i > 0 && <PhaseConnector isPast={false} />}
                        <PhaseNode phase={phase} state="future" />
                    </Flex>
                ))}
            </Flex>

            <Box flex="1" />

            {/* Advance Button */}
            <Button
                colorScheme="green"
                onClick={advancePhase}
                isDisabled={isTurnDisabled}
                title={needsFullTeam ? t('action.needPokemon') : bagDirty ? t('action.confirmTeamFirst') : getButtonLabel()}
                h="40px"
                px={6}
                fontSize="sm"
                fontWeight="bold"
                flexShrink={0}
            >
                <Text color="white">{getButtonLabel()}</Text>
                <FaArrowRight size="16px" color="white" style={{ marginLeft: 8 }} />
            </Button>
        </Flex>
    )
}

export default function GameContent() {
    const { activeTab, game, getCurrentPhase } = useContext(PlayerContext)
    const ActivePanel = panels[activeTab] || TeamContainer
    const currentPhase = getCurrentPhase()

    // Phase-based routing
    if (currentPhase === 'battle') {
        return (
            <Flex flex="1">
                <BattleScreen />
            </Flex>
        )
    }

    if (currentPhase === 'journey' || game.openJourneySelection) {
        if (game.isInJourney) {
            return (
                <Flex flex="1">
                    <JourneyScreen />
                </Flex>
            )
        }
        return (
            <Flex flex="1">
                <JourneySelection />
            </Flex>
        )
    }

    if (game.isInJourney) {
        return (
            <Flex flex="1">
                <JourneyScreen />
            </Flex>
        )
    }

    // freeActions phase (default) — show main UI
    return (
        <Flex flex="1" flexDir="column">
            <Flex flex="1" overflow="hidden">
                <ActivePanel />
            </Flex>
            <BottomBar />
        </Flex>
    )
}