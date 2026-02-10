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
    const { player, emit, setLoading, updateDaycareToken, updateBall, updateItem, setBerries, handleToast } = useContext(PlayerContext)

    const handleBuyItem = async (item, price) => {
        setLoading({ loading: true, text: `Buying ${item}...` })
        
        try {
            // Aguarda resposta do servidor com os dados do item comprado
            const result = await emit('daycare-buy-item', { item, price })
            
            // Atualiza estado local baseado na resposta do servidor
            await updateDaycareToken(-result.price)

            // Atualiza inventário e mostra toast baseado no item
            switch (result.item) {
                case 'greatball':
                    await updateBall(1, result.item)
                    handleToast({
                        title: 'Greatball',
                        description: 'A new Greatball has been added to your bag',
                        status: 'info',
                        duration: 4000,
                        icon: <Image src={greatballIcon} w={12} />
                    })
                    break
                case 'ultraball':
                    await updateBall(1, result.item)
                    handleToast({
                        title: 'Ultraball',
                        description: 'A new Ultraball has been added to your bag',
                        status: 'info',
                        duration: 4000,
                        icon: <Image src={ultraballIcon} w={12} />
                    })
                    break
                case 'dust':
                    await updateItem(1, result.item)
                    handleToast({
                        title: 'Dust',
                        description: 'A new Dust has been added to your bag',
                        status: 'info',
                        duration: 4000,
                        icon: <Image src={dustIcon} w={12} />
                    })
                    break
                case 'berry':
                    // Atualiza lista de berries com a resposta do servidor
                    if (result.berries && result.berry) {
                        setBerries(result.berries)
                        handleToast({
                            title: result.berry.name || 'Berry',
                            description: 'A new Berry has been added to your bag',
                            status: 'info',
                            duration: 4000,
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