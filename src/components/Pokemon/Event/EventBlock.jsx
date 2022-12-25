import { Center, Heading, Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import event1Icon from '../../../assets/images/game/event1.png'
import { useEffect, useState } from "react";
import { rollEventType } from "./events";

export default function EventBlock({ disable }) {
    const [event, setEvent] = useState([])

    const handleEvent = () => {
        rollEventType()

        setEvent(rollEventType())
    }

    const EventComponent = ({ title, description, rules, prize1, prize2 }) => {
        return (
            <Center flexDirection="column">
                <Heading mb={8}>{title}</Heading>
                <Text m={4} fontSize="2xl">{description}</Text>
                <Text mt={8} fontSize="1xl" color="red" fontWeight="bold">{rules}</Text>
                <Center mt={12} flexDirection="column">
                    <Center mb={8}>
                        <Text mr={4} fontSize="2xl" fontWeight="bold">1st</Text>
                        <Text>{prize1}</Text>
                    </Center>
                    <Center mb={8}>
                        <Text mr={4} fontSize="2xl" fontWeight="bold">2nd</Text>
                        <Text>{prize2}</Text>
                    </Center>
                    <Center mb={8}>
                        <Text mr={4} fontSize="2xl" fontWeight="bold">3nd</Text>
                        <Text>1 coin</Text>
                    </Center>
                </Center>
            </Center>
        )
    }

    useEffect(() => {
        !disable && handleEvent()
    }, [disable])

    return (
        <PokeModal title={'Event'} button={
            <Image
                src={event1Icon}
                title={'Event'}
                w="24px"
            ></Image>
        } disableButton={disable}>
            <Center>
                <EventComponent 
                    title={event?.title}
                    description={event?.description}
                    rules={event?.rules}
                    prize1={event?.prize1}
                    prize2={event?.prize2}
                />
            </Center>
        </PokeModal>
    )
}