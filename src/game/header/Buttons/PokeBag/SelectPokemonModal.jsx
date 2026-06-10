import { useContext } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Center,
    Image,
    Text,
} from "@chakra-ui/react"

import PlayerContext from "@context/PlayerContext"
import PokeList from "@features/pokemon/PokeList"
import { getBerryIcon } from "@utils/berryIcon"
import { berryExistsInBerries, stringToUpperCase } from "@utils"

import dustIcon from '@assets/images/items/dust.png'
import berryIcon from '@assets/images/berries/berry.png'

export default function SelectPokemonModal({ isOpen, onClose, selectedItem, isDust }) {
    const {
        getTeamPokemons,
        emit,
        setLoading,
        handleToast,
        updatePokemon,
        setBerries,
    } = useContext(PlayerContext)

    const handleDust = async (pokemon) => {
        if ((pokemon.dust || 0) >= 5) {
            handleToast({
                id: 'dust-max',
                title: 'Max dust reached',
                description: `${stringToUpperCase(pokemon.name)} already has the max of 5 dusts.`,
                status: 'warning',
                position: 'top',
            })
            return
        }

        setLoading({ loading: true, text: "Applying dust..." })
        try {
            const result = await emit('player-use-dust', { pokemon })
            if (result?.pokemon) {
                updatePokemon(result.pokemon.id, result.pokemon)
            }
        } catch (err) {
            handleToast({
                id: 'dust-error',
                title: 'Failed to use dust',
                description: err.message,
                status: 'error',
                position: 'top',
            })
        } finally {
            setLoading({ loading: false })
            onClose()
        }
    }

    const handleBerry = async (pokemon) => {
        const berry = selectedItem

        if (berryExistsInBerries({ berries: pokemon.berries, berryType: berry.type })) {
            handleToast({
                id: 'berry-exists',
                title: `${stringToUpperCase(pokemon.name)} denied`,
                description: `${stringToUpperCase(pokemon.name)} already ate a ${berry.name} berry and its effect is still active!`,
                icon: <Image
                    width="32px"
                    src={getBerryIcon(berry.type)}
                    fallbackSrc={berryIcon}
                />,
                position: 'top',
                duration: 6000,
                status: 'warning',
            })
            return
        }

        if (pokemon.berries.length >= 3) {
            handleToast({
                id: 'berry-full',
                title: 'Berry slots full',
                description: `${stringToUpperCase(pokemon.name)} already has 3 berries applied.`,
                status: 'warning',
                position: 'top',
            })
            return
        }

        setLoading({ loading: true, text: "Applying berry..." })
        try {
            const result = await emit('player-use-berry', { berry, pokeId: pokemon.id })
            if (result?.pokemon) {
                updatePokemon(result.pokemon.id, result.pokemon)
            }
            if (result?.berries) {
                setBerries(result.berries)
            }
        } catch (err) {
            handleToast({
                id: 'berry-error',
                title: 'Failed to use berry',
                description: err.message,
                status: 'error',
                position: 'top',
            })
        } finally {
            setLoading({ loading: false })
            onClose()
        }
    }

    const handleSelect = (pokemon) => {
        if (isDust) {
            handleDust(pokemon)
        } else {
            handleBerry(pokemon)
        }
    }

    const itemName = isDust ? 'Dust' : (selectedItem?.name + ' Berry')
    const itemIcon = isDust ? dustIcon : getBerryIcon(selectedItem?.type)
    const itemDescription = isDust
        ? "Grants +1 EXP at the end of each turn. Only 1 dust is consumed per turn. Can be stacked up to 5."
        : selectedItem?.effect?.description

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">
                    <Center flexDir="column" gap={2}>
                        <Text fontSize="md">Use {itemName}</Text>
                        <Image src={itemIcon} fallbackSrc={berryIcon} w={10} />
                        <Text fontSize="xs" fontWeight="normal" color="gray.300">{itemDescription}</Text>
                    </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text fontSize="sm" textAlign="center" mb={4}>Select a pokémon from your team:</Text>
                    <PokeList
                        pokemons={getTeamPokemons()}
                        onSelect={handleSelect}
                        size="sm"
                        layout="wrap"
                        showTooltip={true}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
