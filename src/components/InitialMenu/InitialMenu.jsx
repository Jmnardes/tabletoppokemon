import { Button, Flex, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import GameConfiguration from "./GameConfiguration";
import GameJoin from "./GameJoin";
import { FaArrowLeft } from "react-icons/fa";
import ThemeSwitch from "../../components/Chakra/ThemeSwitch/ThemeSwitch"
import GameLobby from "./GameLobby";
import PlayerContext from "../../Contexts/PlayerContext";

export default function InitialMenu() {
    const { player } = useContext(PlayerContext)
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
                    mt={32} 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center" 
                    maxWidth="600px" 
                    minWidth="420px" 
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
                                <GameConfiguration />
                            )
                        )
                    )}
                </Flex>
            </Flex>
        </>
    )
}