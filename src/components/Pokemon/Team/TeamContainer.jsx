import { Button, Flex, Text } from "@chakra-ui/react";
import PokeTeam from "../Trainer/PokeTeam";
import { FaArrowRight } from "react-icons/fa";
import PlayerContext from "../../../Contexts/PlayerContext";
import { useContext } from "react";

export default function TeamContainer() {
    const { emit, setWaitingForPlayers } = useContext(PlayerContext)

    const finishTurn = () => {
        setWaitingForPlayers(true)
        emit('turn-end')
    }

    return (
        <Flex flex="1" flexDir="column">
            <PokeTeam />
            <Button w="100%" borderRadius={"none"} h={12} onClick={finishTurn}>
                <Text mb={1} mr={8} fontSize="2xl" fontWeight="bold">Finish turn</Text>
                <FaArrowRight size="24px"/>
            </Button>
        </Flex>
    )
}