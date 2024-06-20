import PlayerContext from "../../../../Contexts/PlayerContext"
import { useContext, useEffect, useState } from "react"
import { Text, Center } from "@chakra-ui/react"
import SelectedPokemon from "./SelectedPokemon"

export default function PokeItems({ selectedPokemon }) {
    const { player } = useContext(PlayerContext)
    const [ items, setItems ] = useState(player.items)

    const ShowItem = ({ itemName, amount, icon }) => {
        return (
            <Center mt={4} mb={4}>
                <Text>{itemName}</Text>
                <Text>{amount}</Text>
            </Center>
        )
    }

    useEffect(() => {
        setItems(player.items)
    }, [player.items])

    return (
        <>
            <Center justifyContent={"space-around"} py={4} px={24}>
                <SelectedPokemon selectedPokemon={selectedPokemon} />

                <Center flexDir={"column"}>
                    <Text mb={6}>Poke Items</Text>

                    {items &&
                        <Center flexDir={"column"}>
                            <ShowItem itemName={"Dust"} amount={items.dust} icon={"dust"} />
                            <ShowItem itemName={"Incense"} amount={items.incense} icon={"incense"} />
                        </Center>
                    }
                </Center>
            </Center>
        </>
    )
}