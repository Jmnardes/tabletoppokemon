import { Center } from "@chakra-ui/react";
import BerriesMini from "@features/items/BerriesMini";
import DustMini from "@features/items/DustMini";

export default function AppliedItems({ poke }) {
    return (
        <Center gap={2} mb={4} h={12} justifyContent={'space-between'}>
            <Center>
                <DustMini dusts={poke.dust} />
            </Center>

            <Center gap={2}>
                <BerriesMini berries={poke.berries} />
            </Center>
        </Center>
    )
}