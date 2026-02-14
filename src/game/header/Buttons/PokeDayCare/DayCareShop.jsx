import { useContext } from "react";
import { Center, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import PlayerContext from "@Contexts/PlayerContext";
import { getBerryIcon } from "@utils/berryIcon";

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'

export default function DayCareShop() {
    const { player, emit, setLoading, setPlayer, setBerries, handleToast } = useContext(PlayerContext)

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
            if (result?.berries) {
                setBerries(result.berries)
            }

            // Mostra toast baseado no item comprado
            const toastConfig = {
                status: 'info',
                duration: 4000,
            }

            switch (result.item) {
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
                case 'berry':
                    if (result.berry) {
                        handleToast({
                            ...toastConfig,
                            title: result.berry.name || 'Berry',
                            description: 'A new Berry has been added to your bag',
                            icon: <Image src={getBerryIcon(result.berry.type)} w={12} />
                        })
                    }
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
            <Tr>
                <Td>
                    <Image src={icon} alt={name} boxSize={10} />
                </Td>
                <Td fontSize={"2xl"} textAlign={"center"}>{price}x</Td>
                <Td>
                    <Image 
                        src={tokenIcon} alt={"Daycare Token"}
                        _hover={{ cursor: 'pointer', opacity: 0.5 }}
                        opacity={price > player.daycare.token ? 0.3 : 1}
                        pointerEvents={price > player.daycare.token ? 'none' : 'auto'}
                        onClick={() => handleBuyItem(item, price)}
                    />
                </Td>
            </Tr>
        )
    }

    return (
        <Center flexDirection="column">
            <Text fontSize="2xl" mb={4}>Daycare Shop</Text>
            <Center flex justifyContent={"space-around"} w={"full"} p={4}>
                <Center flex flexDir={"column"}>
                    <Text fontSize={"2xl"} mb={8}>Daycare Tokens</Text>
                    <Center>
                        <Text fontSize={"4xl"} mr={2}>{player.daycare.token}x</Text>
                        <Image src={tokenIcon} alt={"Daycare Token"} w={24} />
                    </Center>
                </Center>
                <Table variant="simple" w={42}>
                    <Thead>
                        <Tr>
                            <Th>Item</Th>
                            <Th>Cost</Th>
                            <Th>Buy</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
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
                            icon={berryIcon}
                            name={'Berry'}
                            item={'berry'}
                            price={3}
                        ></TableItem>
                        <TableItem
                            icon={ultraballIcon}
                            name={'Ultraball'}
                            item={'ultraball'}
                            price={4}
                        ></TableItem>
                        {/* <TableItem
                            icon={eggIcon}
                            name={'Pokemon egg'}
                            price={5}
                        ></TableItem> */}
                    </Tbody>
                </Table>
            </Center>
        </Center>
    )
}