import { Center, Image, Text, Tooltip } from "@chakra-ui/react";
import { getBerryIcon } from "@utils/berryIcon"

import dustIcon from '@assets/images/items/dust.png'

export default function ShowBerry({ poke }) {
    return (
        <Center gap={2} mt={2} h={12} justifyContent={'space-between'}>
            <Center>
                {poke.dust > 0 && (
                    <>
                        <Text bottom={0} ml={8} position={"absolute"} fontSize={"xx-small"}>
                            {poke.dust}x
                        </Text>
                        <Image
                            title={"Dusts"}
                            src={dustIcon}
                            w={8}
                        />
                    </>
                )}
            </Center>

            <Center gap={2}>
                {poke.berries.map((berry, index) => (
                    <Tooltip key={index} p={4} borderRadius={8} label={
                        <Center flex flexDir={"column"} gap={4}>
                            <Text>{berry.effect.description}</Text>
                            <Text>{berry.turns} turns left</Text>
                        </Center>
                    }>
                        <Center>
                            <Text bottom={0} mr={6} position={"absolute"} fontSize={"xx-small"}>
                                {berry.turns}
                            </Text>
                            <Image
                                title={berry.name}
                                src={getBerryIcon(berry.type)}
                                w={8}
                            />
                        </Center>
                    </Tooltip>
                ))}
            </Center>
        </Center>
    )
}