import { useContext, useEffect, useState } from "react"
import { Text, Center, Image, Wrap, Box } from "@chakra-ui/react"
import SelectedPokemon from "./SelectedPokemon"
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import { taskTypeEnum } from "@enum"

import PlayerContext from "@Contexts/PlayerContext"
import dustIcon from '@assets/images/items/dust.png'

export default function PokeUpgrade({ selectedPokemon, setSelectedPokemon }) {
    const { player, updateItem, updatePokemonOnTeam, emit } = useContext(PlayerContext)
    const [ items, setItems ] = useState(player.items)

    const handleUseItem = (item) => {
        switch (item) {
            case "dust":
                handleDust()
                break
            default:
                break
        }
    }

    const handleDust = () => {
        const pokemon = selectedPokemon
        pokemon.dust += 1

        emit('player-update-task', { type: taskTypeEnum.useDust, amount: 1 })
        updateItem(-1, 'dust')
        updatePokemonOnTeam(pokemon)
    }

    const ShowItem = ({ itemName, itemKey, icon, amount, text }) => {
        return (
            <ConfirmationModal
                event={() => handleUseItem(itemKey)} 
                modalTitle={`Are you sure you want to use ${itemName}?`}
                modalText={text}
                title={text}
                cursor={"pointer"}
                isDisabled={amount === 0 || !selectedPokemon}
                borderRadius={8}
                flexDir={"column"}
                h={28}
                w={28}
            >
                    <Text mb={4} fontSize={"xs"}>{itemName}</Text>
                    <Center>
                        <Text fontSize={"xs"}>{amount}x</Text>
                        <Image
                            src={icon}
                            title={itemName}
                            w={12}
                        ></Image>
                    </Center>
            </ConfirmationModal>
        )
    }

    useEffect(() => {
        setItems(player.items)
    }, [player.items])

    return (
        <>
            <Center justifyContent={"space-around"} py={4} px={24}>
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Selected Pokémon</Text>
                    <SelectedPokemon selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                </Center>
                
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Poke Items</Text>
                    <Box backgroundColor={"gray.600"} minW={"full"} minH={96} borderRadius={8}>
                        {items &&
                            <Wrap p={4} justify={"center"}>
                                <ShowItem 
                                    itemName={"Dust"} 
                                    itemKey="dust" 
                                    amount={items.dust} 
                                    icon={dustIcon} 
                                    text={"By using a Dust in your pokemon, you will increase the chance for him to level up on the next turn, but it will only apply the next turn. The more Dusts you use higher are the chances."}
                                />
                            </Wrap>
                        }
                    </Box>
                </Center>
            </Center>
        </>
    )
}