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
import { useTranslation } from "react-i18next"

export default function SelectPokemonModal({ isOpen, onClose, selectedItem, isDust }) {
    const {
        getTeamPokemons,
        emit,
        setLoading,
        handleToast,
        updatePokemon,
        setBerries,
    } = useContext(PlayerContext)
    const { t } = useTranslation()

    const handleDust = async (pokemon) => {
        if ((pokemon.dust || 0) >= 5) {
            handleToast({
                id: 'dust-max',
                title: t('items.maxDustReached'),
                description: t('items.maxDustDesc', { name: stringToUpperCase(pokemon.name) }),
                status: 'warning',
                position: 'top',
            })
            return
        }

        setLoading({ loading: true, text: t('items.applyingDust') })
        try {
            const result = await emit('player-use-dust', { pokemon })
            if (result?.pokemon) {
                updatePokemon(result.pokemon.id, result.pokemon)
            }
        } catch (err) {
            handleToast({
                id: 'dust-error',
                title: t('items.failedUseDust'),
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
                title: t('items.berryDenied', { name: stringToUpperCase(pokemon.name) }),
                description: t('items.berryActiveDesc', { name: stringToUpperCase(pokemon.name), berry: berry.name }),
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
                title: t('items.berrySlotsFull'),
                description: t('items.berrySlotDesc', { name: stringToUpperCase(pokemon.name) }),
                status: 'warning',
                position: 'top',
            })
            return
        }

        setLoading({ loading: true, text: t('items.applyingBerry') })
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
                title: t('items.failedUseBerry'),
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
        ? t('items.dustDesc')
        : selectedItem?.effect?.description

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">
                    <Center flexDir="column" gap={2}>
                        <Text fontSize="md">{t('items.useItem', { itemName })}</Text>
                        <Image src={itemIcon} fallbackSrc={berryIcon} w={10} />
                        <Text fontSize="xs" fontWeight="normal" color="gray.300">{itemDescription}</Text>
                    </Center>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text fontSize="sm" textAlign="center" mb={4}>{t('items.selectPokemon')}</Text>
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
