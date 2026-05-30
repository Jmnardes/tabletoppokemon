import { useContext } from "react";
import { Button, Center, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";

import PokeGym from "@game/header/Buttons/PokeGym/PokeGym";
import PlayerAugments from "@game/header/Buttons/Augments/PlayerAugments";
import Settings from "@game/header/Buttons/Settings/Settings";

import dayCareIcon from '@assets/images/game/heart_ball.png';
import arrowIcon from '@assets/images/game/arrow.png';
import fightIcon from '@assets/images/items/fight.png';

import { FaArrowRight } from "react-icons/fa";

export default function ActionPanel() {
    const { updateGame, boxIds, teamIds, emit, setWaitingForPlayers } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const totalPokemons = teamIds.length + boxIds.length
    const needsFullTeam = totalPokemons >= 3 && teamIds.length < 3
    const isTurnDisabled = needsFullTeam

    const finishTurn = async () => {
        setWaitingForPlayers(true)
        if (boxIds.length > 0) {
            await emit('player-update-bag', { newTeamIds: teamIds })
        }
        emit('turn-end')
    }

    const buttonSize = "50px"

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
                <Button onClick={() => updateGame({ openPokeUpgradeModal: true })}>
                    <Image
                        src={arrowIcon}
                        title={'Poke Upgrade'}
                        w="26px"
                    />
                </Button>

                <PokeGym />

                <Button
                    onClick={() => updateGame({ openDayCareModal: true })}
                >
                    <Image
                        src={dayCareIcon}
                        title={'Poke Day Care'}
                        w="28px"
                    />
                </Button>

                <Button colorScheme="blue" onClick={() => updateGame({ openTrainingCampModal: true })}>
                    <Image
                        src={fightIcon}
                        title={'Training Camp'}
                        w="28px"
                    />
                </Button>

                <PlayerAugments />

                <Settings />
            </Flex>

            <Button
                colorScheme="green"
                onClick={finishTurn}
                isDisabled={isTurnDisabled}
                title={isTurnDisabled ? "Você precisa de 3 pokémons no time" : "Finish your turn"}
            >
                <FaArrowRight size="20px" color="white" />
            </Button>
        </Flex>
    )
}
