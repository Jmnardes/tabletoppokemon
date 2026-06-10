import { useContext } from "react";
import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";

import bagIcon from '@assets/images/game/bag.png';
import gymIcon from '@assets/images/game/battle.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import fightIcon from '@assets/images/items/fight.png';
import chipIcon from '@assets/images/game/chip.png';
import farmIcon from '@assets/images/berries/berry.png';
import craftIcon from '@assets/images/game/pokedex.png';

import { FaArrowRight } from "react-icons/fa";

export default function ActionPanel() {
    const { activeTab, setActiveTab, boxIds, teamIds, player, gym, advancePhase, turnPhases, currentPhaseIndex, farm, craft, bagDirty } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const totalPokemons = teamIds.length + boxIds.length
    const maxTeamSize = 6
    const needsFullTeam = totalPokemons >= maxTeamSize && teamIds.length < maxTeamSize
    
    const nextPhase = turnPhases[currentPhaseIndex + 1] || null
    
    const isTurnDisabled = needsFullTeam || bagDirty

    const getButtonLabel = () => {
        if (!nextPhase) return "End Turn"
        if (nextPhase === 'journey') return "Start Journey"
        if (nextPhase === 'freeActions') return "Continue"
        return "Next"
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
                {tabButton('bag', bagIcon, 'Bag')}
                {tabButton('daycare', dayCareIcon, 'Poke Day Care')}
                {tabButton('training', fightIcon, 'Training Camp', { colorScheme: activeTab === 'training' ? 'blue' : 'gray' })}
                {farm && tabButton('farm', farmIcon, 'Berry Farm')}
                {craft && tabButton('craft', craftIcon, 'Craft')}

                {player.augments?.length > 0 && tabButton('augments', chipIcon, 'Augments')}
            </Flex>

            <Flex flexDir="column" gap="0.5rem">
                {tabButton('gym', gymIcon, 'Gym', { colorScheme: activeTab === 'gym' ? 'blue' : (gym ? 'green' : 'gray') })}

                <Button
                    colorScheme="green"
                    onClick={advancePhase}
                    isDisabled={isTurnDisabled}
                    title={needsFullTeam ? "Você precisa de 3 pokémons no time" : bagDirty ? "Confirm your team first" : getButtonLabel()}
                >
                    <FaArrowRight size="20px" color="white" />
                </Button>
            </Flex>
        </Flex>
    )
}
