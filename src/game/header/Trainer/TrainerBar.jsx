import { useContext } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

import PlayerContext from "@context/PlayerContext";
import dustIcon from '@assets/images/items/dust.png'
import lureIcon from '@assets/images/items/lure.png'

export default function TrainerBar() {
    const { player, game } = useContext(PlayerContext)
    
    return (
        <>
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
                    src={lureIcon}
                    title={'Shiny incense'}
                    w="24px"
                ></Image>
                <Text fontSize='2xs' title={'Shiny chance ' + (player.items.incense + 1) + '%'} cursor="pointer" ml={2}>{player.items.incense}</Text>
            </Flex>
        </>
    )
}