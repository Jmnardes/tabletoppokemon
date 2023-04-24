import { Button, Center, Image, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "../Contexts/PlayerContext";
import Settings from "./Pokemon/Configuration/Settings";
import TrainerBar from "./Pokemon/Trainer/TrainerBar";
import shopIcon from '../assets/images/game/shop.png'
import bagIcon from '../assets/images/game/bag.png'
import gymIcon from '../assets/images/game/event3.png'
import PokeballStats from './Pokemon/Trainer/PokeballStats'

export default function GameHeader() {
    const { player, updateGame, session, pokeTeam, pokeBox } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        setShowNotification(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokeBox])

    return (
        <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center>
                <Text pb={2} px={4} fontSize="2xl" fontWeight="bold">
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
                
                <Button 
                    mx={2}
                    onClick={() => {
                        setShowNotification(false)
                        updateGame({ openPokeBoxModal: true })
                    }}
                >
                    <Image
                        src={bagIcon} 
                        title={'Shop'}
                        w="32px"
                    ></Image>
                    {showNotification && (
                        <Center 
                            position="absolute" 
                            right="0" 
                            bottom="-10px"
                            background="red"
                            borderRadius="50%"
                            width="18px"
                        >
                            <Text fontSize={"sm"} lineHeight="18px" mb="1px">{pokeBox?.length}</Text>
                        </Center>
                    )}
                </Button>

                <Button onClick={() => updateGame({ openPokeShop: true })}>
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