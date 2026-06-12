import { Center, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Chat() {
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"

    return (
        <Center h={"full"} w={"full"} backgroundColor={bgColor} borderRadius={8}>
            <Text>{t('chat.title')}</Text>
        </Center>
    )
}