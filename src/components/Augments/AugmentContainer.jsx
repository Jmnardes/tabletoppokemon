import { Badge, Center, Flex, Text } from "@chakra-ui/react";
import { augmentColor } from "@utils";
import { pulseAnimation } from "@utils/animations";
import AugmentData from "../../game/modals/Augments/AugmentData";

export default function AugmentContainer ({ augment, handler = () => {}, choose = false }) {
    return (
        <Flex
            direction={"column"}
            borderRadius={8}
            h={64}
            p={4} w={choose ? 72 : 60}
            opacity={choose && 0.6}
            backgroundColor={augmentColor(augment.rarity)}
            _hover={choose && { 'animation': `${pulseAnimation(augmentColor(augment.rarity))} 1.5s infinite`, opacity: 1 }}
            cursor={choose && "pointer"}
            onClick={handler}
        >
            <Badge p={2} borderRadius={8} textAlign={"center"}>
                {augment.name}
            </Badge>
            <Center flex flexDir={"column"} justifyContent={"space-between"} h={"100%"} gap={8}>
                <Text fontSize={"x-small"} pt={4} textAlign={"center"}>
                    {augment.description}
                </Text>
                <AugmentData augment={augment} />
            </Center>
        </Flex>
    );
}