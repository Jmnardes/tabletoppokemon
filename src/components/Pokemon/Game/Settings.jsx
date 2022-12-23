import PokeModal from "../Modal/Modal";
import { Button, Center, Divider, Image, Text } from "@chakra-ui/react";
import settingsIcon from '../../../assets/images/game/settings.png'

export function Settings({ handleGameReset, children }) {
    return (
        <PokeModal title={'Settings'} button={
            <Image
                src={settingsIcon} 
                title={'Settings'}
                w="28px"
            ></Image>
        }>
            {children}
        <Divider p={2} />
            <Center flexDirection="column" p={4}>
                <Text mb={4} fontSize="2xl" textAlign="center">Restart game!</Text>
                <Text fontSize="sm" color="red" >(All data will be lost)</Text>
                <Button p={4} w={40} onClick={() => handleGameReset(true)}>Yes, restart game</Button>
            </Center>
        </PokeModal>
    )
}