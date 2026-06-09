import { Center, Image, Text, Tooltip } from "@chakra-ui/react";
import { getBerryIcon } from "@utils/berryIcon";

export default function BerriesMini({ berries, isUsed = true }) {
    return (
        <>
            {berries.map((berry, index) => (
                <Tooltip key={index} p={4} borderRadius={8} label={
                    <Center flexDir="column" gap={4}>
                        <Text>{berry.effect.description}</Text>
                        {isUsed ? (
                            <Text>{berry.turns} turns left</Text>
                        ) : (
                            <Text>{berry.turns} turns</Text>
                        )}
                    </Center>
                }>
                    <Image src={getBerryIcon(berry.type)} w={8} />
                </Tooltip>
            ))}
        </>
    )
}
