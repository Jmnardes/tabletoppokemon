import { Box, Center, Flex, Text } from "@chakra-ui/react";
import PrizeIcon from "@components/PrizeIcon/PrizeIcon"

import FirstPlaceIcon from "@components/Icons/places/FirstPlaceIcon"
import SecondPlaceIcon from "@components/Icons/places/SecondPlaceIcon"
import ThirdPlaceIcon from "@components/Icons/places/ThirdPlaceIcon"

export default function Prizes({ prizes, opponents }) {
    const PlaceIcon = ({ place }) => {
        if (place === 1) return <FirstPlaceIcon h={12} w={12} />
        if (place === 2) return <SecondPlaceIcon h={12} w={12} />
        return <ThirdPlaceIcon h={12} w={12} />
    }

    const PlaceBox = ({ place, prize }) => {
        return(
            <Flex direction={"row"} alignItems="center" px={6} minW={64} bg={"gray.650"} borderRadius={8}>
                <Box>
                    <PlaceIcon place={place}/>
                </Box>

                <Flex w="100%" justifyContent="center" mx={2}>
                    <Text>{prize.amount}</Text>
                    <PrizeIcon type={prize.name} />
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex w="100%" minH={20} justifyContent="center" pb={4} gap={8}>
            <PlaceBox place={1} prize={prizes[0]} />
            <PlaceBox place={2} prize={prizes[1]} />
            {opponents.length > 1 && (
                <PlaceBox place={3} prize={prizes[2]} />
            )}
        </Flex>
    )
}