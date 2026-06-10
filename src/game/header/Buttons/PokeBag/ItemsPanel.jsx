import { useContext, useEffect, useState } from "react"
import { Box, Center, Flex, Image, Text, Tooltip } from "@chakra-ui/react"

import PlayerContext from "@context/PlayerContext"
import { getBerryIcon } from "@utils/berryIcon"

import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png'

export default function ItemsPanel({ onSelectItem }) {
    const { player, berries } = useContext(PlayerContext)
    const [items, setItems] = useState([{ type: 'dust', amount: player.items.dust }, ...berries])

    useEffect(() => {
        setItems([{ type: 'dust', amount: player.items.dust }, ...berries])
    }, [player.items.dust, berries])

    const ItemSlot = ({ item, isDust }) => {
        const name = isDust ? 'Dust' : item.name
        const icon = isDust ? dustIcon : getBerryIcon(item.type)
        const description = isDust
            ? "Grants +1 EXP at the end of each turn. Only 1 dust is consumed per turn. Can be stacked up to 5."
            : (item.effect.description + ` Duration: ${item.turns} turns.`)
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
                            <Text fontSize="2xs" color="gray.300">{item.turns} turns</Text>
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
                    w={10}
                    h={10}
                >
                    <Image
                        src={icon}
                        fallbackSrc={berryIcon}
                        w={8}
                    />
                    <Text fontSize="3xs" position="absolute" bottom={0} right={1}>{item.amount}</Text>
                </Center>
            </Tooltip>
        )
    }

    return (
        <Box w="100%">
            <Text fontSize="2xs" fontWeight="bold" textAlign="center" mb={1}>Items</Text>
            <Flex flexDir="column" gap={1} overflowY="auto" maxH="50vh" alignItems="center">
                {items.filter(item => item.type !== 'dust' || item.amount > 0).map((item, index) => (
                    <ItemSlot
                        key={index}
                        item={item}
                        isDust={item.type === 'dust'}
                    />
                ))}
            </Flex>
        </Box>
    )
}
