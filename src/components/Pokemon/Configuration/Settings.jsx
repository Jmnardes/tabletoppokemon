import PokeModal from "../Modal/Modal";
import { Button, Center, Divider, Image, Text } from "@chakra-ui/react";
import settingsIcon from '../../../assets/images/game/settings.png'
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import ThemeSwitch from "../../Chakra/ThemeSwitch/ThemeSwitch";

export default function Settings() {
    const { setHasGameStarted, setPlayer, setSession, setOpponents } = useContext(PlayerContext)

    return (
        <PokeModal title={'Settings'} button={
            <Image
                src={settingsIcon} 
                title={'Settings'}
                w="28px"
            ></Image>
        }>
            <Center>
                <ThemeSwitch />
            </Center>

            <Divider p={2} />

            <Center flexDirection="column">
                <Text my={4} fontSize="2xl" textAlign="center">Restart game!</Text>
                <Text fontSize="sm" color="red" >(All data will be lost)</Text>
                <Button p={4} w={40} onClick={() => {
                    setHasGameStarted(false)
                    setPlayer({})
                    setSession({})
                    setOpponents({})
                }}>Yes, restart game</Button>
            </Center>
        </PokeModal>
    )
}