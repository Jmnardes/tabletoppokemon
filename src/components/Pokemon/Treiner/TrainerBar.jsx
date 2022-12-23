import { Flex, Image, Text } from "@chakra-ui/react";
import clockIcon from '../../../assets/images/game/clock.png'
import crownIcon from '../../../assets/images/game/crown.png'
import starIcon from '../../../assets/images/game/star.png'
import coinIcon from '../../../assets/images/game/coin.png'

export function TrainerBar({ 
    turn,
    medal,
    trophy,
    isEndgame,
    coin
}) {
    return (
        <>
            {!isEndgame && (
                <Flex alignItems="center" ml={4} mr={2}>
                    <Image
                        src={clockIcon} 
                        title={'Turns'}
                        w="24px"
                    ></Image>
                    <Text ml={2}>{turn}</Text>
                </Flex>
            )}
            <Flex alignItems="center" mx={2}>
                <Image
                    mb={1}
                    src={crownIcon}
                    title={'Poke Crown'}
                    w="34px"
                ></Image>
                <Text ml={2}>{trophy}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={isEndgame ? 4 : 0}>
                <Image
                    src={starIcon}
                    title={'Poke Star'}
                    w="24px"
                ></Image>
                <Text ml={2}>{medal}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={isEndgame ? 4 : 0}>
                <Image
                    src={coinIcon}
                    title={'Coins'}
                    w="24px"
                ></Image>
                <Text ml={2}>{coin}</Text>
            </Flex>
        </>
    )
}