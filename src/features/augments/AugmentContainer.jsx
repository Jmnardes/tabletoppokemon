import { Badge, Center, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { augmentColor } from "@utils";
import { pulseAnimation } from "@utils/animations";
import AugmentData from "@game/modals/Augments/AugmentData";

const nameToKey = (name) => name.replace(/\s+/g, '').replace(/é/g, 'e').charAt(0).toLowerCase() + name.replace(/\s+/g, '').replace(/é/g, 'e').slice(1);

export default function AugmentContainer ({ augment, handler = () => {}, choose = false }) {
    const { t } = useTranslation();
    const key = nameToKey(augment.name);

    return (
        <Flex
            direction={"column"}
            borderRadius={8}
            h={choose ? 72 : 64}
            p={4} w={choose ? "100%" : 60}
            minW={choose ? 0 : undefined}
            opacity={choose && 0.6}
            backgroundColor={augmentColor(augment.rarity)}
            _hover={choose && { 'animation': `${pulseAnimation(augmentColor(augment.rarity))} 1.5s infinite`, opacity: 1 }}
            cursor={choose && "pointer"}
            onClick={handler}
        >
            <Badge p={2} borderRadius={8} textAlign={"center"}>
                {t(`augments.${key}.name`, augment.name)}
            </Badge>
            <Center flex flexDir={"column"} justifyContent={"space-between"} h={"100%"} gap={8}>
                <Text fontSize={"x-small"} pt={4} textAlign={"center"}>
                    {t(`augments.${key}.description`, augment.description)}
                </Text>
                <AugmentData augment={augment} />
            </Center>
        </Flex>
    );
}