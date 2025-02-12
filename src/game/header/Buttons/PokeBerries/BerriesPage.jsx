import { useContext } from "react"
import { Text, Center, Image, Wrap, Box } from "@chakra-ui/react"

import PlayerContext from "@Contexts/PlayerContext"
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import { getBerryIcon } from "@utils/berryIcon"
import SelectedToUseBerry from "./SelectedToUseBerry"
import { pokemonHasBerry } from "@utils"

import berryIcon from '@assets/images/berries/berry.png';
import { stringToUpperCase } from "../../../../utils"

export default function BerriesPage({ selectedPokemon, setSelectedPokemon }) {
    const { updatePokemonOnTeam, emit, berries, handleToast, setLoadingApi, setLoadingText } = useContext(PlayerContext)

    const handleBerry = (berry) => {
        const pokemon = selectedPokemon

        if (pokemonHasBerry(pokemon, berry.type)) {
            handleToast({
                id: 'berry-exists',
                title: `${stringToUpperCase(pokemon.name)} denied`,
                description: `${stringToUpperCase(pokemon.name)} already ate a ${berry.name} berry before and it's effect still up, try again later!`,
                icon: <Image 
                        width="32px"
                        src={getBerryIcon(berry.type)}
                        fallbackSrc={berryIcon}
                    ></Image>,
                position: 'top',
                duration: 6000,
                status: 'warning',
            })

            return
        }

        pokemon.berries.push(berry)

        emit('player-use-berry', { berry, pokeId: pokemon.id })
        updatePokemonOnTeam(pokemon)
        setLoadingText('Applying berry...')
        setLoadingApi(true)
    }

    const BerrySlot = ({ berry }) => {
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
                backgroundColor={"gray.500"}
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