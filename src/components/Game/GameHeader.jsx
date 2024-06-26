import { Button, Center, Image, Text, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "../../Contexts/PlayerContext";
import Settings from "./Settings";
import TrainerBar from "./Trainer/TrainerBar";
import PokeballStats from './Trainer/PokeballStats'

import shopIcon from '../../assets/images/game/shop.png'
import bagIcon from '../../assets/images/game/bag.png'
import battleIcon from '../../assets/images/game/battle.png'
import bulbasaurIcon from '../../assets/images/pokemons/bulbasaur.png'
import venonatIcon from '../../assets/images/pokemons/venonat.png'
import gymIcon from '../../assets/images/game/event3.png'

export default function GameHeader() {
    const { player, updateGame, pokeBox, game } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    return (
        <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center>
                <Text ml={2} pb={1} px={4} fontWeight="bold" backgroundColor={"gray.600"} borderRadius={6}>
                    {player.status.trainerName}
                </Text>
                <TrainerBar />
            </Center>
            <Center>
                {/* <StealBlock />
                <PokemonEgg /> */}

                {/* {session.turns % 10 === 0 && session.turns !== 0 && pokeTeam?.length > 0 && (
                    <Button mr={2} onClick={() => updateGame({ openGymModal: true })}>
                        <Image
                            src={gymIcon} 
                            title={'Gym'}
                            w="32px"
                        ></Image>
                    </Button>
                )} */}

                <PokeballStats />

                {/* <Button onClick={() => updateGame({ openBattleModal: true })}>
                    <Image
                        src={battleIcon} 
                        title={'Battle'}
                        w="32px"
                    ></Image>
                </Button> */}

                <Button mx={1} onClick={() => updateGame({ openPokeItemModal: true })}>
                    <Image
                        src={venonatIcon} 
                        title={'Pokémon Items'} 
                        w="32px"
                    ></Image>
                </Button>

                <Button mx={1} onClick={() => updateGame({ openDayCareModal: true })}>
                    <Image
                        src={bulbasaurIcon} 
                        title={'Pokémon Day Care'}
                        w="32px"
                    ></Image>
                </Button>
                
                <Button 
                    mx={1}
                    onClick={() => {
                        updateGame({ openPokeBoxModal: true, showBagLength: false })
                    }}
                >
                    <Image
                        src={bagIcon} 
                        title={'Bag'}
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

                <Button mx={1} onClick={() => updateGame({ openPokeShop: true })}>
                    <Image
                        src={shopIcon} 
                        title={'Shop'}
                        w="32px"
                    ></Image>
                </Button>

                <Settings />
            </Center>
        </Center>
    )
}