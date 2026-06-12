import { useContext } from "react";
import { Button, Center, Divider, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import ButtonModal from "@components/Modal/ButtonModal";
import PlayerContext from "@context/PlayerContext";
import ThemeSwitch from "@components/Chakra/ThemeSwitch/ThemeSwitch";
import ElementsList from "@features/elements/ElementsList"
import LanguageSwitch from "@components/Chakra/LanguageSwitch/LanguageSwitch";

import settingsIcon from '@assets/images/game/settings.png'

export default function Settings() {
    const { setHasGameStarted, setPlayer, setSession, setOpponents } = useContext(PlayerContext)
    const { t } = useTranslation()

    return (
        <ButtonModal title={t('settings.title')} size={'xl'} button={
            <Image
                src={settingsIcon} 
                title={t('settings.title')}
                w="28px"
            ></Image>
        }>
            <Center pb={4} gap={4}>
                <LanguageSwitch />
                <ThemeSwitch />
            </Center>

            <Divider />
            
            <ElementsList />

            <Divider />

            <Center flexDirection="column" pt={8} mb={4}>
                <Text fontSize="2xs" color="red" >{t('settings.dataLost')}</Text>
                <Button p={4} w={72} onClick={() => {
                    setHasGameStarted(false)
                    setPlayer({})
                    setSession({})
                    setOpponents({})
                }}>{t('settings.restartGame')}</Button>
            </Center>
        </ButtonModal>
    )
}