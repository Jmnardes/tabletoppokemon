import { Center, Image, Text } from "@chakra-ui/react"
import Card from "../../../../components/Pokemon/Card"

import dustIcon from '@assets/images/items/dust.png'

export default function SelectedPokemon({ selectedPokemon, items }) {
    return (
        <>
            {selectedPokemon && (
                <Center>
                    <Card poke={selectedPokemon} />
                    <Text ml={4} fontSize={"2xs"}>{selectedPokemon.dust}x</Text>
                    <Image
                        src={dustIcon}
                        title={'dust'}
                        w={8}
                    ></Image>
                </Center>
            )}
        </>
    )
}