import { Box, Center, Flex, Image, Kbd, Progress, Text, keyframes } from "@chakra-ui/react";
import { useState } from "react";
import BattleLog from "./BattleLog";
import { stringToUpperCase } from "../../../util";

export default function BattleScreen({ pokemon, hitAnimation, setHitAnimation, myPokemonHp, opponents }) {
    const [selfHitAnimation, setSelfHitAnimation] = useState('')

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

    const BattlingPokemonBox = ({ key, sprite, hp, maxHp, name }) => {
        return (
            <Center key={key} flexDir="column" mx={2}>
                <Text>{stringToUpperCase(name)}</Text>
                <Image 
                    w={72}
                    animation={hitAnimation}
                    onAnimationEnd={() => setHitAnimation('')}
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

    return (
        <Flex flex="1" h="100%" flexDirection="row">
            <Flex w="65%" h="100%" mx={24} flexDirection="row">
                <Center w="100%" h="100%">
                    {pokemon && (
                        <BattlingPokemonBox
                        key={pokemon?.name}
                        sprite={pokemon?.sprites.back}
                        hp={myPokemonHp}
                        maxHp={pokemon?.stats.hp}
                        name={pokemon?.name}
                        />
                        )}
                </Center>

                <Center alignItems="start" w="100%" h="100%">
                    {opponents.map((opponent) => {
                        return <BattlingPokemonBox
                            key={opponent.player}
                            sprite={opponent.sprite}
                            hp={opponent.hp}
                            maxHp={opponent.maxHp}
                            name={opponent.name}
                            />
                        })}
                </Center>
            </Flex>
            <Flex w="35%" h="100%" flexDirection="row" rounded={8} bgColor="gray.600">
                <BattleLog pokemon={pokemon} />
            </Flex>
        </Flex>
    )
}