import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import GameJoin from "./GameJoin";
import { FaArrowLeft, FaDoorOpen } from "react-icons/fa";
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch"
import GameLobby from "./GameLobby";
import PlayerContext from "../../Contexts/PlayerContext";
import GameNew from "./GameNew";
// import socket from "../../client";

export default function GameMenu() {
    const { player, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [isGameTypeSelected, setIsGameTypeSelected] = useState(false)
    const [isGameTypeJoin, setIsGameTypeJoin] = useState(true)

    const goBack = () => {
        setIsGameTypeSelected(false)
    }

    const leaveRoom = () => {
        setPlayer({})

        // socket.emit('session-leave-other', {
        //     token: player.id
        // })

        setIsGameTypeSelected(false)
    }

    return (
        <>
            <Flex justifyContent="space-between">
                {player.id ? (
                    <Button h={12} m={4} onClick={leaveRoom}>
                        <FaDoorOpen size="16px"/>
                    </Button>
                ):(
                    <Button h={12} m={4} onClick={goBack}>
                        <FaArrowLeft size="16px"/>
                    </Button>
                )}

                <ThemeSwitch />
            </Flex>
            <Flex 
                justifyContent="center" 
                alignItems="center"
                h={"60%"}
            >
                <Flex
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    maxWidth="600px" 
                    minWidth="420px"
                    my={"auto"}
                    background={colorMode === 'light' ? "gray.400" : "gray.700"} 
                    borderRadius={8} px={8} py={2}
                >
                    {!isGameTypeSelected ? (
                        <>
                            <Button w="100%" fontSize="3xl" h={12} mt={4} mb={2} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(true)
                            }}>Join Game</Button>
                            <Button w="100%" fontSize="3xl" h={12} mt={4} mb={2} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(false)
                            }}>Create Game</Button>
                        </>
                    ) : (

                        player.id ? (
                            <GameLobby />
                        ) : (
                            isGameTypeJoin ? (
                                <GameJoin />
                            ):(
                                <GameNew />
                            )
                        )
                    )}
                </Flex>
            </Flex>
        </>
    )
}