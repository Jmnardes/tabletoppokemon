import { useContext, useEffect, useState } from "react";
import { Button, Center, Image, Text } from "@chakra-ui/react";

import PlayerContext from "../../../../Contexts/PlayerContext";

import greatballIcon from '../../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../../assets/images/pokeballs/masterball.png'
import coinIcon from '../../../../assets/images/game/coin.png'
import starIcon from '../../../../assets/images/game/star.png'
import crownIcon from '../../../../assets/images/game/crown.png'
import buyIcon from '../../../../assets/images/game/buy.png'

export default function PokeShop() {
    const { 
        player,
        game,
        updateGame,
        setPlayer,
    } = useContext(PlayerContext)
    const [coins, setCoins] = useState(player.currency.coins)
    const [stars, setStars] = useState(player.currency.stars)
    const [crowns, setCrowns] = useState(player.currency.crowns)
    const [pokeball, setPokeball] = useState(player.balls.pokeball)
    const [greatball, setGreatball] = useState(player.balls.greatball)
    const [ultraball, setUltraball] = useState(player.balls.ultraball)
    const [masterball, setMasterball] = useState(player.balls.masterball)

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

    const TableItem = ({ title, price, itemIcon, setter }) => {
        return (
            <Center flexDirection="row" w="100%" justifyContent="space-between" mb={2}>
                <Image src={itemIcon} title={title} w="20px" />
                <Center ml={12} minW={20} justifyContent="start">
                    <Image src={coinIcon} title="Coin" w="20px" mr={2} />
                    <Text>{price}</Text>
                </Center>
                <Button
                    isDisabled={coins < price}
                    onClick={() => {
                        setter(old => old + 1)
                        setCoins(old => old - price)
                    }}
                ><BuyButton/></Button>
            </Center>
        )
    }

    useEffect(() => {
        if(game.updateShop === true) {
            setPlayer(old => (
                {...old, balls: {
                    pokeball: pokeball,
                    greatball: greatball,
                    ultraball: ultraball,
                    masterball: masterball,
                }, currency: {
                    coins: coins,
                    stars: stars,
                    crowns: crowns,
                }}
            ))
            updateGame({ updateShop: false, openPokeShop: false })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.updateShop])

    return (
        <>
            <Center mb={4}>
                {coins > 0 && <ItemComponent icon={coinIcon} desc={'Coin'} counter={coins} />}
                {stars > 0 && <ItemComponent icon={starIcon} desc={'Poke Star'} counter={stars} />}
                {crowns > 0 && <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={crowns} />}
                {pokeball > 0 && <ItemComponent icon={greatballIcon} desc={'Poke Ball'} counter={pokeball} />}
                {greatball > 0 && <ItemComponent icon={superballIcon} desc={'Great Ball'} counter={greatball} />}
                {ultraball > 0 && <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={ultraball} />}
                {masterball > 0 && <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={masterball} />}
            </Center>
            
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-between" mb={4}>
                    <Text fontWeight="bold">Product</Text>
                    <Text fontWeight="bold" mr={12}>Cost</Text>
                    <Text fontWeight="bold" textAlign="center" mr={4}>Buy</Text>
                </Center>

                <TableItem 
                    title={'Poke Ball'}
                    price={1}
                    scaling={0}
                    itemIcon={greatballIcon}
                    setter={setPokeball}
                />

                <TableItem 
                    title={'Great Ball'}
                    price={2}
                    itemIcon={superballIcon}
                    setter={setGreatball}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={5}
                    itemIcon={ultraballIcon}
                    setter={setUltraball}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={30}
                    itemIcon={masterballIcon}
                    setter={setMasterball}
                />

                <TableItem 
                    title={'Poke Star'}
                    price={20}
                    itemIcon={starIcon}
                    setter={setStars}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={50}
                    itemIcon={crownIcon}
                    setter={setCrowns}
                />

                <Center flexDirection="row" w="100%" justifyContent="space-between" mb={2}>
                    <Image src={crownIcon} title="Poke Crown" w="20px" />
                    <Center ml={12} minW={20} justifyContent="start">
                        <Image src={starIcon} title="Coin" w="20px" mr={2} />
                        <Text>3</Text>
                    </Center>
                    <Button
                        isDisabled={stars < 3}
                        onClick={() => {
                            setCrowns(old => old + 1)
                            setStars(old => old - 3)
                        }}
                    ><BuyButton/></Button>
                </Center>
            </Center>
        </>
    )
}