import { useContext } from "react";
import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";

import bagIcon from '@assets/images/game/bag.png';
import gymIcon from '@assets/images/game/battle.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import fightIcon from '@assets/images/training/dummy.png';
import chipIcon from '@assets/images/game/chip.png';
import farmIcon from '@assets/images/farm/sprout.png';
import craftIcon from '@assets/images/craft/machine-on.png';

import { FaArrowRight } from "react-icons/fa";

export default function ActionPanel() {
    const { activeTab, setActiveTab, boxIds, teamIds, player, gym, advancePhase, turnPhases, currentPhaseIndex, farm, craft, bagDirty } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const totalPokemons = teamIds.length + boxIds.length
    const maxTeamSize = 6
    const needsFullTeam = totalPokemons >= maxTeamSize && teamIds.length < maxTeamSize
    
    const nextPhase = turnPhases[currentPhaseIndex + 1] || null
    
    const isTurnDisabled = needsFullTeam || bagDirty

    const getButtonLabel = () => {
        if (!nextPhase) return t('action.endTurn')
        if (nextPhase === 'journey') return t('action.startJourney')
        if (nextPhase === 'freeActions') return t('common.continue')
        return t('action.next')
    }

    const buttonSize = "50px"

    const tabButton = (tab, icon, title, extraProps = {}) => (
        <Button
            onClick={() => setActiveTab(tab)}
            variant={activeTab === tab ? "solid" : "outline"}
            colorScheme={activeTab === tab ? "blue" : "gray"}
            isDisabled={activeTab === tab || (bagDirty && tab !== 'bag')}
            {...extraProps}
        >
            <Image
                src={icon}
                title={title}
                w="26px"
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
                {farm && tabButton('farm', farmIcon, t('action.berryFarm'))}
                {craft && tabButton('craft', craftIcon, t('action.craft'))}

                {player.augments?.length > 0 && tabButton('augments', chipIcon, t('action.augments'))}
            </Flex>

            <Flex flexDir="column" gap="0.5rem">
                {tabButton('gym', gymIcon, t('action.gym'), { colorScheme: activeTab === 'gym' ? 'blue' : (gym ? 'green' : 'gray') })}

                <Button
                    colorScheme="green"
                    onClick={advancePhase}
                    isDisabled={isTurnDisabled}
                    title={needsFullTeam ? t('action.needPokemon') : bagDirty ? t('action.confirmTeamFirst') : getButtonLabel()}
                >
                    <FaArrowRight size="20px" color="white" />
                </Button>
            </Flex>
        </Flex>
    )
}
