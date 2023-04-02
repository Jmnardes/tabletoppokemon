import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "../../Contexts/PlayerContext";

export default function GameLobby() {
    const { status } = useContext(PlayerContext)
    
    return (
        <>
            <Text>{status.trainerName}</Text>
        </>
    )
}