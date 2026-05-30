import { useContext } from "react";
import { Button, Center, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";

import PokeGym from "@game/header/Buttons/PokeGym/PokeGym";
import BadgeCollection from "@game/header/Buttons/BadgeCollection/BadgeCollection";
import PlayerAugments from "@game/header/Buttons/Augments/PlayerAugments";
import Settings from "@game/header/Buttons/Settings/Settings";

import bagIcon from '@assets/images/game/bag.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import arrowIcon from '@assets/images/game/arrow.png';
import fightIcon from '@assets/images/items/fight.png';

import { FaArrowRight } from "react-icons/fa";

export default function ActionPanel() {
    const { updateGame, boxIds, game, emit, setWaitingForPlayers } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const finishTurn = () => {
        setWaitingForPlayers(true)
        emit('turn-end')
    }

    const buttonSize = "50px"

    return (
        <Flex
            padding="0.5rem"
            gap="0.5rem"
            flexDir="column"
            justifyContent="flex-end"
            backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
            sx={{
                '& > button, & > div > button, & > span > button': {
                    w: buttonSize,
                    h: buttonSize,
                    minW: buttonSize,
                    minH: buttonSize,
                    mx: 0,
                }
            }}
        >
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

            <Button
                isDisabled={boxIds.length < 1}
                onClick={() => {
                    updateGame({ openPokeBoxModal: true, showBagLength: false })
                }}
                position="relative"
            >
                <Image
                    src={bagIcon}
                    title={'Poke Bag'}
                    w="32px"
                />
                {game.showBagLength && (
                    <Center
                        position="absolute" right="-1" bottom="-10px"
                        borderRadius="50%" width="20px" height="20px"
                        background={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.600'}
                    >
                        <Text fontSize={"xx-small"}>{boxIds?.length}</Text>
                    </Center>
                )}
            </Button>

            <BadgeCollection />

            <Button colorScheme="blue" onClick={() => updateGame({ openTrainingCampModal: true })}>
                <Image
                    src={fightIcon}
                    title={'Training Camp'}
                    w="28px"
                />
            </Button>

            <PlayerAugments />

            <Settings />

            <Button
                colorScheme="green"
                onClick={finishTurn}
                title="Finish your turn"
            >
                <FaArrowRight size="20px" color="white" />
            </Button>
        </Flex>
    )
}
