import { Center, Image, Text } from "@chakra-ui/react";
import BerriesMini from "../Items/BerriesMini";
import DustMini from "../Items/DustMini";

export default function ShowBerry({ poke }) {
    return (
        <Center gap={2} mt={2} h={12} justifyContent={'space-between'}>
            <Center>
                <DustMini dusts={poke.dust} />
            </Center>

            <Center gap={2}>
                <BerriesMini berries={poke.berries} />
            </Center>
        </Center>
    )
}