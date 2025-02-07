import { useContext, useEffect, useState } from "react"
import { Text, Center, Image, Wrap, Box } from "@chakra-ui/react"

import PlayerContext from "@Contexts/PlayerContext"
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import { taskTypeEnum } from "@enum"
import { getBerryIcon } from "@utils/berryIcon"
import SelectedToUseBerry from "./SelectedToUseBerry"

export default function BerriesPage({ selectedPokemon, setSelectedPokemon }) {
    const { player, updatePokemonOnTeam, emit, berries, setBerries } = useContext(PlayerContext)

    const handleBerry = (berry) => {
        const pokemon = selectedPokemon
        pokemon.berries.push(berry)

        emit('player-update-task', { type: taskTypeEnum.useBerry, amount: 1 })
        emit('player-use-berry', { berry, pokeId: pokemon.id })
        updatePokemonOnTeam(pokemon)
    }

    const BerrySlot = ({ berry }) => {
        {console.log('berry')}
        return (
            <ConfirmationModal
                event={() => handleBerry(berry)} 
                modalTitle={`Are you sure you want to use ${berry.name} berry?`}
                modalText={berry.effect.description} title={berry.effect.description}
                cursor={"pointer"}
                isDisabled={berry.amount === 0 || !selectedPokemon || selectedPokemon.berries.length === 3}
                borderRadius={8}
                flexDir={"column"}
                h={28} w={28}
            >
                    <Text mb={4} fontSize={"xs"}>{berry.name}</Text>
                    <Center>
                        <Text fontSize={"xs"}>{berry.amount}x</Text>
                        <Image
                            src={getBerryIcon(berry.type)}
                            title={berry.name}
                            w={12}
                        ></Image>
                    </Center>
            </ConfirmationModal>
        )
    }

    useEffect(() => {
        setBerries(player.berries)
    }, [player.berries])

    return (
        <>
            <Center justifyContent={"space-around"} py={4} px={24}>
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Selected Pokémon</Text>
                    <SelectedToUseBerry selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                </Center>
                
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Your Berries</Text>
                    <Box backgroundColor={"gray.600"} minW={"full"} minH={96} borderRadius={8}>
                        <Wrap p={4} justify={"center"}>
                            {berries.map((berry, index) => (
                                <BerrySlot key={index} berry={berry} />
                            ))}
                        </Wrap>
                    </Box>
                </Center>
            </Center>
        </>
    )
}