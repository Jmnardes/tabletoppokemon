import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import PokeballButton from "@components/AnimatedButton/Pokeball/PokeballButton";

export default function EncounterBalls({ children, handleCatchDiceRoll, isStarter }) {
    const { game, emit, player, updateBall, updateGame, handleToast } = useContext(PlayerContext)

    const handleBallClick = async (type, bonus, roll) => {
        const ballCatchBonus = player.catchBonus?.balls
        const newBonus = (ballCatchBonus?.find(ball => ball.type === type)?.bonus || 0) + bonus
        
        // Desabilita botões imediatamente para prevenir double-click
        updateGame({ isPokemonRollDisabled: true })
        
        try {
            // Aguarda confirmação do servidor ANTES de atualizar estado
            await emit('player-use-ball', {catchRoll: roll + bonus, ballType: type })
            
            // Atualiza ball após confirmação do servidor
            await updateBall(-1, type)
            handleCatchDiceRoll(roll + newBonus)
        } catch (error) {
            // Em caso de erro, re-habilita os botões e mostra mensagem
            updateGame({ isPokemonRollDisabled: false })
            handleToast({
                id: 'use-ball-error',
                title: 'Error using Pokeball',
                description: error.message || 'Connection error. Please try again.',
                status: 'error',
                position: 'top'
            })
            console.error('Error using ball:', error)
        }
    }

    const ballBonus = {
        'pokeball': 0,
        'greatball': 3,
        'ultraball': 6,
        'masterball': 10
    }

    return (
        <>
            {!isStarter && (
                <Flex flexDirection="column" mr={8}>
                    <Box my={2} title="Poke Ball">
                        <PokeballButton 
                            type={'pb'}
                            isDisabled={player.balls?.pokeball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('pokeball', ballBonus.pokeball, roll)}
                            bonus={ballBonus.pokeball}
                        />
                    </Box>
                    <Box my={2} title="Great Ball">
                        <PokeballButton
                            type={'gb'}
                            isDisabled={player.balls?.greatball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('greatball', ballBonus.greatball, roll)}
                            bonus={ballBonus.greatball}
                        />
                    </Box>

                    <Box my={2} title="Ultra Ball">
                        <PokeballButton 
                            type={'ub'}
                            isDisabled={player.balls?.ultraball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('ultraball', ballBonus.ultraball, roll)} 
                            bonus={ballBonus.ultraball}
                        />
                    </Box>

                    <Box my={2} title="Master Ball">
                        <PokeballButton 
                            type={'mb'}
                            isDisabled={player.balls?.masterball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('masterball', ballBonus.masterball, roll)} 
                            bonus={ballBonus.masterball}
                        />
                    </Box>
                </Flex>
            )}
            {children}
        </>
    )
}