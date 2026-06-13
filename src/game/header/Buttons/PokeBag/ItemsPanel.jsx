import { useContext, useEffect, useState } from "react"
import { Center, Divider, Flex, Image, Text, Tooltip } from "@chakra-ui/react"

import PlayerContext from "@context/PlayerContext"
import { getBerryIcon } from "@utils/berryIcon"

import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png'
import pokeboxIcon from '@assets/images/box/pokebox-closed.png'
import greatboxIcon from '@assets/images/box/greatbox-closed.png'
import ultraboxIcon from '@assets/images/box/ultrabox-closed.png'
import { useTranslation } from "react-i18next"

const BOX_NAMES = {
    pokebox: 'box.pokebox',
    greatbox: 'box.greatbox',
    ultrabox: 'box.ultrabox',
}

const BOX_COLORS = {
    pokebox: 'green.600',
    greatbox: 'blue.600',
    ultrabox: 'purple.600',
}

const BOX_IMAGES = {
    pokebox: pokeboxIcon,
    greatbox: greatboxIcon,
    ultrabox: ultraboxIcon,
}

export default function ItemsPanel({ onSelectItem }) {
    const { player, berries } = useContext(PlayerContext)
    const { t } = useTranslation()
    const [items, setItems] = useState([{ type: 'dust', amount: player.items.dust }, ...berries])

    const boxes = [
        { type: 'pokebox', amount: player.boxes?.pokebox || 0 },
        { type: 'greatbox', amount: player.boxes?.greatbox || 0 },
        { type: 'ultrabox', amount: player.boxes?.ultrabox || 0 },
    ].filter(b => b.amount > 0)

    useEffect(() => {
        setItems([{ type: 'dust', amount: player.items.dust }, ...berries])
    }, [player.items.dust, berries])

    const ItemSlot = ({ item, isDust }) => {
        const name = isDust ? t('items.dust') : item.name
        const icon = isDust ? dustIcon : getBerryIcon(item.type)
        const description = isDust
            ? t('items.dustDesc')
            : (item.effect.description + ` ${t('items.duration', { turns: item.turns })}`)
        const isDisabled = item.amount === 0

        return (
            <Tooltip
                label={
                    <Center flexDir="column" gap={2} p={2}>
                        <Text fontWeight="bold">{name}</Text>
                        <Image
                            src={icon}
                            fallbackSrc={berryIcon}
                            w={10}
                        />
                        <Text fontSize="xs" textAlign="center">{description}</Text>
                        {!isDust && (
                            <Text fontSize="2xs" color="gray.300">{t('items.turnsLeft', { turns: item.turns })}</Text>
                        )}
                    </Center>
                }
                p={3}
                borderRadius={8}
            >
                <Center
                    p={1}
                    borderRadius={6}
                    backgroundColor="gray.600"
                    cursor={isDisabled ? "not-allowed" : "pointer"}
                    opacity={isDisabled ? 0.4 : 1}
                    _hover={!isDisabled ? { opacity: 0.8, backgroundColor: "gray.500" } : undefined}
                    onClick={!isDisabled ? () => onSelectItem(item, isDust) : undefined}
                    position="relative"
                    w="42px"
                    h="42px"
                >
                    <Image
                        src={icon}
                        fallbackSrc={berryIcon}
                        w={9}
                    />
                    <Text fontSize="3xs" position="absolute" bottom={0} right={1}>{item.amount}</Text>
                </Center>
            </Tooltip>
        )
    }

    const BoxSlot = ({ box }) => {
        const name = t(BOX_NAMES[box.type])
        const bgColor = BOX_COLORS[box.type]

        return (
            <Tooltip
                label={
                    <Center flexDir="column" gap={2} p={2}>
                        <Text fontWeight="bold">{name}</Text>
                        <Text fontSize="xs" textAlign="center">{t('box.openDesc')}</Text>
                    </Center>
                }
                p={3}
                borderRadius={8}
            >
                <Center
                    p={1}
                    borderRadius={6}
                    backgroundColor={bgColor}
                    cursor="pointer"
                    _hover={{ opacity: 0.8, transform: 'scale(1.05)' }}
                    onClick={() => onSelectItem(box, false, true)}
                    position="relative"
                    w="42px"
                    h="42px"
                >
                    <Image src={BOX_IMAGES[box.type]} w={8} />
                    <Text fontSize="3xs" position="absolute" bottom={0} right={1} fontWeight="bold">{box.amount}</Text>
                </Center>
            </Tooltip>
        )
    }

    return (
        <Flex gap={1} alignItems="center" flexWrap="wrap">
            {boxes.map((box) => (
                <BoxSlot key={box.type} box={box} />
            ))}
            {boxes.length > 0 && items.filter(item => item.type !== 'dust' || item.amount > 0).length > 0 && (
                <Divider orientation="vertical" h="30px" mx={1} />
            )}
            {items.filter(item => item.type !== 'dust' || item.amount > 0).map((item, index) => (
                <ItemSlot
                    key={index}
                    item={item}
                    isDust={item.type === 'dust'}
                />
            ))}
        </Flex>
    )
}
