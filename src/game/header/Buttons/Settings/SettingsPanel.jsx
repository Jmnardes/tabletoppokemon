import { useContext } from "react";
import { Button, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PlayerContext from "@context/PlayerContext";
import ThemeSwitch from "@components/Chakra/ThemeSwitch/ThemeSwitch";
import ElementsList from "@features/elements/ElementsList"
import LanguageSwitch from "@components/Chakra/LanguageSwitch/LanguageSwitch";

export default function SettingsPanel() {
    const { setHasGameStarted, setPlayer, setSession, setOpponents } = useContext(PlayerContext)
    const { t } = useTranslation()

    return (
        <Flex flex="1" flexDir="column" alignItems="center" overflowY="auto" p={6} data-tutorial="settings-panel">
            <Text fontSize="xl" fontWeight="bold" mb={4}>{t('settings.title')}</Text>

            <Center pb={4} gap={4}>
                <LanguageSwitch />
                <ThemeSwitch />
            </Center>

            <Divider my={4} />

            <ElementsList />

            <Divider my={4} />

            <Center flexDirection="column" pt={4} mb={4}>
                <Button p={4} w={72} onClick={() => {
                    localStorage.clear()
                    setHasGameStarted(false)
                    setPlayer({})
                    setSession({})
                    setOpponents({})
                    window.location.reload()
                }}>{t('settings.restartGame')}</Button>
            </Center>
        </Flex>
    )
}
