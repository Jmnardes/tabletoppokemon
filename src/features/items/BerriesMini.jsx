import { Center, Image, Text, Tooltip } from "@chakra-ui/react";
import { getBerryIcon } from "@utils/berryIcon";
import { useTranslation } from "react-i18next";

export default function BerriesMini({ berries, isUsed = true }) {
    const { t } = useTranslation()
    return (
        <>
            {berries.map((berry, index) => (
                <Tooltip key={index} p={4} borderRadius={8} label={
                    <Center flexDir="column" gap={4}>
                        <Text>{berry.effect.description}</Text>
                        {isUsed ? (
                            <Text>{t('items.turnsLeft', { turns: berry.turns })}</Text>
                        ) : (
                            <Text>{t('items.turnsLeft', { turns: berry.turns })}</Text>
                        )}
                    </Center>
                }>
                    <Image src={getBerryIcon(berry.type)} w={8} />
                </Tooltip>
            ))}
        </>
    )
}
