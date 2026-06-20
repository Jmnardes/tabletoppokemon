import { useContext } from "react";
import { Badge, Center, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";

import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'

export default function PassiveEconomyTooltip() {
    const { player } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"
    const passiveTokens = 1 + Math.min(5, Math.floor((player.daycare?.token || 0) / 10)) * 2

    return (
        <Flex
            w={220}
            backgroundColor={bgColor}
            borderRadius={8}
            direction="column"
            alignItems="center"
        >
            <Badge textAlign="center" w="full" py={4}>
                {t('header.passiveEconomy')}
            </Badge>
            <Text fontSize="xx-small" color="gray.500" px={3} pt={2} textAlign="center">
                {t('header.passiveEconomyDesc')}
            </Text>
            <Flex direction="column" gap={1} py={3} px={4}>
                <Center gap={2}>
                    <Text fontWeight="bold" fontSize="sm" color="white">+{passiveTokens}</Text>
                    <Image src={tokenIcon} w="18px" />
                </Center>
                <Center gap={2}>
                    <Text fontWeight="bold" fontSize="sm" color="white">+1</Text>
                    <Image src={pokeballIcon} w="18px" />
                </Center>
            </Flex>
        </Flex>
    )
}
