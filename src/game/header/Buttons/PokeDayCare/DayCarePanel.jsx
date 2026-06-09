import { useContext } from "react"
import { Flex, Image, Text } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"
import PokeList from "@features/pokemon/PokeList"

import DayCareShop from "./DayCareShop"
import tokenIcon from '@assets/images/game/coin.png'

export default function DayCarePanel() {
    const { getBoxPokemons, setLoading, emit, syncBoxFromServer, setPlayer, setDaycarePokes, handleToast } = useContext(PlayerContext)

    const boxPokemons = getBoxPokemons()

    const handleTrade = async (pokemon) => {
        setLoading({ loading: true, text: `Releasing pokémon...` })
        
        try {
            const result = await emit('daycare-pokemon-release', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
            
            if (result) {
                syncBoxFromServer(result.pokeBox)
                
                if (result.daycare) {
                    setPlayer(prev => ({ ...prev, daycare: result.daycare }))
                }
                
                setDaycarePokes(prevPokes => [...prevPokes, pokemon])
                
                handleToast({
                    title: 'Daycare Token',
                    description: `Your ${pokemon.name} will be treated with kindness`,
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
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Poke Day Care</Text>
            <Text fontSize="small" textAlign="center" mt={2}>Select a pokémon to leave in Daycare dependencies</Text>
            {boxPokemons.length < 1 ? (
                <Text h={28} textAlign="center" mt={20} color="red.400">
                    You don't have Pókemons to leave on Daycare
                </Text>
            ) : (
                <PokeList
                    pokemons={boxPokemons}
                    onSelect={handleTrade}
                    size="xs"
                    confirmAction={(poke) => ({
                        title: "Leave on Day Care",
                        text: `You will receive ${poke.rarity.rarity + 1} Daycare Tokens for him.`,
                    })}
                />
            )}
            <DayCareShop />
        </Flex>
    )
}
