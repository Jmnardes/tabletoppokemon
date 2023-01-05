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
// import fightIcon from '../../../assets/images/items/fight.png'
// import stealIcon from '../../../assets/images/items/steal.png'
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
    pokemonEgg,
    greatIncubator,
    setGreatIncubator
    // fight,
    // steal
}) {

    function coinPerTurn(turn, multiple) {return parseNumberToNatural(turn, 10) * multiple}

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
            <Center mb={4}>

                {coins > 0 && <ItemComponent icon={coinIcon} desc={'Coin'} counter={coins} />}
                
                {medal > 0 && <ItemComponent icon={starIcon} desc={'Poke Star'} counter={medal} />}

                {trophy > 0 && <ItemComponent icon={crownIcon} desc={'Poke Crown'} counter={trophy} />}

                {pokemonEgg > 0 && <ItemComponent icon={eggIcon} desc={'Pokemon Egg'} counter={pokemonEgg} />}

                {greatIncubator > 0 && <ItemComponent icon={incubatorGreatIcon} desc={'Great Incubator'} counter={pokemonEgg} />}

                {greatball > 0 && <ItemComponent icon={greatballIcon} desc={'Great Ball'} counter={greatball} />}

                {superball > 0 && <ItemComponent icon={superballIcon} desc={'Super Ball'} counter={superball} />}

                {ultraball > 0 && <ItemComponent icon={ultraballIcon} desc={'Ultra Ball'} counter={ultraball} />}

                {masterball > 0 && <ItemComponent icon={masterballIcon} desc={'Master Ball'} counter={masterball} />}
                
            </Center>
            {/* <Center mb={4}>

                <ItemComponent icon={lureIcon} desc={'Lure'} />

                <ItemComponent icon={fightIcon} desc={'Special Move'} counter={fight} />

                <ItemComponent icon={stealIcon} desc={'Team Rocket Pass'} counter={steal} />
                
            </Center> */}
            <Center flexDirection="column">
                <Center flexDirection="row" w="100%" justifyContent="space-around" mb={4}>
                    <Text w="200px" fontWeight="bold">Product</Text>
                    <Text w="80px" fontWeight="bold">Cost</Text>
                    <Text w="60px" fontWeight="bold" textAlign="center">Buy</Text>
                </Center>

                <TableItem 
                    title={'Great Ball'}
                    price={4}
                    scaling={1}
                    itemType={greatball}
                    setter={setGreatBall}
                    itemIcon={greatballIcon}
                />

                <TableItem 
                    title={'Super Ball'}
                    price={8}
                    scaling={2}
                    itemType={superball}
                    setter={setSuperBall}
                    itemIcon={superballIcon}
                />

                <TableItem 
                    title={'Ultra Ball'}
                    price={12}
                    scaling={3}
                    itemType={ultraball}
                    setter={setUltraBall}
                    itemIcon={ultraballIcon}
                />

                <TableItem 
                    title={'Master Ball'}
                    price={20}
                    scaling={5}
                    itemType={masterball}
                    setter={setMasterBall}
                    itemIcon={masterballIcon}
                />
                
                <TableItem 
                    title={'Great Incubator'}
                    price={0}
                    scaling={7}
                    itemType={greatIncubator}
                    setter={setGreatIncubator}
                    itemIcon={incubatorGreatIcon}
                />

                <TableItem 
                    title={'Poke Star'}
                    price={28}
                    scaling={7}
                    itemType={medal}
                    setter={setMedal}
                    itemIcon={starIcon}
                />

                <TableItem 
                    title={'Poke Crown'}
                    price={72}
                    scaling={18}
                    itemType={trophy}
                    setter={setTrophy}
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