import { Button, Center, Heading, Image, Text, useColorMode } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import stealIcon from '../../../assets/images/items/steal.png'
import { diceRoll } from "../../../util";
import { useEffect, useState } from "react";

export default function StealBlock({ steal, setSteal, turn }) {
    const { colorMode } = useColorMode()
    const [stealRoll, setStealRoll] = useState(false)

    const stealWhat = () => {
        let stealWhatRoll = diceRoll(100)

        if(stealWhatRoll < 30) {
            setStealRoll(`${diceRoll(6) + 1} coins`)
        } else if(stealWhatRoll < 50) {
            setStealRoll(`${diceRoll(6) + 5} coins`)
        } else if(stealWhatRoll < 75) {
            setStealRoll(`${diceRoll(11) + 5} coins`)
        } else if(stealWhatRoll < 90) {
            setStealRoll(`${diceRoll(11) + 10} coins`)
        } else if(stealWhatRoll < 98) {
            setStealRoll('medal')
        } else {
            setStealRoll('trophy')
        }
    }

    useEffect(() => {
        setStealRoll('')
    }, [turn])

    return (
        <PokeModal title={'Team Rocket Pass'} button={
            <Image
                src={stealIcon}
                title={'Team Rocket Pass'}
                w="24px"
            ></Image>
        } disableButton={steal === 0}>
            <Center flexDirection="column">
                <Heading>Roll to Steal</Heading>

                <Text mt={12} fontSize="2xl" textAlign="center">You can use the team Rocket to steal something from another trainer</Text>

                <Button mt={12} w={48} disabled={steal === 0} onClick={() => {
                    stealWhat()
                    setSteal(steal - 1)
                }}>Steal</Button>

                <Center mt={12} w={96} h={32} borderRadius={8} background={colorMode === 'light' ? "gray.200" : "RGBA(255, 255, 255, 0.08)"}>
                    <Text fontSize="3xl">{stealRoll}</Text>
                </Center>
            </Center>
        </PokeModal>
    )
}