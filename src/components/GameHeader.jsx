import { Button, Center, Image, Text, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext";
import Settings from "./Pokemon/Configuration/Settings";
import TrainerBar from "./Pokemon/Trainer/TrainerBar";
import shopIcon from '../assets/images/game/shop.png'
import gymIcon from '../assets/images/game/event3.png'

export default function GameHeader() {
    const { player, updateGame, session, pokeTeam } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    return (
        <Center py={2} pr={2} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center>
                <Text pb={2} px={4} fontSize="2xl" fontWeight="bold" borderRight="1px solid">
                    {player.status.trainerName}
                </Text>
                <TrainerBar />
            </Center>
            <Center>
                {/* <StealBlock />
                <PokemonEgg /> */}

                {session.turns % 10 === 0 && session.turns !== 0 && pokeTeam?.length > 0 && (
                    <Button mr={2} onClick={() => updateGame({ openGymModal: true })}>
                        <Image
                            src={gymIcon} 
                            title={'Gym'}
                            w="32px"
                        ></Image>
                    </Button>
                )}

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