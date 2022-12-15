import PokeModal from '../Pokemon/Modal/Modal'
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { GiTwoCoins, GiRibbonMedal, GiTrophyCup } from "react-icons/gi";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import greatballIcon from '../../assets/images/pokeballs/poke.png'
import superballIcon from '../../assets/images/pokeballs/golden.png'
import ultraballIcon from '../../assets/images/pokeballs/ultra.png'

export function Economy({ 
        coins, 
        medal, 
        trophy,
        greatball,
        superball,
        ultraball,
        handleAddOneCoin, 
        handleRemoveOneCoin, 
        handleAddFiveCoins, 
        handleRemoveFiveCoins, 
        handleAddMedal, 
        handleRemoveMedal, 
        handleAddTrophy, 
        handleRemoveTrophy,
        handleAddGreatball, 
        handleAddSuperball, 
        handleAddUltraball, 
    }) {
    return (
        <PokeModal title={"Economy"} button={<><GiTwoCoins /> <Text ml={2}>{coins}</Text></>}>
            <Flex flexDirection="column" pt={4}>
                <Flex justifyContent="center" alignItems="center">
                    <GiTwoCoins size="40px" /> <Text fontSize="3xl" ml={2}>{coins}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    <Flex m={4}>
                        <Button m={2} onClick={handleAddFiveCoins}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>5</Text> </Button>
                        <Button m={2} onClick={handleAddOneCoin}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveOneCoin}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                        <Button m={2} onClick={handleRemoveFiveCoins}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>5</Text> </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection="row" justifyContent="center" alignItems="center" pt={4}>
                <Flex flexDirection="column">
                    <Flex justifyContent="center" alignItems="center">
                        <GiRibbonMedal size="40px" /> <Text fontSize="3xl" ml={2}>{medal}</Text>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <Flex m={4}>
                            <Button m={2} onClick={handleAddMedal}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                            <Button m={2} onClick={handleRemoveMedal}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex flexDirection="column">
                    <Flex justifyContent="center" alignItems="center">
                        <GiTrophyCup size="40px" /> <Text fontSize="3xl" ml={2}>{trophy}</Text>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        <Flex m={4}>
                            <Button m={2} onClick={handleAddTrophy}> <FaPlusSquare size="20px" color="green" /> <Text ml={2}>1</Text> </Button>
                            <Button m={2} onClick={handleRemoveTrophy}> <FaMinusSquare size="20px" color="red" /> <Text ml={2}>1</Text> </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flexDirection="row" justifyContent="center" alignItems="center" pt={4}>
                <Flex flexDirection="column" p={4} borderRadius={4}>
                    <Flex justifyContent="center" alignItems="center">
                        <Image
                            src={greatballIcon} 
                            alt={'greatball'}
                            w="48px"
                            _hover={{cursor: 'pointer', opacity: 0.7}}
                            onClick={handleAddGreatball}
                        ></Image>
                        <Text textAlign="center" fontSize="3xl" ml={2} mt={2}>{greatball}</Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" p={4} borderRadius={4}>
                    <Flex justifyContent="center" alignItems="center">
                        <Image
                            src={superballIcon} 
                            alt={'superball'}
                            w="48px"
                            _hover={{cursor: 'pointer', opacity: 0.7}}
                            onClick={handleAddSuperball}
                        ></Image>
                        <Text textAlign="center" fontSize="3xl" ml={2} mt={2}>{superball}</Text>
                    </Flex>
                </Flex>
                <Flex flexDirection="column" p={4} borderRadius={4}>
                    <Flex justifyContent="center" alignItems="center">
                        <Image
                            src={ultraballIcon} 
                            alt={'ultraball'}
                            w="48px"
                            _hover={{cursor: 'pointer', opacity: 0.7}}
                            onClick={handleAddUltraball}
                        ></Image>
                        <Text textAlign="center" fontSize="3xl" ml={2} mt={2}>{ultraball}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </PokeModal>
    )
}