import PokeModal from "./Modal/Modal";
import { Button, Center, Divider, Image, Text } from "@chakra-ui/react";
import settingsIcon from '../../assets/images/game/settings.png'
import { useContext } from "react";
import PlayerContext from "../../Contexts/PlayerContext";
import ThemeSwitch from "../Chakra/ThemeSwitch/ThemeSwitch";
import ElementsList from "./Team/ElementsList"

export default function Settings() {
    const { setHasGameStarted, setPlayer, setSession, setOpponents } = useContext(PlayerContext)

    return (
        <PokeModal title={'Settings'} size={'xl'} button={
            <Image
                src={settingsIcon} 
                title={'Settings'}
                w="28px"
            ></Image>
        }>
            <Center pb={4}>
                <ThemeSwitch />
            </Center>

            <Divider />
            
            <ElementsList />

            <Divider />

            <Center flexDirection="column" pt={8}>
                <Text fontSize="sm" color="red" >(All data will be lost)</Text>
                <Button p={4} w={40} onClick={() => {
                    setHasGameStarted(false)
                    setPlayer({})
                    setSession({})
                    setOpponents({})
                }}>Restart game!</Button>
            </Center>
        </PokeModal>
    )
}