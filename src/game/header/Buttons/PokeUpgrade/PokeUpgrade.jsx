import { useContext, useEffect, useState } from "react"
import { Text, Center, Image, Wrap, Box } from "@chakra-ui/react"

import PlayerContext from "@Contexts/PlayerContext"
import SelectedToUpgrade from "./SelectedToUpgrade"
import ConfirmationModal from "@components/Modal/ConfirmationModal"
import { taskTypeEnum } from "@enum"
import { getBerryIcon } from "@utils/berryIcon"
import { berryExistsInBerries, stringToUpperCase } from "@utils"

import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png';

export default function PokeUpgrade({ selectedPokemon, setSelectedPokemon }) {
    const { 
        player, 
        emit, 
        setLoading, 
        handleToast,
        updatePokemonOnTeam, 
        berries, 
    } = useContext(PlayerContext)
    const [ upgrades, setUpgrades ] = useState([ { type: 'dust', amount: player.items.dust }, ...berries ])

    const handleDust = () => {
        const pokemon = selectedPokemon

        emit('player-update-task', { type: taskTypeEnum.useDust, amount: 1 })
        emit('player-use-dust', { pokemon: pokemon })
        setLoading({ loading: true, text: "Applying dust..." })
    }
    
    const handleBerry = (berry) => {
        const pokemon = selectedPokemon

        if (berryExistsInBerries({ berries: pokemon.berries, berryType: berry.type })) {
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
        setLoading({ loading: true, text: "Applying berry..." })
    }

    const UpgradeSlot = ({ item, isDust }) => {
        const modalTitle = `Use ${isDust ? 'dust' : (item.name + ' berry')}?`
        const description = isDust
            ? "By using a Dust in your pokemon, you will increase the chance for him to level up on the next turn, but it will only apply the next turn. The more Dusts you use higher are the chances."
            : (item.effect.description + `The berry has ${item.turns} turns duration.`)
        const isDisabled = isDust 
            ? item.amount === 0 || !selectedPokemon 
            : item.amount === 0 || !selectedPokemon || selectedPokemon.berries.length === 3
        const name = isDust ? 'Dust' : item.name
        const icon = isDust ? dustIcon : getBerryIcon(item.type)

        return (
                <ConfirmationModal
                    event={() => isDust ? handleDust() : handleBerry(item)} 
                    modalTitle={modalTitle}
                    modalText={description}
                    cursor={"pointer"}
                    isDisabled={isDisabled}
                    borderRadius={8}
                    flexDir={"column"}
                    h={28} w={28}
                >
                    <Text mb={4} fontSize={"xs"} title={description}>{name}</Text>
                    <Center title={description}>
                        <Text fontSize={"xs"}>{item.amount}x</Text>
                        <Image
                            src={icon}
                            w={12}
                        ></Image>
                    </Center>
                </ConfirmationModal>
        )
    }

    useEffect(() => {
        setUpgrades([ { type: 'dust', amount: player.items.dust }, ...berries ])
    }, [player.items.dust, berries])

    return (
        <>
            <Center justifyContent={"space-around"} py={4} px={24}>
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Selected Pokémon</Text>
                    <SelectedToUpgrade selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                </Center>
                
                <Center flexDir={"column"} w={"100%"} mx={4}>
                    <Text mb={4}>Upgrades</Text>
                    <Box backgroundColor={"gray.600"} minW={"full"} minH={96} borderRadius={8}>
                        <Wrap p={4} justify={"center"}>
                            {upgrades.map((upgradeItem, index) => (
                                <UpgradeSlot key={index} item={upgradeItem} isDust={upgradeItem.type === 'dust'} />
                            ))}
                        </Wrap>
                    </Box>
                </Center>
            </Center>
        </>
    )
}