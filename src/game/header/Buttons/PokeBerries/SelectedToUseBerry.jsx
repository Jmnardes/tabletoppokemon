import { Center, Divider, Image } from "@chakra-ui/react"

import CardTitle from "@components/Pokemon/CardTitle"
import { PokeRarity } from "@components/Pokemon/PokemonRarity"
import { stringToUpperCase } from '@utils'
import { getBerryIcon } from "@utils/berryIcon"

export default function SelectedToUseBerry({ selectedPokemon, setSelectedPokemon }) {
    const SelectedPokemonCard = () => {
        return (
            <Center
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={2} mx={2} w={64}
            >
                <PokeRarity rarity={selectedPokemon.rarity.rarity} />
                <Divider my={2} />
                Lv.{selectedPokemon.level}
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

    const AppliedBerry = ({ berry }) => {
        return (
            <Center p={4} borderRadius={8} backgroundColor={"gray.500"}>
                <Image
                    title={berry.name}
                    src={getBerryIcon(berry.type)}
                    w={8}
                />
            </Center>
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
                    <Center ml={12} flex flexDir={"column"} gap={6}>
                        {selectedPokemon.berries?.map((berry, index) => (
                            <AppliedBerry key={index} berry={berry} />
                        ))}
                    </Center>
                </Center>
            )}
        </Center>
    )
}