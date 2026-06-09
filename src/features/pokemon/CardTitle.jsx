import { Center, Text } from "@chakra-ui/react";
import { stringToUpperCase } from "@utils";

export default function CardTitle({ poke }) {
    return (
        <Center flexDirection={"column"}>
            <Text fontFamily={"Press Start 2P"} fontSize="xx-small">
                {stringToUpperCase(poke.name)}
            </Text>
        </Center>
    )
}