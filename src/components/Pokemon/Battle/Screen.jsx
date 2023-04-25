import { Center, Flex, Image, Kbd, Progress, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Screen({ pokemon, hitAnimation, setHitAnimation, opponent }) {
    const [selfHitAnimation, setSelfHitAnimation] = useState('')
    const [myHp, setMyHp] = useState(0)
    const [opponentHp, setOpponentHp] = useState(0)

    const handleSelfHitAnimation = () => {
        setSelfHitAnimation(keyframes`
        0% { transform: translate(1px, 1px) rotate(6deg); opacity: 0.1 }
        10% { transform: translate(10px, 10px) rotate(12deg); opacity: 0.4 }
        20% { transform: translate(-10px, -10px) rotate(6deg); opacity: 0.7 }
        30% { transform: translate(5px, 5px) rotate(0deg); }
        40% { transform: translate(-5px, -5px) rotate(-6deg); }
        50% { transform: translate(10px, 1px) rotate(-12deg); }
        60% { transform: translate(1px, 10px) rotate(-6deg); opacity: 0.1 }
        70% { transform: translate(-5px, 5px) rotate(0deg); opacity: 0.4 }
        80% { transform: translate(5px, -5px) rotate(6deg); opacity: 0.7 }
        90% { transform: translate(-1px, -1px) rotate(12deg); }
        100% { transform: translate(0px, 0px) rotate(6deg); }
        ` + ' 0.5s ease-in-out 1s')
    }

    useEffect(() => {
        handleSelfHitAnimation()
        setMyHp(pokemon?.stats.hp)
        setOpponentHp(opponent?.stats.hp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex flex="1" h="100%" mx={24} justifyContent="space-between">
            <Center ml={[12, 48]} alignItems="end">
                {pokemon && (
                    <Center flexDir="column">
                        <Image 
                            w={64}
                            animation={selfHitAnimation}
                            onAnimationEnd={() => setSelfHitAnimation('')}
                            src={pokemon?.sprites.back}
                            position="absolute"
                            mb={48}
                        />
                        <Kbd display="flex" flexDir="row" alignItems="center">HP
                        <Progress
                            w={48}
                            ml={1}
                            size='md'
                            colorScheme='green' 
                            borderRadius={4}
                            value={myHp}
                            max={pokemon?.stats.hp}
                        /></Kbd>
                    </Center>
                )}
            </Center>
            
            <Center mr={[12, 48]} alignItems="start">
                {opponent && (
                    <Center flexDir="column">
                        <Image 
                            w={64}
                            animation={hitAnimation}
                            onAnimationEnd={() => setHitAnimation('')}
                            src={opponent?.sprites.front}
                            position="absolute"
                            mt={48}
                        />
                        <Kbd display="flex" flexDir="row" alignItems="center">HP
                        <Progress
                            w={48}
                            ml={1}
                            size='md'
                            colorScheme='green' 
                            borderRadius={4}
                            value={opponentHp}
                            max={opponent?.stats.hp}
                        /></Kbd>
                    </Center>
                )}
            </Center>
        </Flex>
    )
}