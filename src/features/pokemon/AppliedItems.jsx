import { Center, Grid, Image, Text, Tooltip } from "@chakra-ui/react";
import { getBerryIcon } from "@utils/berryIcon";
import dustIcon from '@assets/images/items/dust.png'

export default function AppliedItems({ poke }) {
    const berrySlots = [0, 1, 2]

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={1} mt={1} w="100%">
            {/* Dust slot */}
            <Center
                flexDir="column"
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                borderRadius={6}
                py={1}
                minH={8}
            >
                {poke.dust > 0 ? (
                    <>
                        <Image src={dustIcon} w={4} sx={{ imageRendering: 'pixelated' }} />
                        <Text fontSize="xx-small" fontWeight="bold">{poke.dust}</Text>
                    </>
                ) : null}
            </Center>

            {/* Berry slots */}
            {berrySlots.map((index) => {
                const berry = poke.berries[index]
                return (
                    <Tooltip
                        key={index}
                        isDisabled={!berry}
                        p={3}
                        borderRadius={8}
                        label={berry && (
                            <Center flexDir="column" gap={1}>
                                <Text fontSize="xs">{berry.effect.description}</Text>
                                <Text fontSize="xs">{berry.turns} turns left</Text>
                            </Center>
                        )}
                    >
                        <Center
                            flexDir="column"
                            borderWidth="1px"
                            borderColor="whiteAlpha.300"
                            borderRadius={6}
                            py={1}
                            minH={10}
                        >
                            {berry ? (
                                <>
                                    <Image
                                        src={getBerryIcon(berry.type)}
                                        w={4}
                                        sx={{ imageRendering: 'pixelated' }}
                                    />
                                    <Text fontSize="xx-small" fontWeight="bold">{berry.turns}</Text>
                                </>
                            ) : null}
                        </Center>
                    </Tooltip>
                )
            })}
        </Grid>
    )
}