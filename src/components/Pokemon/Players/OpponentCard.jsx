import { Card } from "@chakra-ui/card"
import { useColorMode } from "@chakra-ui/color-mode"
import { Image } from "@chakra-ui/image"
import { Box, Center, Divider, Flex, Heading, Kbd, Text } from "@chakra-ui/layout"
import crownIcon from '../../../assets/images/game/crown.png'
import starIcon from '../../../assets/images/game/star.png'
import coinIcon from '../../../assets/images/game/coin.png'
import DisconnectedIcon from "../../Icons/DisconnectedIcon"

export default function OpponentCard({ opponent }) {
    const { colorMode } = useColorMode()

    const bgColor = opponent.online
        ? (colorMode === 'light' ? "gray.300" : "gray.800")
        : 'transparent'
    const borderStyle = opponent.online
        ? undefined
        : "4px solid red"
    return (
        <Card
            backgroundColor={bgColor}
            padding="1rem"
            borderRadius="1rem"
            gap="0.75rem"
            border={borderStyle}
        >
            <Flex direction="column" align="center">
                <Heading>{opponent.status.trainerName}</Heading>
                <Box>
                    <Kbd>{`Level ${opponent.status.level}`}</Kbd>
                </Box>
            </Flex>
            <Divider />
            {opponent.online ? (
                <Flex justify="space-between">
                    <Flex alignItems="center" mx={2}>
                        <Image
                            mb={1}
                            src={crownIcon}
                            title={'Poke Crown'}
                            w="34px"
                        ></Image>
                        <Text ml={2}>{opponent.currency.crowns}</Text>
                    </Flex>
                    <Flex alignItems="center" mx={2}>
                        <Image
                            src={starIcon}
                            title={'Poke Star'}
                            w="24px"
                        ></Image>
                        <Text ml={2}>{opponent.currency.stars}</Text>
                    </Flex>
                    <Flex alignItems="center" mx={2}>
                        <Image
                            src={coinIcon}
                            title={'Coins'}
                            w="24px"
                        ></Image>
                        <Text ml={2}>{opponent.currency.coins}</Text>
                    </Flex>
                </Flex>
            ) : (
                <Center>
                    <DisconnectedIcon />
                </Center>
            )}
        </Card>
    )
}
