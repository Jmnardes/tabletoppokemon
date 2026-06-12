import { Button, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { changeLanguage, getCurrentLanguage } from "../../../i18n/i18n"

function LanguageSwitch() {
    const { t } = useTranslation()
    const lang = getCurrentLanguage()

    const toggle = () => {
        changeLanguage(lang === 'pt-BR' ? 'en' : 'pt-BR')
    }

    return (
        <Button h={12} m={4} onClick={toggle} title={t('settings.language')}>
            <Text fontSize="sm">{lang === 'pt-BR' ? '🇧🇷' : '🇺🇸'}</Text>
        </Button>
    )
}

export default LanguageSwitch
