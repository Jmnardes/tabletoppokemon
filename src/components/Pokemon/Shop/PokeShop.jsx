import { Button, Flex, Image, Text } from "@chakra-ui/react";
import PokeModal from "../Modal/Modal";
import { GiTwoCoins, GiRibbonMedal, GiTrophyCup, GiShop } from "react-icons/gi";
import greatballIcon from '../../../assets/images/pokeballs/poke.png'
import superballIcon from '../../../assets/images/pokeballs/golden.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultra.png'
import { parseNumberToNatural } from "../../../util";

export default function PokeShop({
    coins,
    greatball,
    superball,
    ultraball,
    medal,
    trophy,
    setCoins,
    setGreatBall,
    setSuperBall,
    setUltraBall,
    setMedal,
    setTrophy,
    disableShop,
    turn
}) {

    function coinPerTurn(turn, multiple) {return parseNumberToNatural(turn, 10) * multiple}

    return (
        <PokeModal title={'Shop'} button={<GiShop size="22px"/>} disableButton={disableShop}>
            <Flex justifyContent="center" alignItems="center" mb={8}>

                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <GiTwoCoins size="24px" />
                    <Text ml={2}>{coins}</Text>
                </Flex>

                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <GiRibbonMedal size="24px" />
                    <Text ml={2}>{medal}</Text>
                </Flex>

                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <GiTrophyCup size="24px" />
                    <Text ml={2}>{trophy}</Text>
                </Flex>

                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <Image
                        mr={2}
                        src={greatballIcon} 
                        alt={'greatball'}
                        w="24px"
                    ></Image>
                    <Text>{greatball}</Text>
                </Flex>
                
                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <Image
                        mr={2}
                        src={superballIcon} 
                        alt={'superball'}
                        w="24px"
                    ></Image>
                    <Text>{superball}</Text>
                </Flex>
                
                <Flex justifyContent="center" alignItems="center" mx={4}>
                    <Image
                        mr={2}
                        src={ultraballIcon} 
                        alt={'ultraball'}
                        w="24px"
                    ></Image>
                    <Text>{ultraball}</Text>
                </Flex>
                
            </Flex>
            <Flex flexDirection="column">
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={8}>
                    <Text w="200px">Product</Text>
                    <Text w="80px">Coins</Text>
                    <Text w="60px" textAlign="center">Buy</Text>
                </Flex>
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={2}>
                    <Text w="200px">Great Ball</Text>
                    <Text w="80px">$ {5 + coinPerTurn(turn, 1)}</Text>
                    <Button 
                        w="60px"
                        disabled={coins < (5 + coinPerTurn(turn, 1))}
                        onClick={() => {
                            setCoins(coins - (5 + coinPerTurn(turn, 1)))
                            setGreatBall(greatball + 1)
                        }}
                    >Buy</Button>
                </Flex>
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={2}>
                    <Text w="200px">Super Ball</Text>
                    <Text w="80px">$ {10 + coinPerTurn(turn, 2)}</Text>
                    <Button 
                        w="60px"
                        disabled={coins < (10 + coinPerTurn(turn, 2))}
                        onClick={() => {
                            setCoins(coins - (10 + coinPerTurn(turn, 2)))
                            setSuperBall(superball + 1)
                        }}
                    >Buy</Button>
                </Flex>
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={2}>
                    <Text w="200px">Ultra Ball</Text>
                    <Text w="80px">$ {15 + coinPerTurn(turn, 3)}</Text>
                    <Button 
                        w="60px"
                        disabled={coins < (15 + coinPerTurn(turn, 3))}
                        onClick={() => {
                            setCoins(coins - (15 + coinPerTurn(turn, 3)))
                            setUltraBall(ultraball + 1)
                        }}
                    >Buy</Button>
                </Flex>
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={2}>
                    <Text w="200px">Medal</Text>
                    <Text w="80px">$ {25 + coinPerTurn(turn, 5)}</Text>
                    <Button 
                        w="60px"
                        disabled={coins < (25 + coinPerTurn(turn, 5))}
                        onClick={() => {
                            setCoins(coins - (25 + coinPerTurn(turn, 5)))
                            setMedal(medal + 1)
                        }}
                    >Buy</Button>
                </Flex>
                <Flex flexDirection="row" w="100%" justifyContent="space-around" alignItems="center" mb={2}>
                    <Text w="200px">Trophy</Text>
                    <Text w="80px">$ {50 + coinPerTurn(turn, 10)}</Text>
                    <Button 
                        w="60px"
                        disabled={coins < (50 + coinPerTurn(turn, 10))}
                        onClick={() => {
                            setCoins(coins - (50 + coinPerTurn(turn, 10)))
                            setTrophy(trophy + 1)
                        }}
                    >Buy</Button>
                </Flex>
            </Flex>
        </PokeModal>
    )
}