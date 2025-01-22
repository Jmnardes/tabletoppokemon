import { Button, Flex, Text, useStyleConfig } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";

import PokeTeam from "@components/Trainer/PokeTeam";

import { FaArrowRight } from "react-icons/fa";

export default function TeamContainer() {
    const { emit, setWaitingForPlayers } = useContext(PlayerContext)
    const [buttonText, setButtonText] = useState('')

    const handleHover = () => {
      setButtonText('Finish turn');
    };
  
    const handleLeave = () => {
      setButtonText('');
    };


    const finishTurn = () => {
        setWaitingForPlayers(true)
        emit('turn-end')
    }

    useEffect(() => {
        setButtonText('')
    }, [])

    return (
        <Flex flex="1" flexDir="column">
            <PokeTeam />
            <Button borderRadius={"none"} h={12} onClick={finishTurn} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                {/* <Text mr={8} fontWeight="bold">{buttonText}</Text> */}
                <Text mr={8} fontWeight="bold">Next turn!</Text>
                <FaArrowRight size="24px"/>
            </Button>
        </Flex>
    )
}