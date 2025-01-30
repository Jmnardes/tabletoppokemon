import { Button, Flex, Heading, useColorMode, Link } from "@chakra-ui/react";
import { useContext, useState } from "react";

import GameJoin from "./GameJoin";
import ThemeSwitch from "@components/Chakra/ThemeSwitch/ThemeSwitch"
import GameLobby from "./GameLobby";
import PlayerContext from "@Contexts/PlayerContext";
import GameNew from "./GameNew";
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import DebugPage from "@pages/Debug/debugPage";
import StatisticsPage from "@pages/Statistics/StatisticsPage";
import GameInfo from "./GameInfo";

import { FaArrowLeft, FaDoorOpen, FaInfoCircle, FaGithub } from "react-icons/fa";

export default function GameMenu() {
    const { player, emit, setPlayer } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const [isGameTypeSelected, setIsGameTypeSelected] = useState(false)
    const [isGameTypeJoin, setIsGameTypeJoin] = useState(true)
    const [gameInfoModal, setGameInfoModal] = useState(false)

    const [debug, setDebug] = useState(false)
    const [statistics, setStatistics] = useState(false)

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

    if (statistics) {
      return <StatisticsPage setStatistics={setStatistics} />
    }

    return (
        <>
            <Flex justifyContent="space-between">
                <Flex>
                    {player.id ? (
                        <ConfirmationModal event={leaveRoom}>
                            <FaDoorOpen size="16px"/>
                        </ConfirmationModal>
                    ):(
                        isGameTypeSelected &&
                        <Button h={12} m={4} onClick={goBack} display={isGameTypeSelected} zIndex={1}>
                            <FaArrowLeft size="16px"/>
                        </Button>
                    )}
                </Flex>

                <Flex>
                    <Button w="100%" h={12} m={4} title="GitHub">
                        <Link href="https://github.com/Jmnardes" isExternal>
                            <FaGithub/>
                        </Link>
                    </Button>
                    
                    <Button w="100%" h={12} m={4} title="Game Info" onClick={() => setGameInfoModal(true)}>
                        <FaInfoCircle/>
                    </Button>

                    <Flex>
                        <ThemeSwitch />
                    </Flex>
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
                        <Heading size="2xl">Poké Tactics</Heading>
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
                            <Button w="100%" h={12} my={4} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(true)
                            }}>Join Room</Button>
                            <Button w="100%" h={12} my={4} onClick={() => {
                                setIsGameTypeSelected(true) 
                                setIsGameTypeJoin(false)
                            }}>New Room</Button>
                            {/* <Button w="100%" h={12} my={4} onClick={
                                () => setDebug(true)
                            }>Simulator</Button> */}
                            <Button w="100%" h={12} my={4} onClick={
                                () => setStatistics(true)
                            }>Statistics</Button>
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
            
            {gameInfoModal && <GameInfo setGameInfoModal={setGameInfoModal} />}
        </>
    )
}