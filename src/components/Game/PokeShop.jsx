import { Button, Center, Image, Text } from "@chakra-ui/react";
import greatballIcon from '../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../assets/images/pokeballs/masterball.png'
import coinIcon from '../../assets/images/game/coin.png'
import starIcon from '../../assets/images/game/star.png'
import crownIcon from '../../assets/images/game/crown.png'
import buyIcon from '../../assets/images/game/buy.png'
import eggIcon from '../../assets/images/items/egg.png'
import incubatorGreatIcon from '../../assets/images/items/incubator-great.png'
import { parseNumberToNatural } from "../../util";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "../../Contexts/PlayerContext";

export default function PokeShop() {
    const { player, session, updateGame, game, setPlayer } = useContext(PlayerContext)
    const [myBalls, setMyBalls] = useState(player.balls)
    const [myCurrency, setMyCurrency] = useState(player.currency)
    const [myItems, setMyItems] = useState(player.items)

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
        const priceScaled = price + coinPerTurn(session.turns, scaling)
        return (
            <Center flexDirection="row" w="100%" justifyContent="space-between" mb={2}>
                {/* <Text w="200px">{title}</Text> */}
                <Image src={itemIcon} title={title} w="20px" />
                <Center ml={12} minW={20} justifyContent="start">
                    <Image src={coinIcon} title="Coin" w="20px" mr={2} />
                    <Text>{priceScaled}</Text>
                </Center>
                <Button
                    isDisabled={myCurrency.coins < (priceScaled)}
                    onClick={() => {
                        setter(old => (
                            {...old, [itemType]: old[itemType] + 1}
                        ))
                        setMyCurrency(old => (
                            {...old, coins: old.coins -(priceScaled)}
                        ))
                    }}
                ><BuyButton/></Button>
            </Center>
        )
    }

    useEffect(() => {
        if(game.updateShop === true) {
            setPlayer(old => (
                {...old, balls: myBalls, currency: myCurrency, items: myItems}
            ))
            updateGame({ updateShop: false, openPokeShop: false })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.updateShop])

    return (
        <>
            <Center mb={4}>

                {myCurrency.coins > 0 && <ItemComponent icon={coinIcon} desc={'Coin'} counter={myCurrency.coins} />}
                
                {myCurrency.stars > 0 && <ItemComponent icon={starIcon} desc={'Poke Star'} counter={myCurrency.stars} />}

                {myCurrency.crowns > 0 && <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={myCurrency.crowns} />}

                {/* {myItems.pokemonEgg > 0 && <ItemComponent icon={eggIcon} desc={'Pokemon Egg'} counter={myItems.pokemonEgg} />} */}

                {/* {myItems.incubator > 0 && <ItemComponent icon={incubatorGreatIcon} desc={'Incubator'} counter={myItems.incubator} />} */}

                {myBalls.pokeball > 0 && <ItemComponent icon={greatballIcon} desc={'Poke Ball'} counter={myBalls.pokeball} />}

                {myBalls.greatball > 0 && <ItemComponent icon={superballIcon} desc={'Great Ball'} counter={myBalls.greatball} />}

                {myBalls.ultraball > 0 && <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={myBalls.ultraball} />}

                {myBalls.masterball > 0 && <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={myBalls.masterball} />}
                
            </Center>
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-between" mb={4}>
                    <Text fontWeight="bold">Product</Text>
                    <Text fontWeight="bold" mr={12}>Cost</Text>
                    <Text fontWeight="bold" textAlign="center" mr={4}>Buy</Text>
                </Center>

                <TableItem 
                    title={'Poke Ball'}
                    price={0}
                    scaling={0}
                    // price={2}
                    // scaling={1}
                    itemType={'pokeball'}
                    setter={setMyBalls}
                    itemIcon={greatballIcon}
                />

                <TableItem 
                    title={'Great Ball'}
                    price={2}
                    scaling={0}
                    // price={4}
                    // scaling={2}
                    itemType={'greatball'}
                    setter={setMyBalls}
                    itemIcon={superballIcon}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={5}
                    scaling={0}
                    // price={6}
                    // scaling={3}
                    itemType={'ultraball'}
                    setter={setMyBalls}
                    itemIcon={ultraballIcon}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={30}
                    scaling={0}
                    // price={20}
                    // scaling={5}
                    itemType={'masterball'}
                    setter={setMyBalls}
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
                    price={20}
                    scaling={0}
                    // price={28}
                    // scaling={7}
                    itemType={'star'}
                    setter={setMyCurrency}
                    itemIcon={starIcon}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={50}
                    scaling={0}
                    // price={72}
                    // scaling={18}
                    itemType={'crown'}
                    setter={setMyCurrency}
                    itemIcon={crownIcon}
                />

                <Center flexDirection="row" w="100%" justifyContent="space-between" mb={2}>
                    <Image src={crownIcon} title="Poke Crown" w="20px" />
                    <Center ml={12} minW={20} justifyContent="start">
                        <Image src={starIcon} title="Coin" w="20px" mr={2} />
                        <Text>3</Text>
                    </Center>
                    <Button
                        isDisabled={myCurrency.stars < 3}
                        onClick={() => {
                            setMyCurrency(old => (
                                {...old, crowns: old.crowns + 1, stars: old.stars - 3}
                            ))
                        }}
                    ><BuyButton/></Button>
                </Center>
            </Center>
        </>
    )
}