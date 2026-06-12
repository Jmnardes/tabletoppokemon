import { useContext } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

import PlayerContext from "@context/PlayerContext";
import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import lureIcon from '@assets/images/items/lure.png'
import { useTranslation } from "react-i18next"

export default function TrainerBar() {
    const { player, game } = useContext(PlayerContext)
    const { t } = useTranslation()
    
    return (
        <>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={tokenIcon}
                    title={t('items.daycareTokens')}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.daycare?.token ?? 0}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={dustIcon}
                    title={t('items.dust')}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.items.dust}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={lureIcon}
                    title={t('items.shinyIncense')}
                    w="24px"
                ></Image>
                <Text fontSize='2xs' title={t('items.shinyChance', { chance: player.items.incense + 1 })} cursor="pointer" ml={2}>{player.items.incense}</Text>
            </Flex>
        </>
    )
}