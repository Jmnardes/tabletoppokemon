import { useContext } from "react";
import { Center, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import PlayerContext from "@Contexts/PlayerContext";

import tokenIcon from '@assets/images/game/coin.png'
import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'

export default function DayCareShop() {
    const { player, emit, setLoading } = useContext(PlayerContext)

    const handleBuyItem = (item, price) => {
        setLoading({ loading: true, text: `Buying ${item}...` })
        emit('daycare-buy-item', { item, price })
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