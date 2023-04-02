import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import GameConfiguration from "./GameConfiguration";
import GameJoin from "./GameJoin";
import { FaArrowLeft } from "react-icons/fa";
import ThemeSwitch from "../../components/Chakra/ThemeSwitch/ThemeSwitch"
import GameLobby from "./GameLobby";

export default function InitialMenu({ handleGameStart, setIsPlayerInLobby, isPlayerInLobby }) {
    const { colorMode } = useColorMode()
    const [isGameTypeSelected, setIsGameTypeSelected] = useState(false)
    const [isGameTypeJoin, setIsGameTypeJoin] = useState(true)

    const goBack = () => {
        setIsGameTypeSelected(false)
        setIsGameTypeJoin(true)
    }

    return (
        <>
            <Flex justifyContent="space-between">
                <Button h={12} m={4} onClick={goBack}>
                    <FaArrowLeft size="16px"/>
                </Button>

                <ThemeSwitch />
            </Flex>
            <Flex 
                justifyContent="center" 
                alignItems="center"
                m="auto"
            >
                <Flex 
                    mt={40} 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    maxWidth="600px" 
                    background={colorMode === 'light' ? "gray.400" : "gray.700"} 
                    borderRadius={8} px={8} py={2}
                >
                    <Text fontSize="4xl" mb={4}>
                        {isPlayerInLobby ? 'Lobby' : "Welcome to Im'a Poke Trainer!"}
                    </Text>

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

                        isPlayerInLobby ? (
                            <GameLobby handleGameStart={handleGameStart} />
                        ) : (
                            isGameTypeJoin ? (
                                <GameJoin setIsPlayerInLobby={setIsPlayerInLobby} />
                            ):(
                                <GameConfiguration setIsPlayerInLobby={setIsPlayerInLobby} />
                            )
                        )
                    )}
                </Flex>
            </Flex>
        </>
    )
}