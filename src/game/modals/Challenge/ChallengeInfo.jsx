import { Center, Flex, Text, Tooltip } from "@chakra-ui/react"
import Element from "@components/Elements/Element";

export default function ChallengeInfo({ event, bonus }) {
    const bonusColor = (bonus) => {
        if (bonus === 0) return "white"
        if (bonus > 0) return "green.400"
        return "red.400"
    }

    const bonusSignal = (bonus) => {
        if (bonus === 0) return ""
        if (bonus > 0) return "+"
        return "-"
    }

    return (
        <Center flex flexDir={"column"}>
            <Text fontSize={"lg"} mb={2} textAlign="center">
                {event.label}
            </Text>
            <Center gap={24}>
                <Center flex flexDir={"column"}>
                    <Flex color="green.400" my={1}>
                        <Text mt={2}>Advantages:</Text>
                        {event.advantage.value.map(element => (
                            <Element key={element} element={element} elementTable={false} w={8} h={8} />
                        ))}
                    </Flex>

                    {event.disadvantage?.value && (
                        <Flex color="red.400" my={1}>
                            <Text mt={2}>Disadvantages: </Text>
                            {event.disadvantage.value.map(element => (
                                <Element key={element} element={element} elementTable={false} w={8} h={8} />
                            ))}
                        </Flex>
                    )}
                </Center>
                <Tooltip label="Every Pókemon sums +1 on to bonus value" p={4} borderRadius={6}>
                    <Center flex>
                        <Text fontSize={'2xl'} mt={2}>
                            Bonus:
                        </Text>
                        <Text fontSize={'2xl'} mt={2} color={bonusColor(bonus)}>
                            {bonusSignal(bonus)}{bonus}
                        </Text>
                    </Center>
                </Tooltip>
            </Center>
            
        </Center>
    )
}