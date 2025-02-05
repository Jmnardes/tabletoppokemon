import { Center, Text, useColorMode } from "@chakra-ui/react";

export default function Chat() {
    const { colorMode } = useColorMode()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    return (
        <Center h={"full"} w={"full"} backgroundColor={bgColor} borderRadius={8}>
            <Text>Chat</Text>
        </Center>
    )
}