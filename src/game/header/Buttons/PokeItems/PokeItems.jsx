import { useContext, useEffect, useState } from "react"
import { Text, Center, Image, Wrap, Button } from "@chakra-ui/react"
import SelectedPokemon from "./SelectedPokemon"

import PlayerContext from "@Contexts/PlayerContext"
import incenseIcon from '@images/items/lure.png'
import dustIcon from '@images/items/dust.png'

export default function PokeItems({ selectedPokemon }) {
    const { player, updateItem, updatePokemonOnTeam } = useContext(PlayerContext)
    const [ items, setItems ] = useState(player.items)

    const handleUseItem = (item, amount) => {
        const pokemon = selectedPokemon

        if (amount === 0) {
            return
        }

        pokemon.dust += 1

        updateItem(-1, item)
        updatePokemonOnTeam(pokemon)
    }

    const ShowItem = ({ itemName, itemKey, amount, icon }) => {
        return (
            <Button p={4} h={32} w={40} flexDir={"column"} _hover={{ opacity: 0.8 }} cursor={"pointer"} isDisabled={amount === 0}
                borderRadius={8} backgroundColor={"gray.400"} onClick={() => handleUseItem(itemKey, amount)}
            >
                <Text>{itemName}</Text>
                <Center>
                    <Text>{amount}x</Text>
                    <Image
                        src={icon}
                        title={itemName}
                        w={16}
                    ></Image>
                </Center>
            </Button>
        )
    }

    useEffect(() => {
        setItems(player.items)
    }, [player.items])

    return (
        <>
            <Center justifyContent={"space-around"} py={4} px={24}>
                <Center flexDir={"column"}>
                    <Text mb={6}>Selected Pokémon</Text>
                    <SelectedPokemon selectedPokemon={selectedPokemon} items={items} />
                </Center>

                <Center flexDir={"column"}>
                    <Text mb={6}>Poke Items</Text>

                    {items &&
                        <Wrap flexDir={"column"}>
                            <ShowItem itemName={"Dust"} itemKey="dust" amount={items.dust} icon={dustIcon} />
                            <ShowItem itemName={"Incense"} itemKey="incense" amount={items.incense} icon={incenseIcon} />
                        </Wrap>
                    }
                </Center>
            </Center>
        </>
    )
}