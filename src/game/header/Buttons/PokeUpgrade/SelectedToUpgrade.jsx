import { Center, Image, Text, Tooltip } from "@chakra-ui/react"

import CardTitle from "@features/pokemon/CardTitle"
import { PokeRarity } from "@features/pokemon/PokemonRarity"
import { getBerryIcon } from "@utils/berryIcon"
import { stringToUpperCase } from '@utils'

import dustIcon from '@assets/images/items/dust.png'
import ChanceToLevelUp from "@features/pokemon/ChanceToLevelUp"

export default function SelectedToUpgrade({ selectedPokemon, setSelectedPokemon }) {

    const SelectedPokemonCard = () => {
        return (
            <Center
                onClick={() => setSelectedPokemon(null)}
                _hover={{ opacity: 0.8 }}
                cursor={"pointer"}
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={4} mx={2} w={52}
            >
                <Center position="absolute" flex flexDirection="column" top={-8}>
                    <Text fontSize={"x-small"}>Lv.{selectedPokemon.level}</Text>
                    <CardTitle poke={selectedPokemon} />
                    <PokeRarity rarity={selectedPokemon.rarity.rarity} />
                </Center>
                <Image
                    w={28}
                    my={2}
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
                    <Text>Grants +1 EXP at the end of each turn. Only 1 dust is consumed per turn. Can be stacked up to 5.</Text>
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

    return (
        <Center backgroundColor={"gray.600"} minW={"full"} h={64} borderRadius={8} p={6}>
            {selectedPokemon && (
                <Center position="relative">
                    <SelectedPokemonCard />
                    <Center flex flexDir="column" gap={2}>
                        <AppliedItem amount={selectedPokemon.dust} title={'dust'} icon={dustIcon} />
                        {selectedPokemon.berries?.map((berry, index) => (
                            <AppliedBerry key={index} berry={berry} />
                        ))}
                    </Center>
                    <ChanceToLevelUp selectedPokemon={selectedPokemon} />
                </Center>
            )}
        </Center>
    )
}