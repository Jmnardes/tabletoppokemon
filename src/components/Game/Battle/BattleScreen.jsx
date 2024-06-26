import { Center, Flex, Image, Kbd, Progress, Text, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BattleLog from "./BattleLog";
import { stringToUpperCase } from "../../../util";

export default function BattleScreen({ pokemon, myPokemonHp, opponent, battleLog, turnWinner }) {
    const [selfHitAnimation, setSelfHitAnimation] = useState('')
    const [opponentHitAnimation, setOpponentHitAnimation] = useState('')

    const animation = (
        keyframes`
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
        ` + ' 0.5s ease-in-out 1s'
    )

    const handleSelfHitAnimation = () => {
        setSelfHitAnimation(animation)
    }

    const handleOpponentHitAnimation = () => {
        setOpponentHitAnimation(animation)
    }

    const BattlingPokemonBox = ({ sprite, hp, maxHp, name, myPoke }) => {
        return (
            <Center flexDir="column" mx={2}>
                <Text>{stringToUpperCase(name)}</Text>
                <Image 
                    w={72}
                    animation={myPoke ? selfHitAnimation : opponentHitAnimation}
                    onAnimationEnd={() => myPoke ? setSelfHitAnimation('') : setOpponentHitAnimation('')}
                    src={sprite}
                    position="absolute"
                    mt={52}
                />
                <Kbd display="flex" flexDir="row" alignItems="center">HP
                <Progress
                    w={24}
                    ml={1}
                    size='md'
                    colorScheme='green'
                    borderRadius={4}
                    value={hp}
                    max={maxHp}
                /></Kbd>
            </Center>
        )
    }

    useEffect(() => {
        if (battleLog) {
            turnWinner === pokemon?.id ? handleOpponentHitAnimation() : handleSelfHitAnimation()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [battleLog])

    return (
        <Flex flex="1" h="100%" flexDirection="row">
            <Flex w="65%" h="100%" mx={24} flexDirection="row">
                <Center w="100%" h="100%">
                    {pokemon && (
                        <BattlingPokemonBox
                            key={pokemon?.id}
                            sprite={pokemon?.sprites.back}
                            hp={turnWinner && turnWinner !== pokemon?.id ? 0 : myPokemonHp}
                            maxHp={pokemon?.stats.hp}
                            name={pokemon?.name}
                            myPoke={true}
                        />
                    )}
                </Center>

                <Center alignItems="start" w="100%" h="100%">
                    {opponent && pokemon && (
                        <BattlingPokemonBox
                            key={opponent?.pokemonId}
                            sprite={opponent?.sprite}
                            hp={turnWinner && turnWinner !== opponent?.pokemonId ? 0 : opponent?.hp}
                            maxHp={opponent?.maxHp}
                            name={opponent?.name}
                            myPoke={false}
                        />
                    )}
                </Center>
            </Flex>
            <Flex w="35%" h="100%" flexDirection="row" rounded={8}>
                <BattleLog pokemon={pokemon} battleLog={battleLog} turnWinner={turnWinner} />
            </Flex>
        </Flex>
    )
}