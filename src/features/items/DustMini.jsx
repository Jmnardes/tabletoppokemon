import { Center, Image, Text } from "@chakra-ui/react"
import dustIcon from '@assets/images/items/dust.png'
import { useTranslation } from "react-i18next"

export default function DustMini({ dusts, absolute=true }) {
    const { t } = useTranslation()
    return (
        <>
            {dusts > 0 && (
                <Center flex flexDir={absolute ? "column" : "row"}>
                    {absolute ? (
                        <Text bottom={2} ml={4} position={"absolute"} fontSize={"xx-small"}>
                            {dusts}x
                        </Text>
                    ): (
                        <Text fontSize={"xx-small"}>
                            {dusts}x
                        </Text>
                    )}
                    <Image
                        title={t('items.dusts')}
                        src={dustIcon}
                        w={4}
                    />
                </Center>
            )}
        </>
    )
}