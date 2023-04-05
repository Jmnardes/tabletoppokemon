import { Card } from "@chakra-ui/card"
import { useColorMode } from "@chakra-ui/color-mode"
import { Image } from "@chakra-ui/image"
import { Center, Divider, Flex, Heading, Kbd, Text } from "@chakra-ui/layout"
import crownIcon from '../../../assets/images/game/crown.png'
import starIcon from '../../../assets/images/game/star.png'
import coinIcon from '../../../assets/images/game/coin.png'
import DisconnectedIcon from "../../Icons/DisconnectedIcon"
import StepsIcon from "../../Icons/StepsIcon"
import SuccessIcon from "../../Icons/SuccessIcon"

export default function OpponentCard({ opponent }) {
    const { colorMode } = useColorMode()

    const light = colorMode === 'light'
    const bgColor = opponent.online
        ? (light ? "gray.200" : "gray.650")
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
            {opponent.online && (
                <Center
                    boxSize="48px"
                    backgroundColor={bgColor}
                    borderRadius="50%"
                    position="absolute"
                    top="-20px"
                    left="0px"
                >
                    {opponent.turnReady ? (
                        <SuccessIcon c={light ? "green.500" : "green.400"} />
                    ) : (
                        <StepsIcon c={light ? "blue.500" : "blue.400"} />
                    )}
                </Center>
            )}
            <Flex direction="column" align="center">
                <Heading>{opponent.status.trainerName}</Heading>
                <Flex>
                    <Kbd>{`Level ${opponent.status.level}`}</Kbd>
                </Flex>
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
