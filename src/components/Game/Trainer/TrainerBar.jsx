import { Flex, Image, Text } from "@chakra-ui/react";
import clockIcon from '../../../assets/images/game/clock.png'
import crownIcon from '../../../assets/images/game/crown.png'
import starIcon from '../../../assets/images/game/star.png'
import coinIcon from '../../../assets/images/game/coin.png'
import cristalIcon from '../../../assets/images/game/crystal.png'
import lureIcon from '../../../assets/images/items/lure.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function TrainerBar() {
    const { player, game, session } = useContext(PlayerContext)
    
    return (
        <>
            {!game.hasEnded && (
                <Flex alignItems="center" ml={4} mr={2}>
                    <Image
                        src={clockIcon} 
                        title={'Turns'}
                        w="24px"
                    ></Image>
                    <Text ml={2} fontSize="2xs">{session.turns}/{session.gameDuration}</Text>
                </Flex>
            )}
            <Flex alignItems="center" mx={2}>
                <Image
                    mb={1}
                    src={crownIcon}
                    title={'Poke Crown'}
                    w="34px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.currency.crowns}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={starIcon}
                    title={'Poke Star'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.currency.stars}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={coinIcon}
                    title={'Coins'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.currency.coins}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={cristalIcon}
                    title={'Candy'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.status.candy}</Text>
            </Flex>
            {/* <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={lureIcon}
                    title={'Shiny incense'}
                    w="24px"
                ></Image>
                <Text fontSize='2xs' title={'Shiny chance ' + player.items.incense + '%'} cursor="pointer" ml={2}>{player.items.incense - 1}</Text>
            </Flex> */}
        </>
    )
}