import { Center, Image, Text } from "@chakra-ui/react"

import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

export default function AugmentBalls({ balls }) {
    const ballIcons = {
        greatball: greatballIcon,
        ultraball: ultraballIcon,
        masterball: masterballIcon
    }

    return (
        <Center flex gap={4}>
            {balls.map(ball => {
                return (
                    <Center key={ball.type}>
                        <Text fontSize={"3xs"} alignSelf={"end"} mr={0.5}>{ball.amount}x</Text>
                        <Image
                            src={ballIcons[ball.type]}
                            title={ball.type}
                            w="24px"
                        ></Image>
                    </Center>
                )
            })}
        </Center>
    )
}