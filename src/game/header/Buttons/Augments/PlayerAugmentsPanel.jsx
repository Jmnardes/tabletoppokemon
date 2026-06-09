import { useContext } from "react";
import { Center, Flex, Text, Wrap } from "@chakra-ui/react";

import PlayerContext from "@context/PlayerContext";
import AugmentContainer from "@features/augments/AugmentContainer";

export default function PlayerAugmentsPanel() {
    const { player } = useContext(PlayerContext)

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Augments</Text>
            <Center flexDirection="column" p={4}>
                {player.augments?.length > 0 ? (
                    <Wrap gap={4} justify="center" my={4}>
                        {player.augments.map((augment, index) => (
                            <AugmentContainer key={index} augment={augment} />
                        ))}
                    </Wrap>
                ) : (
                    <Text color="gray.400" mt={8}>No augments active</Text>
                )}
            </Center>
        </Flex>
    )
}
