import { Button, Center, Heading, Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import stealIcon from '../../../assets/images/items/steal.png'
import { diceRoll } from "../../../util";
import { useEffect, useState } from "react";

export default function StealBlock({ disable, steal, setSteal }) {
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
        if(steal === 0) {
            setStealRoll('')
        }
    }, [steal])

    return (
        <PokeModal title={'Team Rocket Pass'} button={
            <Image
                src={stealIcon}
                title={'Team Rocket Pass'}
                w="24px"
            ></Image>
        } disableButton={disable}>
            <Center flexDirection="column">
                <Heading mt={16}>Roll to Steal</Heading>

                <Text fontSize="3xl" mt={24}>{stealRoll}</Text>

                <Button mt={24} w={48} disabled={steal === 0} onClick={() => {
                    stealWhat()
                    setSteal(steal - 1)
                }}>Steal</Button>
            </Center>
        </PokeModal>
    )
}