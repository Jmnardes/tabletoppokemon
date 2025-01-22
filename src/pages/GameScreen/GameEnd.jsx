import { Center, Divider, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import PlayerContext from "@Contexts/PlayerContext";

import crownIcon from '@assets/images/game/crown.png'
import starIcon from '@assets/images/game/star.png'
import coinIcon from '@assets/images/game/coin.png'
import FirstPlaceIcon from "@components/Icons/places/FirstPlaceIcon";
import SecondPlaceIcon from "@components/Icons/places/SecondPlaceIcon";
import ThirdPlaceIcon from "@components/Icons/places/ThirdPlaceIcon";

export default function GameEnd() {
    const { results, setWaitingForPlayers } = useContext(PlayerContext)
    const { players, achievements } = results

    function handlePlacement (place) {
        switch (place) {
            case 0:
                return <FirstPlaceIcon h={16} w={16} />
            case 1:
                return <SecondPlaceIcon h={16} w={16} />
            case 2:
                return <ThirdPlaceIcon h={16} w={16} />
            default:
                return ''
        }
    }

    function PlayerCurrencyBlock ({ img, currency }) {
        return (
            <Center px={4}>
                <Image src={img} w={22}></Image>
                <Text ml={2}>{currency}</Text>
            </Center>
        )
    }

    function PlayerResultBlock ({ place, player }) {
        return (
            <GridItem>
                <Center>
                    <Center mr="-50px" mb="102px" zIndex={1}>
                        {handlePlacement(place)}
                    </Center>
                    <Center flexDirection="column" p={8} my={2} border="1px" rounded={8} w={80}>
                        <Text ml={3}>
                            {player.status.trainerName}
                        </Text>
                        <Divider my={4} />
                        <Center w="100%" flex justifyContent="space-between">
                            <PlayerCurrencyBlock img={coinIcon} currency={player.status.coins} />
                            <PlayerCurrencyBlock img={starIcon} currency={player.status.stars} />
                            <PlayerCurrencyBlock img={crownIcon} currency={player.status.crowns} />
                        </Center>
                    </Center>
                </Center>
            </GridItem>
        )
    }

    function renderPlayers() {
        if (players) {
            return players.map((player, index) => {
                return <PlayerResultBlock key={index} place={index} player={player} />
            })
        }
    }

    useEffect(() => {
        setWaitingForPlayers(false)
    }, [setWaitingForPlayers])

    return (
        <Center flexDirection="column" p={10} h="100%">
            <Text fontSize="5xl">Final Results</Text>
            <Text fontSize="xs" mb={4}>thanks for playing!</Text>
            <Grid
                h='100%'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(3, 1fr)'
                gap={4}
                p={16}
            >
                {renderPlayers()}
            </Grid>
        </Center>
    )
}