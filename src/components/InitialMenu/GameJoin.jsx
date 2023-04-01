import { Button, Flex, Input, Text } from "@chakra-ui/react";

export default function GameJoin({ handleGameStart, handleTrainerName }) {
    return (
        <>
            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text fontSize="3xl" mb={2}>
                    Choose your name 
                </Text>
                <Input textAlign="center" fontSize="2xl" maxLength={14} onChange={(e) => {handleTrainerName(e.target.value)}} />
            </Flex>

            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text fontSize="3xl" mb={2}>
                    Game Code 
                </Text>
                <Input textAlign="center" fontSize="2xl" maxLength={14} onChange={(e) => {handleTrainerName(e.target.value)}} />
            </Flex>

            <Button w="100%" fontSize="3xl" h={12} mt={4} mb={4} onClick={() => handleGameStart(true)}>Join Game</Button>
        </>
    )
}