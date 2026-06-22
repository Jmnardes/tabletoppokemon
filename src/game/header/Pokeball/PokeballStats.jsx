import { useContext } from "react";
import { Center, Image, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PlayerContext from "@context/PlayerContext";

import greatballIcon from '@assets/images/pokeballs/pokeball.png'
import superballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'

export default function PokeballStats() {
    const { player } = useContext(PlayerContext)
    const { t } = useTranslation()

    return (
        <Center mx={2}>
            <Center mx={1}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.potions?.potion ?? 0}x</Text>
                <Image src={potionIcon} title={t('consulta.itemPotion')} w="24px" />
            </Center>
            <Center mx={1}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.potions?.superPotion ?? 0}x</Text>
                <Image src={superPotionIcon} title={t('consulta.itemSuperPotion')} w="24px" />
            </Center>
            <Center mx={1}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.potions?.hyperPotion ?? 0}x</Text>
                <Image src={hyperPotionIcon} title={t('consulta.itemHyperPotion')} w="24px" />
            </Center>
            <Center mx={1} ml={3}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.pokeball}x</Text>
                <Image
                    src={greatballIcon} 
                    title={t('consulta.itemPokeball')}
                    w="24px"
                    ml={1}
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.greatball}x</Text>
                <Image
                    src={superballIcon} 
                    title={t('consulta.itemGreatball')}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.ultraball}x</Text>
                <Image
                    src={ultraballIcon} 
                    title={t('consulta.itemUltraball')}
                    w="24px"
                ></Image>
            </Center>
            <Center mx={2}>
                <Text alignSelf="end" fontSize={"3xs"} mr={0.5}>{player.balls.masterball}x</Text>
                <Image
                    src={masterballIcon} 
                    title={t('consulta.itemMasterball')}
                    w="24px"
                ></Image>
            </Center>
        </Center>
    )
}