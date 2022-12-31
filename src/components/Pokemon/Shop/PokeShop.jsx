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
import fightIcon from '../../../assets/images/items/fight.png'
import stealIcon from '../../../assets/images/items/steal.png'
// import lureIcon from '../../../assets/images/items/lure.png'
import { parseNumberToNatural } from "../../../util";

export default function PokeShop({
    coins,
    greatball,
    superball,
    ultraball,
    masterball,
    medal,
    trophy,
    setCoins,
    setGreatBall,
    setSuperBall,
    setUltraBall,
    setMasterBall,
    setMedal,
    setTrophy,
    disableShop,
    turn,
    fight,
    steal
}) {

    function coinPerTurn(turn, multiple) {return parseNumberToNatural(turn, 10) * multiple}

    const BuyButton = () => {
        return <Image src={buyIcon} title={'Buy'} w="24px"/>
    }

    const ItemComponent = ({ icon, desc, counter }) => {
        return (
            <Center mx={4}>
                <Image src={icon} title={desc} w="24px"/>
                <Text ml={2}>{counter}</Text>
            </Center>
        )
    }

    const TableItem = ({ title, price, scaling, itemType, setter }) => {
        return (
            <Center flexDirection="row" w="100%" justifyContent="space-around" mb={2}>
                <Text w="200px">{title}</Text>
                <Center>
                    <Image src={coinIcon} title="Coin" w="20px" mr={2} />
                    <Text w="80px">{price + coinPerTurn(turn, scaling)}</Text>
                </Center>
                <Button 
                    w="60px"
                    disabled={coins < (price + coinPerTurn(turn, scaling))}
                    onClick={() => {
                        setCoins(coins - (price + coinPerTurn(turn, scaling)))
                        setter(() => itemType + 1)
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
            <Center mb={2}>

                <ItemComponent icon={coinIcon} desc={'Coin'} counter={coins} />
                
                <ItemComponent icon={starIcon} desc={'Poke Star'} counter={medal} />

                <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={trophy} />
                
            </Center>
            <Center mb={4}>

                <ItemComponent icon={greatballIcon} desc={'Great Ball'} counter={greatball} />

                <ItemComponent icon={superballIcon} desc={'Super Ball'} counter={superball} />

                <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={ultraball} />

                <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={masterball} />

                {/* <ItemComponent icon={lureIcon} desc={'Lure'} /> */}

                {/* <ItemComponent icon={fightIcon} desc={'Special Move'} counter={fight} />

                <ItemComponent icon={stealIcon} desc={'Team Rocket Pass'} counter={steal} /> */}
                
            </Center>
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={4}>
                    <Text w="200px" fontWeight="bold">Product</Text>
                    <Text w="80px" fontWeight="bold">Cost</Text>
                    <Text w="60px" fontWeight="bold" textAlign="center">Buy</Text>
                </Center>

                <TableItem 
                    title={'Great Ball'}
                    price={5}
                    scaling={1}
                    itemType={greatball}
                    setter={setGreatBall}
                />

                <TableItem 
                    title={'Super Ball'}
                    price={10}
                    scaling={2}
                    itemType={superball}
                    setter={setSuperBall}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={15}
                    scaling={3}
                    itemType={ultraball}
                    setter={setUltraBall}
                />

                <TableItem 
                    title={'Poke Star'}
                    price={20}
                    scaling={4}
                    itemType={medal}
                    setter={setMedal}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={25}
                    scaling={5}
                    itemType={masterball}
                    setter={setMasterBall}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={50}
                    scaling={10}
                    itemType={trophy}
                    setter={setTrophy}
                />

                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={2}>
                    <Text w="200px">Poke Crown</Text>
                    <Center>
                        <Image src={starIcon} title="Coin" w="20px" mr={2} />
                        <Text w="80px">3</Text>
                    </Center>
                    <Button 
                        w="60px"
                        disabled={medal < 3}
                        onClick={() => {
                            setMedal(medal - 3)
                            setTrophy(trophy + 1)
                        }}
                    ><BuyButton/></Button>
                </Center>
            </Center>
        </PokeModal>
    )
}