import { Badge, Box, Center, Flex, Image, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";
import BadgeCollectionTooltip from "./Buttons/BadgeCollection/BadgeCollectionModal";
import TaskBoardTooltip from "./Trainer/TaskBoardTooltip";
import PassiveEconomyTooltip from "./Trainer/PassiveEconomyTooltip";
import { FaExclamationCircle } from "react-icons/fa";
import crownIcon from '@assets/images/game/crown.png';
import clockIcon from '@assets/images/game/clock.png';
import shopIcon from '@assets/images/game/shop.png';

import bagIcon from '@assets/images/game/bag.png';
import gymIconFallback from '@assets/images/game/crown.png';
import dayCareIcon from '@assets/images/game/heart_ball.png';
import fightIcon from '@assets/images/training/dummy.png';
import chipIcon from '@assets/images/game/chip.png';
import farmIcon from '@assets/images/farm/sprout.png';
import craftIcon from '@assets/images/craft/machine-on.png';
import stepsIcon from '@assets/images/game/direction.png';
import settingsIcon from '@assets/images/game/settings.png';

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import lureIcon from '@assets/images/items/lure.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'
import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'

const StatItem = ({ icon, title, value }) => (
    <Center mx={1}>
        <Text alignSelf="end" fontSize="3xs" mr={0.5}>{value}x</Text>
        <Image src={icon} title={title} w="20px" />
    </Center>
)

export default function GameHeader() {
    const { player, game, session, activeTab, setActiveTab, farm, craft, gym, nextGym } = useContext(PlayerContext)

    const getBadgeIcon = (badgeName) => {
        if (!badgeName) return null
        const iconName = badgeName.toLowerCase().replace(/\s+/g, '_')
        try {
            return require(`@assets/images/badges/${iconName}.png`)
        } catch (e) {
            return null
        }
    }
    const displayGym = gym || nextGym
    const gymIcon = (displayGym && getBadgeIcon(displayGym.badge)) || gymIconFallback
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const bgColor = colorMode === 'light' ? "gray.200" : "gray.650"
    const buttonSize = "44px"
    const iconSize = "34px"

    const tabButton = (tab, icon, title, extraProps = {}) => {
        const isActive = activeTab === tab
        return (
            <Center
                as="button"
                onClick={() => setActiveTab(tab)}
                disabled={isActive}
                w={buttonSize}
                h={buttonSize}
                borderRadius={isActive ? "8px 8px 0 0" : "8px"}
                bg={isActive ? (colorMode === 'light' ? "gray.200" : "gray.650") : "transparent"}
                border="none"
                mb={isActive ? "-2px" : "0"}
                pb={isActive ? "2px" : "0"}
                opacity={isActive ? 1 : 0.75}
                cursor={isActive ? "default" : "pointer"}
                transition="all 0.15s ease"
                _hover={!isActive ? { opacity: 1 } : {}}
                position="relative"
                zIndex={isActive ? 2 : 1}
                {...extraProps}
            >
                <Image
                    src={icon}
                    title={title}
                    w={iconSize}
                    h={iconSize}
                    objectFit="contain"
                    pointerEvents="none"
                />
            </Center>
        )
    }

    return (
        <Center py={0} pr={0} display="flex" justifyContent="space-between" backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}>
            <Center flex="1" justifyContent={"start"} data-tutorial="player-info">
                <Badge
                    title={player.status.trainerName}
                    maxW={48} p={2} px={4} ml={4}
                    backgroundColor={bgColor}
                    borderRadius={6}
                    isTruncated
                    fontWeight="bold"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                >
                    {player.status.trainerName}
                </Badge>
                {!game.hasEnded && (
                    <Tooltip label={t('header.currentTurn')} fontSize="xs">
                        <Flex alignItems="center" mx={2}>
                            <Image src={clockIcon} w="20px" />
                            <Text ml={1} fontSize="2xs">{session.turns || 0}</Text>
                        </Flex>
                    </Tooltip>
                )}
                {!game.hasEnded && (
                    <Tooltip label={<TaskBoardTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <FaExclamationCircle size={20} color="orange" />
                        </Flex>
                    </Tooltip>
                )}
                {!game.hasEnded && (
                    <Tooltip label={<PassiveEconomyTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <Image src={shopIcon} w="20px" />
                        </Flex>
                    </Tooltip>
                )}
                {!game.hasEnded && (
                    <Tooltip label={<BadgeCollectionTooltip />} p={0} borderRadius={8} background="none">
                        <Flex alignItems="center" mx={2} cursor="pointer">
                            <Image src={crownIcon} w="24px" />
                            <Text ml={1} fontSize="2xs">{player.status.badges || 0} / {session.badgesToWin || 8}</Text>
                        </Flex>
                    </Tooltip>
                )}
            </Center>
            {!game.hasEnded && (
                <Flex flex="1" alignItems="center" gap={0} flexWrap="wrap" justifyContent="center" data-tutorial="quick-items">
                    <StatItem icon={tokenIcon} title={t('items.daycareTokens')} value={player.daycare?.token ?? 0} />
                    <StatItem icon={dustIcon} title={t('items.dust')} value={player.items.dust} />
                    <StatItem icon={lureIcon} title={t('items.incense')} value={player.items.incense} />

                    <Box w="1px" h="20px" bg="gray.500" mx={1} />

                    <StatItem icon={potionIcon} title="Potion" value={player.potions?.potion ?? 0} />
                    <StatItem icon={superPotionIcon} title="Super Potion" value={player.potions?.superPotion ?? 0} />
                    <StatItem icon={hyperPotionIcon} title="Hyper Potion" value={player.potions?.hyperPotion ?? 0} />

                    <Box w="1px" h="20px" bg="gray.500" mx={1} />

                    <StatItem icon={pokeballIcon} title="Pokeball" value={player.balls.pokeball} />
                    <StatItem icon={greatballIcon} title="Greatball" value={player.balls.greatball} />
                    <StatItem icon={ultraballIcon} title="Ultraball" value={player.balls.ultraball} />
                    <StatItem icon={masterballIcon} title="Masterball" value={player.balls.masterball} />
                </Flex>
            )}
            <Flex flex="1" alignItems="end" justifyContent="end" gap="0.65rem" pb={0} pr={2} data-tutorial="tab-buttons">
                {tabButton('bag', bagIcon, t('action.bag'))}
                {tabButton('daycare', dayCareIcon, t('action.dayCare'))}
                {tabButton('training', fightIcon, t('action.trainingCamp'))}
                {farm && tabButton('farm', farmIcon, t('action.berryFarm'))}
                {craft && tabButton('craft', craftIcon, t('action.craft'))}
                {player.augments?.length > 0 && tabButton('augments', chipIcon, t('action.augments'))}
                {tabButton('journey', stepsIcon, t('action.journey'))}
                {tabButton('gym', gymIcon, displayGym ? displayGym.badge : t('action.gym'))}
                {tabButton('settings', settingsIcon, t('settings.title'))}
            </Flex>
        </Center>
    )
}