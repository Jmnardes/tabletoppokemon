import { useContext } from "react"
import { Image, Text } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import DayCareContent from "./DayCareContent"
import GenericModal from "@components/Modal/GenericModal"

import DayCareShop from "./DayCareShop"
import tokenIcon from '@assets/images/game/coin.png'

export default function DayCareModal() {
    const { updateGame, getBoxPokemons, setLoading, emit, syncBoxFromServer, updateDaycareToken, setDaycarePokes, handleToast } = useContext(PlayerContext)

    const boxPokemons = getBoxPokemons()

    const handleTrade = async (pokemon) => {
        setLoading({ loading: true, text: `Releasing pokémon...` })
        
        try {
            // Aguarda resposta do servidor com os dados do release
            const result = await emit('daycare-pokemon-release', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
            
            // Atualiza estado local baseado na resposta do servidor
            if (result) {
                syncBoxFromServer(result.pokeBox)
                updateDaycareToken(result.token)
                setDaycarePokes(prevPokes => [...prevPokes, result.pokemon])
                handleToast({
                    title: 'Daycare Token',
                    description: `Your ${result.pokemon.name} will be treated with kindness, you received ${result.token} token(s)`,
                    status: 'info',
                    duration: 6000,
                    icon: <Image src={tokenIcon} w={12} />
                })
            }
            
            setLoading({ loading: false })
        } catch (error) {
            setLoading({ loading: false })
            handleToast({
                id: 'release-pokemon-error',
                title: 'Error releasing pokémon',
                description: error.message || 'Connection error. Please try again.',
                status: 'error',
                position: 'top'
            })
            console.error('Error releasing pokemon to daycare:', error)
        }
    };

    return (
        <GenericModal
            title={"Poke Day Care"}
            closeButton={true}
            onModalClose={() => updateGame({ openDayCareModal: false })}
        >
            <Text fontSize={"small"} textAlign={"center"}>Select a pokémon to leave in Daycare dependencies</Text>
            {boxPokemons.length < 1 ? (
                <Text h={28} textAlign={"center"} mt={20} color={"red.400"}>
                    You don't have Pókemons to leave on Daycare
                </Text>
            ) : (
                <DayCareContent handleTrade={handleTrade} pokeBox={boxPokemons} />
            )}
            <DayCareShop />
        </GenericModal>
    )
}