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

export default function PokeShop({ disableShop }) {
    const { items, updateItems, currency, updateCurrency, balls, updateBalls, game } = useContext(PlayerContext)

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

    const TableItem = ({ title, price, scaling, itemType, setter, updater, itemIcon }) => {
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
                    disabled={currency.coins < (price + coinPerTurn(game.turn, scaling))}
                    onClick={() => {
                        updateCurrency({ coins: currency.coins - (price + coinPerTurn(game.turn, scaling)) })
                        setter(updater, { itemType: updater[itemType] + 1 })
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
        } disableButton={disableShop}>
            <Center mb={4}>

                {currency.coins > 0 && <ItemComponent icon={coinIcon} desc={'Coin'} counter={currency.coins} />}
                
                {currency.stars > 0 && <ItemComponent icon={starIcon} desc={'Poke Star'} counter={currency.stars} />}

                {currency.crowns > 0 && <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={currency.crowns} />}

                {items.pokemonEgg > 0 && <ItemComponent icon={eggIcon} desc={'Pokemon Egg'} counter={items.pokemonEgg} />}

                {items.incubator > 0 && <ItemComponent icon={incubatorGreatIcon} desc={'Incubator'} counter={items.incubator} />}

                {balls.pokeball > 0 && <ItemComponent icon={greatballIcon} desc={'Poke Ball'} counter={balls.pokeball} />}

                {balls.greatball > 0 && <ItemComponent icon={superballIcon} desc={'Great Ball'} counter={balls.greatball} />}

                {balls.ultraball > 0 && <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={balls.ultraball} />}

                {balls.masterball > 0 && <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={balls.masterball} />}
                
            </Center>
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={4}>
                    <Text w="200px" fontWeight="bold">Product</Text>
                    <Text w="80px" fontWeight="bold">Cost</Text>
                    <Text w="60px" fontWeight="bold" textAlign="center">Buy</Text>
                </Center>

                <TableItem 
                    title={'Poke Ball'}
                    price={4}
                    scaling={1}
                    itemType={balls.pokeball}
                    setter={updateBalls}
                    updater={balls}
                    itemIcon={greatballIcon}
                />

                <TableItem 
                    title={'Great Ball'}
                    price={8}
                    scaling={2}
                    itemType={balls.pokeball}
                    setter={updateBalls}
                    updater={balls}
                    itemIcon={superballIcon}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={12}
                    scaling={3}
                    itemType={balls.ultraball}
                    setter={updateBalls}
                    updater={balls}
                    itemIcon={ultraballIcon}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={20}
                    scaling={5}
                    itemType={balls.masterball}
                    setter={updateBalls}
                    updater={balls}
                    itemIcon={masterballIcon}
                />
                
                <TableItem 
                    title={'Incubator'}
                    price={0}
                    scaling={7}
                    itemType={items.incubator}
                    setter={updateItems}
                    updater={items}
                    itemIcon={incubatorGreatIcon}
                />

                <TableItem 
                    title={'Poke Star'}
                    price={28}
                    scaling={7}
                    itemType={currency.star}
                    setter={updateCurrency}
                    updater={currency}
                    itemIcon={starIcon}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={72}
                    scaling={18}
                    itemType={currency.crown}
                    setter={updateCurrency}
                    updater={currency}
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
                        disabled={currency.star < 3}
                        onClick={() => {
                            updateCurrency({star: currency.star - 3, crown: currency.crown + 1})
                        }}
                    ><BuyButton/></Button>
                </Center>
            </Center>
        </PokeModal>
    )
}