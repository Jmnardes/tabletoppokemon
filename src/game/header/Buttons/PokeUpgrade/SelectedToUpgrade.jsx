import { Box, Center, Image, Progress, Text, Tooltip } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import PlayerContext from "@Contexts/PlayerContext"

import CardTitle from "@components/Pokemon/CardTitle"
import { PokeRarity } from "@components/Pokemon/PokemonRarity"
import { getBerryIcon } from "@utils/berryIcon"
import { stringToUpperCase, upgradePokemonLevelChance } from '@utils'

import dustIcon from '@assets/images/items/dust.png'

export default function SelectedToUpgrade({ selectedPokemon, setSelectedPokemon }) {
    const { session } = useContext(PlayerContext)
    const [changeToLevelUp, setChanceToLevelUp] = useState(0)

    const ChanceToLevelUp = () => {
        return (
            <Tooltip label="Chance in leveling up next turn" p={4} borderRadius={6}>
                <Box position="absolute" bottom={0}>
                    <Progress
                        value={changeToLevelUp} max={100} 
                        size="lg" w={48}
                        colorScheme={"purple"}
                        borderRadius={6}
                    />
                    <Text
                        position="absolute"
                        top="50%" left="50%"
                        transform="translate(-50%, -50%)"
                        fontSize="x-small"
                    >
                        {changeToLevelUp}%
                    </Text>
                </Box>
            </Tooltip>
        )
    }

    const SelectedPokemonCard = () => {
        return (
            <Center
                onClick={() => setSelectedPokemon(null)}
                _hover={{ opacity: 0.8 }}
                cursor={"pointer"}
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={4} mx={2} w={64}
            >
                <Center position="absolute" flex flexDirection="column" top={-8}>
                    <Text fontSize={"x-small"}>Lv.{selectedPokemon.level}</Text>
                    <CardTitle poke={selectedPokemon} />
                    <PokeRarity rarity={selectedPokemon.rarity.rarity} />
                </Center>
                <Image
                    w={52}
                    my={4}
                    title={stringToUpperCase(selectedPokemon.name)}
                    src={selectedPokemon.sprites.main}
                />
            </Center>
        )
    }

    const AppliedItem = ({ amount, title, icon }) => {
        return (
            <Tooltip label={
                <Center flex flexDir={"column"} gap={4}>
                    <Text>The amount of Dusts increase the chance of the pokemon to level up</Text>
                </Center>
            } p={4} borderRadius={8}>
                <Center p={4} borderRadius={8} backgroundColor={"gray.500"} minH={16} minW={16}>
                    <Text position="absolute" mr={6} fontSize={"2xs"}>{amount}x</Text>
                    <Image
                        position="absolute" ml={6}
                        title={title}
                        src={icon}
                        w={8}
                    />
                </Center>
            </Tooltip>
        )
    }

    const AppliedBerry = ({ berry }) => {
        return (
            <Tooltip label={
                <Center flex flexDir={"column"} gap={4}>
                    <Text>{berry.effect.description}</Text>
                    <Text>{berry.turns} turns left</Text>
                </Center>
            } p={4} borderRadius={8}>
                <Center p={4} borderRadius={8} backgroundColor={"gray.500"} maxH={16}>
                    <Image
                        title={berry.name}
                        src={getBerryIcon(berry.type)}
                        w={8}
                    />
                </Center>
            </Tooltip>
        )
    }

    useEffect(() => {
        if (selectedPokemon) {
            const levelChance = upgradePokemonLevelChance({ sessionLevel: session.level, pokeLevel: selectedPokemon.level, dusts: selectedPokemon.dust, berries: selectedPokemon.berries })
            setChanceToLevelUp(levelChance)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPokemon, selectedPokemon?.dust, selectedPokemon?.berries])

    return (
        <Center backgroundColor={"gray.600"} minW={"full"} h={96} borderRadius={8} p={12}>
            {selectedPokemon && (
                <Center position="relative">
                    <SelectedPokemonCard />
                    <Center flex flexDir="column" gap={2}>
                        <AppliedItem amount={selectedPokemon.dust} title={'dust'} icon={dustIcon} />
                        {selectedPokemon.berries?.map((berry, index) => (
                            <AppliedBerry key={index} berry={berry} />
                        ))}
                    </Center>
                    <ChanceToLevelUp />
                </Center>
            )}
        </Center>
    )
}