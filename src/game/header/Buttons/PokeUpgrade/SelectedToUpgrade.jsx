import { Center, Divider, Image, Text, Tooltip } from "@chakra-ui/react"

import CardTitle from "@components/Pokemon/CardTitle"
import { PokeRarity } from "@components/Pokemon/PokemonRarity"
import { getBerryIcon } from "@utils/berryIcon"
import { stringToUpperCase } from '@utils'

import dustIcon from '@assets/images/items/dust.png'

export default function SelectedToUpgrade({ selectedPokemon, setSelectedPokemon }) {
    const SelectedPokemonCard = () => {
        return (
            <Center
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={2} mx={2} w={64}
            >
                Lv.{selectedPokemon.level}
                <Divider my={2} />
                <PokeRarity rarity={selectedPokemon.rarity.rarity} />
                <CardTitle poke={selectedPokemon} />
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

    return (
        <Center backgroundColor={"gray.600"} minW={"full"} h={96} borderRadius={8} p={12}>
            {selectedPokemon && (
                <Center
                    onClick={() => setSelectedPokemon(null)}
                    _hover={{ opacity: 0.8 }}
                    cursor={"pointer"}
                    position="relative"
                >
                    <SelectedPokemonCard />
                    <Center flex flexDir="column" gap={2}>
                        <AppliedItem amount={selectedPokemon.dust} title={'dust'} icon={dustIcon} />
                        {selectedPokemon.berries?.map((berry, index) => (
                            <AppliedBerry key={index} berry={berry} />
                        ))}
                    </Center>
                </Center>
            )}
        </Center>
    )
}