import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import PokeballButton from "@components/AnimatedButton/Pokeball/PokeballButton";

export default function EncounterBalls({ children, handleCatchDiceRoll, isStarter }) {
    const { game, emit, player, updateBall, updateGame } = useContext(PlayerContext)

    const handleBallClick = (updateAmount, type, bonus, roll) => {
        const ballCatchBonus = player.catchBonus.balls
        const newBonus = (ballCatchBonus.find(ball => ball.type === type)?.bonus || 0) + bonus
        updateBall(updateAmount, type)
        emit('player-use-ball', {catchRoll: roll + bonus, ballType: type })
        updateGame({ isPokemonRollDisabled: true })
        handleCatchDiceRoll(roll + newBonus)
    }

    return (
        <>
            {!isStarter && (
                <Flex flexDirection="column" mr={8}>
                    <Box my={2} title="Poke Ball">
                        <PokeballButton 
                            type={'pb'}
                            isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'pokeball', 0, roll)}
                            bonus={0}
                        />
                    </Box>
                    <Box my={2} title="Great Ball">
                        <PokeballButton
                            type={'gb'}
                            isDisabled={player.balls.greatball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'greatball', 3, roll)}
                            bonus={3}
                        />
                    </Box>

                    <Box my={2} title="Ultra Ball">
                        <PokeballButton 
                            type={'ub'}
                            isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'ultraball', 6, roll)} 
                            bonus={6}
                        />
                    </Box>

                    <Box my={2} title="Master Ball">
                        <PokeballButton 
                            type={'mb'}
                            isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'masterball', 10, roll)} 
                            bonus={10}
                        />
                    </Box>
                </Flex>
            )}
            {children}
        </>
    )
}