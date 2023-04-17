import { Button, Center, Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'
import coinIcon from '../../../assets/images/game/coin.png'
import starIcon from '../../../assets/images/game/star.png'
import crownIcon from '../../../assets/images/game/crown.png'
import shopIcon from '../../../assets/images/game/shop.png'
import buyIcon from '../../../assets/images/game/buy.png'
import eggIcon from '../../../assets/images/items/egg.png'
import incubatorGreatIcon from '../../../assets/images/items/incubator-great.png'
import { parseNumberToNatural } from "../../../util";
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function PokeShop() {
    const { player, updateItem, updateCurrency, updateBall, game } = useContext(PlayerContext)

    function coinPerTurn(turns, multiple) {return parseNumberToNatural(turns, 10) * multiple}

    const BuyButton = () => {
        return <Image src={buyIcon} title={'Buy'} w="24px"/>
    }

    const ItemComponent = ({ icon, desc, counter }) => {
        return (
            <Center mx={2}>
                <Image src={icon} title={desc} w="20px"/>
                <Text ml={1}>{counter}</Text>
            </Center>
        )
    }

    const TableItem = ({ title, price, scaling, itemType, setter, itemIcon }) => {
        return (
            <Center flexDirection="row" w="100%" justifyContent="space-around" mb={2}>
                {/* <Text w="200px">{title}</Text> */}
                <Image src={itemIcon} title={title} w="20px" />
                <Center>
                    <Image src={coinIcon} title="Coin" w="20px" mr={2} />
                    <Text w="80px">{price + coinPerTurn(game.turn, scaling)}</Text>
                </Center>
                <Button 
                    w="60px"
                    isDisabled={player.currency.coins < (price + coinPerTurn(game.turn, scaling))}
                    onClick={() => {
                        setter(1, itemType)
                        updateCurrency(-(price + coinPerTurn(game.turn, scaling)), 'coins')
                    }}
                ><BuyButton/></Button>
            </Center>
        )
    }

    return (
        <PokeModal title={'Shop'} button={
            <Image
                src={shopIcon} 
                title={'Shop'}
                w="32px"
            ></Image>
        }>
            <Center mb={4}>

                {player.currency.coins > 0 && <ItemComponent icon={coinIcon} desc={'Coin'} counter={player.currency.coins} />}
                
                {player.currency.stars > 0 && <ItemComponent icon={starIcon} desc={'Poke Star'} counter={player.currency.stars} />}

                {player.currency.crowns > 0 && <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={player.currency.crowns} />}

                {/* {player.items.pokemonEgg > 0 && <ItemComponent icon={eggIcon} desc={'Pokemon Egg'} counter={player.items.pokemonEgg} />} */}

                {/* {player.items.incubator > 0 && <ItemComponent icon={incubatorGreatIcon} desc={'Incubator'} counter={player.items.incubator} />} */}

                {player.balls.pokeball > 0 && <ItemComponent icon={greatballIcon} desc={'Poke Ball'} counter={player.balls.pokeball} />}

                {player.balls.greatball > 0 && <ItemComponent icon={superballIcon} desc={'Great Ball'} counter={player.balls.greatball} />}

                {player.balls.ultraball > 0 && <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={player.balls.ultraball} />}

                {player.balls.masterball > 0 && <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={player.balls.masterball} />}
                
            </Center>
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={4}>
                    <Text w="200px" fontWeight="bold">Product</Text>
                    <Text w="80px" fontWeight="bold">Cost</Text>
                    <Text w="60px" fontWeight="bold" textAlign="center">Buy</Text>
                </Center>

                <TableItem 
                    title={'Poke Ball'}
                    price={2}
                    scaling={1}
                    itemType={'pokeball'}
                    setter={updateBall}
                    itemIcon={greatballIcon}
                />

                <TableItem 
                    title={'Great Ball'}
                    price={4}
                    scaling={2}
                    itemType={'greatball'}
                    setter={updateBall}
                    itemIcon={superballIcon}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={6}
                    scaling={3}
                    itemType={'ultraball'}
                    setter={updateBall}
                    itemIcon={ultraballIcon}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={20}
                    scaling={5}
                    itemType={'masterball'}
                    setter={updateBall}
                    itemIcon={masterballIcon}
                />
                
                {/* <TableItem 
                    title={'Incubator'}
                    price={5}
                    scaling={7}
                    itemType={'incubator'}
                    setter={updateItem}
                    itemIcon={incubatorGreatIcon}
                /> */}

                <TableItem 
                    title={'Poke Star'}
                    price={28}
                    scaling={7}
                    itemType={'star'}
                    setter={updateCurrency}
                    itemIcon={starIcon}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={72}
                    scaling={18}
                    itemType={'crown'}
                    setter={updateCurrency}
                    itemIcon={crownIcon}
                />

                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={2}>
                    <Image src={crownIcon} title="Poke Crown" w="20px" />
                    <Center>
                        <Image src={starIcon} title="Coin" w="20px" mr={2} />
                        <Text w="80px">3</Text>
                    </Center>
                    <Button 
                        w="60px"
                        isDisabled={player.currency.stars < 3}
                        onClick={() => {
                            updateCurrency(1, 'crowns')
                            updateCurrency(-3, 'stars')
                        }}
                    ><BuyButton/></Button>
                </Center>
            </Center>
        </PokeModal>
    )
}