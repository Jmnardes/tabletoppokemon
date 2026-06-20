import { useContext } from "react";
import { Badge, Box, Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";

import bagIcon from '@assets/images/game/bag.png';
import gymIcon from '@assets/images/game/crown.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import fightIcon from '@assets/images/training/dummy.png';
import chipIcon from '@assets/images/game/chip.png';
import farmIcon from '@assets/images/farm/sprout.png';
import craftIcon from '@assets/images/craft/machine-on.png';

import { FaArrowRight } from "react-icons/fa";

export default function ActionPanel() {
    const { activeTab, setActiveTab, teamIds, player, gym, advancePhase, turnPhases, currentPhaseIndex, farm, craft } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const minTeamSize = 3
    const needsFullTeam = teamIds.length < minTeamSize
    
    const nextPhase = turnPhases[currentPhaseIndex + 1] || null
    
    const isTurnDisabled = needsFullTeam

    const getButtonLabel = () => {
        if (!nextPhase) return t('action.endTurn')
        if (nextPhase === 'journey') return t('action.startJourney')
        if (nextPhase === 'freeActions') return t('common.continue')
        return t('action.next')
    }

    const buttonSize = "56px"

    const tabButton = (tab, icon, title, extraProps = {}) => (
        <Button
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? "solid" : "outline"}
            colorScheme={activeTab === tab ? "blue" : "gray"}
            isDisabled={activeTab === tab}
            overflow="visible"
            transition="all 0.15s ease"
            _hover={{ transform: 'scale(1.15)', filter: 'brightness(1.3)' }}
            {...extraProps}
        >
            <Image
                src={icon}
                title={title}
                w="51px"
                h="51px"
                objectFit="contain"
                pointerEvents="none"
            />
        </Button>
    )

    return (
        <Flex
            padding="0.5rem"
            gap="0.5rem"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
            sx={{
                '& button': {
                    w: buttonSize,
                    h: buttonSize,
                    minW: buttonSize,
                    minH: buttonSize,
                    mx: 0,
                }
            }}
        >
            <Flex flexDir="column" gap="0.5rem">
                {tabButton('bag', bagIcon, t('action.bag'))}
                {tabButton('daycare', dayCareIcon, t('action.dayCare'))}
                {tabButton('training', fightIcon, t('action.trainingCamp'), { colorScheme: activeTab === 'training' ? 'blue' : 'gray' })}
                {farm && (
                    <Box position="relative">
                        {tabButton('farm', farmIcon, t('action.berryFarm'))}
                        {farm.plots?.filter(p => p.status === 'ready').length > 0 && (
                            <Badge
                                position="absolute" top="-4px" right="-4px"
                                colorScheme="red" borderRadius="full"
                                fontSize="2xs" minW="16px" h="16px"
                                display="flex" alignItems="center" justifyContent="center"
                                zIndex={3}
                            >
                                {farm.plots.filter(p => p.status === 'ready').length}
                            </Badge>
                        )}
                    </Box>
                )}
                {craft && tabButton('craft', craftIcon, t('action.craft'))}

                {player.augments?.length > 0 && tabButton('augments', chipIcon, t('action.augments'))}
            </Flex>

            <Flex flexDir="column" gap="0.5rem">
                {tabButton('gym', gymIcon, t('action.gym'), { colorScheme: activeTab === 'gym' ? 'blue' : (gym ? 'green' : 'gray') })}

                <Button
                    colorScheme="green"
                    onClick={advancePhase}
                    isDisabled={isTurnDisabled}
                    title={needsFullTeam ? t('action.needPokemon') : getButtonLabel()}
                >
                    <FaArrowRight size="20px" color="white" />
                </Button>
            </Flex>
        </Flex>
    )
}
