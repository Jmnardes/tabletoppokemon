import { useContext } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

import PlayerContext from "@Contexts/PlayerContext";

import clockIcon from '@assets/images/game/clock.png'
import crownIcon from '@assets/images/game/crown.png'
import starIcon from '@assets/images/game/star.png'
import dustIcon from '@assets/images/items/dust.png'
import daycareTokenIcon from '@assets/images/game/coin.png'
import lureIcon from '@assets/images/items/lure.png'

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
                    <Text ml={2} fontSize="2xs">{session.turns}</Text>
                </Flex>
            )}
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={starIcon}
                    title={'Ranking Points'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.status.ranking}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={dustIcon}
                    title={'Dust'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.items.dust}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={daycareTokenIcon}
                    title={'Daycare Token'}
                    w="24px"
                ></Image>
                <Text ml={2} fontSize="2xs">{player.daycare.token}</Text>
            </Flex>
            <Flex alignItems="center" mx={2} mt={game.hasEnded ? 4 : 0}>
                <Image
                    src={lureIcon}
                    title={'Shiny incense'}
                    w="24px"
                ></Image>
                <Text fontSize='2xs' title={'Shiny chance ' + (player.items.incense + 1) + '%'} cursor="pointer" ml={2}>{player.items.incense}</Text>
            </Flex>
            {!game.hasEnded && (
                <Flex alignItems="center" mx={2}>
                    <Image
                        src={crownIcon} 
                        title={'Badges'}
                        w="24px"
                    ></Image>
                    <Text ml={2} fontSize="2xs">{player.status.badges || 0} / {session.badgesToWin || 8}</Text>
                </Flex>
            )}
        </>
    )
}