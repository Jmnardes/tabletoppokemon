import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import GameJoin from "./GameJoin";
import { FaArrowLeft, FaDoorOpen } from "react-icons/fa";
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch"
import GameLobby from "./GameLobby";
import PlayerContext from "../../Contexts/PlayerContext";
import GameNew from "./GameNew";
import ConfirmationModal from "../Game/Modal/ConfirmationModal"
import DebugPage from "../Debug/debugPage";

export default function GameMenu() {
    const { player, emit, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [isGameTypeSelected, setIsGameTypeSelected] = useState(false)
    const [isGameTypeJoin, setIsGameTypeJoin] = useState(true)

    const [debug, setDebug] = useState(false)

    const goBack = () => {
        setIsGameTypeSelected(false)
    }

    const leaveRoom = () => {
        setPlayer({})

        emit('session-leave')

        setIsGameTypeSelected(false)
    }
  
    if (debug) {
      return <DebugPage setDebug={setDebug} />
    }

    return (
        <>
            <Flex justifyContent={isGameTypeSelected ? "space-between" : "end"}>
                {player.id ? (
                    <ConfirmationModal event={leaveRoom}>
                        <FaDoorOpen size="16px"/>
                    </ConfirmationModal>
                ):(
                    isGameTypeSelected &&
                    <Button h={12} m={4} onClick={goBack} display={isGameTypeSelected}>
                        <FaArrowLeft size="16px"/>
                    </Button>
                )}

                <Flex justifyContent="end">
                    <ThemeSwitch />
                </Flex>
            </Flex>
            <Flex 
                justifyContent="center" 
                alignItems="center"
                flexDir="column"
                h={"60%"}
            >
                {!isGameTypeSelected && (
                    <>
                        <Heading size="2xl">I'ma Poke</Heading>
                    </>
                )}
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
                            <Button w="100%" h={12} mt={4} mb={2} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(true)
                            }}>Join Room</Button>
                            <Button w="100%" h={12} mt={4} mb={2} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(false)
                            }}>New Room</Button>
                            <Button w="100%" h={12} mt={4} mb={2} onClick={
                                () => setDebug(true)
                            }>Simulator</Button>
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