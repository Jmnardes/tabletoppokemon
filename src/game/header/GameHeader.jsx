import { Badge, Button, Center, Image, Text, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import Settings from "./Buttons/Settings/Settings";
import TrainerBar from "./Trainer/TrainerBar";
import PokeballStats from './Pokeball/PokeballStats'
import NextEvent from "./NextEvent/NextEvent";

import bagIcon from '@assets/images/game/bag.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import arrowIcon from '@assets/images/game/arrow.png';
import PlayerAugments from "./Buttons/Augments/PlayerAugments";

export default function GameHeader() {
    const { player, updateGame, pokeBox, game, nextEvent } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    return (
        <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center flex="1" justifyContent={"start"}>
                <Badge
                    title={player.status.trainerName}
                    maxW={48} p={2} px={4} ml={4}
                    backgroundColor={bgColor}
                    borderRadius={6}
                    isTruncated
                    fontWeight="bold"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {player.status.trainerName}
                </Badge>
                <TrainerBar />
            </Center>
            <Center>
                <NextEvent nextEvent={nextEvent} />
            </Center>
            <Center flex="1" justifyContent={"end"}>
                {/* <PokemonEgg /> */}

                <PokeballStats />

                {/* <Button mx={1} onClick={() => updateGame({ openBerriesModal: true })}>
                    <Image
                        src={berryIcon} 
                        title={'Berries'}
                        w="32px"
                    ></Image>
                </Button> */}

                <Button mx={1} onClick={() => updateGame({ openPokeUpgradeModal: true })}>
                    <Image
                        src={arrowIcon} 
                        title={'Poke Upgrade'} 
                        w="26px"
                    ></Image>
                </Button>

                <Button 
                    mx={1}
                    onClick={() => updateGame({ openDayCareModal: true })}
                >
                    <Image
                        src={dayCareIcon} 
                        title={'Poke Day Care'}
                        w="28px"
                    ></Image>
                </Button>
                
                <Button 
                    mx={1}
                    isDisabled={pokeBox.length < 1}
                    onClick={() => {
                        updateGame({ openPokeBoxModal: true, showBagLength: false })
                    }}
                >
                    <Image
                        src={bagIcon} 
                        title={'Poke Bag'}
                        w="32px"
                    ></Image>
                    {game.showBagLength && (
                        <Center 
                            position="absolute" right="-1" bottom="-10px"
                            borderRadius="50%" width="20px" height="20px"
                            background={colorMode === 'light' ? 'whiteAlpha.900' : 'gray.600'}
                        >
                            <Text fontSize={"xx-small"}>{pokeBox?.length}</Text>
                        </Center>
                    )}
                </Button>

                <PlayerAugments />

                <Settings />
            </Center>
        </Center>
    )
}