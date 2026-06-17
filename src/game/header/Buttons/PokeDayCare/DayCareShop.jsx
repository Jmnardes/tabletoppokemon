import { useContext } from "react";
import { Center, Image, Table, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'
import { useTranslation } from "react-i18next"

const ITEM_DESCRIPTIONS = {
    pokeball: 'daycare.desc.pokeball',
    dust: 'daycare.desc.dust',
    greatball: 'daycare.desc.greatball',
    ultraball: 'daycare.desc.ultraball',
    potion: 'daycare.desc.potion',
    superPotion: 'daycare.desc.superPotion',
    hyperPotion: 'daycare.desc.hyperPotion',
}

export default function DayCareShop() {
    const { player, emit, setLoading, setPlayer, handleToast } = useContext(PlayerContext)
    const { t } = useTranslation()

    const handleBuyItem = async (item, price) => {
        setLoading({ loading: true, text: `Buying ${item}...` })
        
        try {
            const result = await emit('daycare-buy-item', { item, price })
            
            if (result?.balls) {
                setPlayer(prev => ({ ...prev, balls: result.balls }))
            }
            if (result?.items) {
                setPlayer(prev => ({ ...prev, items: result.items }))
            }
            if (result?.daycare) {
                setPlayer(prev => ({ ...prev, daycare: result.daycare }))
            }
            if (result?.potions) {
                setPlayer(prev => ({ ...prev, potions: result.potions }))
            }

            // Mostra toast baseado no item comprado
            const toastConfig = {
                status: 'info',
                duration: 4000,
            }

            switch (result.item) {
                case 'pokeball':
                    handleToast({
                        ...toastConfig,
                        title: 'Pokeball',
                        description: 'A new Pokeball has been added to your bag',
                        icon: <Image src={pokeballIcon} w={12} />
                    })
                    break
                case 'greatball':
                    handleToast({
                        ...toastConfig,
                        title: 'Greatball',
                        description: 'A new Greatball has been added to your bag',
                        icon: <Image src={greatballIcon} w={12} />
                    })
                    break
                case 'ultraball':
                    handleToast({
                        ...toastConfig,
                        title: 'Ultraball',
                        description: 'A new Ultraball has been added to your bag',
                        icon: <Image src={ultraballIcon} w={12} />
                    })
                    break
                case 'dust':
                    handleToast({
                        ...toastConfig,
                        title: 'Dust',
                        description: 'A new Dust has been added to your bag',
                        icon: <Image src={dustIcon} w={12} />
                    })
                    break
                case 'potion':
                    handleToast({
                        ...toastConfig,
                        title: 'Potion',
                        description: 'A Potion has been added to your bag',
                        icon: <Image src={potionIcon} w={12} />
                    })
                    break
                case 'superPotion':
                    handleToast({
                        ...toastConfig,
                        title: 'Super Potion',
                        description: 'A Super Potion has been added to your bag',
                        icon: <Image src={superPotionIcon} w={12} />
                    })
                    break
                case 'hyperPotion':
                    handleToast({
                        ...toastConfig,
                        title: 'Hyper Potion',
                        description: 'A Hyper Potion has been added to your bag',
                        icon: <Image src={hyperPotionIcon} w={12} />
                    })
                    break
                default:
                    break
            }

            setLoading({ loading: false })
        } catch (error) {
            setLoading({ loading: false })
            handleToast({
                id: 'buy-item-error',
                title: 'Error buying item',
                description: error.message || 'Connection error. Please try again.',
                status: 'error',
                position: 'top'
            })
            console.error('Error buying daycare item:', error)
        }
    }

    const TableItem = ({ icon, name, item, price }) => {
        return (
            <Tooltip
                label={
                    <Center flexDir="column" gap={1} p={2}>
                        <Image src={icon} w={8} />
                        <Text fontWeight="bold">{name}</Text>
                        <Text fontSize="xs" textAlign="center">{t(ITEM_DESCRIPTIONS[item])}</Text>
                    </Center>
                }
                placement="left"
                borderRadius={8}
                p={2}
            >
            <Tr borderBottom="none" sx={{ '& td': { borderBottom: 'none' } }}>
                <Td>
                    <Image src={icon} alt={name} w="22px" h="22px" />
                </Td>
                <Td>
                    <Center
                        gap={1}
                        _hover={{ cursor: 'pointer', opacity: 0.5 }}
                        opacity={price > player.daycare.token ? 0.3 : 1}
                        pointerEvents={price > player.daycare.token ? 'none' : 'auto'}
                        onClick={() => handleBuyItem(item, price)}
                    >
                        <Text fontSize="md">{price}</Text>
                        <Image src={tokenIcon} alt={"Daycare Token"} w="20px" h="20px" />
                    </Center>
                </Td>
            </Tr>
            </Tooltip>
        )
    }

    return (
        <Center flexDirection="column" flex="1" p={4}>
            <Table variant="simple" w={42}>
                    <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th>Price</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <TableItem
                            icon={pokeballIcon}
                            name={'Pokeball'}
                            item={'pokeball'}
                            price={1}
                        ></TableItem>
                        <TableItem
                            icon={dustIcon}
                            name={'Dust'}
                            item={'dust'}
                            price={1}
                        ></TableItem>
                        <TableItem
                            icon={greatballIcon}
                            name={'Greatball'}
                            item={'greatball'}
                            price={2}
                        ></TableItem>
                        <TableItem
                            icon={ultraballIcon}
                            name={'Ultraball'}
                            item={'ultraball'}
                            price={4}
                        ></TableItem>
                        <TableItem
                            icon={potionIcon}
                            name={'Potion'}
                            item={'potion'}
                            price={3}
                        ></TableItem>
                        <TableItem
                            icon={superPotionIcon}
                            name={'Super Potion'}
                            item={'superPotion'}
                            price={5}
                        ></TableItem>
                        <TableItem
                            icon={hyperPotionIcon}
                            name={'Hyper Potion'}
                            item={'hyperPotion'}
                            price={8}
                        ></TableItem>
                        {/* <TableItem
                            icon={eggIcon}
                            name={'Pokemon egg'}
                            price={5}
                        ></TableItem> */}
                    </Tbody>
                </Table>
        </Center>
    )
}