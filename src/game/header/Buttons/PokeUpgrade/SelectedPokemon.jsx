import { Center, Divider, Image, Text } from "@chakra-ui/react"

import CardTitle from "@components/Pokemon/CardTitle"
import { stringToUpperCase } from '@utils'
import { glowAnimation } from "@utils/animations"

import dustIcon from '@assets/images/items/dust.png'
import { PokeRarity } from "@components/Pokemon/PokemonRarity"

export default function SelectedPokemon({ selectedPokemon, setSelectedPokemon }) {
    const SelectedPokemonCard = () => {
        return (
            <Center
                alignItems="center"
                flexDirection="column"
                borderRadius={8}
                p={2} mx={2} w={64}
                animation={selectedPokemon.dust ? `${glowAnimation} 4s infinite ease-in-out` : null}
                style={{
                    '--glow-size': `${Math.min(selectedPokemon.dust, 3) * 20}px`,
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
                    <Text ml={4} fontSize={"2xs"}>{selectedPokemon.dust}x</Text>
                    <Image
                        src={dustIcon}
                        title={'dust'}
                        w={8}
                    />
                </Center>
            )}
        </Center>
    )
}