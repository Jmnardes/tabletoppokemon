import { Center, Divider, Image, Text } from "@chakra-ui/react"

import CardTitle from "@components/Pokemon/CardTitle"
import { PokeRarity } from "@components/Pokemon/PokemonRarity"
import { stringToUpperCase } from '@utils'
import { getBerryIcon } from "@utils/berryIcon"
import { glowAnimation } from "@utils/animations"

export default function SelectedToUseBerry({ selectedPokemon, setSelectedPokemon }) {
    const SelectedPokemonCard = () => {
        return (
            <Center
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={2} mx={2} w={64}
                animation={selectedPokemon.berries.length > 0 && `${
                    glowAnimation('rgba(217, 255, 0, 0.7)', 'rgba(208, 255, 0, 0.86)', 'rgba(255, 153, 0, 0.7)', 'rgba(238, 255, 0, 0.82)')
                } 4s infinite ease-in-out`}
                style={{
                    '--glow-size': `${Math.min(selectedPokemon.berries, 3) * 20}px`,
                }}
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
            <>
                <Text ml={4} fontSize={"2xs"}>{berry.amount}x</Text>
                <Image
                    title={berry.name}
                    src={getBerryIcon(berry.type)}
                    w={8}
                />
            </>
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
                    <Center>
                        {selectedPokemon.berries?.map((berry, index) => (
                            <AppliedBerry key={index} berry={berry} />
                        ))}
                    </Center>
                </Center>
            )}
        </Center>
    )
}