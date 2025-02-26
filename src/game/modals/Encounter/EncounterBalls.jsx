import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import PokeballButton from "@components/AnimatedButton/Pokeball/PokeballButton";

export default function EncounterBalls({ children, handleCatchDiceRoll, isStarter }) {
    const { game, emit, player, updateBall, updateGame } = useContext(PlayerContext)

    const handleBallClick = (type, bonus, roll) => {
        const ballCatchBonus = player.catchBonus.balls
        const newBonus = (ballCatchBonus.find(ball => ball.type === type)?.bonus || 0) + bonus
        updateBall(-1, type)
        emit('player-use-ball', {catchRoll: roll + bonus, ballType: type })
        updateGame({ isPokemonRollDisabled: true })
        handleCatchDiceRoll(roll + newBonus)
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
                            isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('pokeball', ballBonus.pokeball, roll)}
                            bonus={ballBonus.pokeball}
                        />
                    </Box>
                    <Box my={2} title="Great Ball">
                        <PokeballButton
                            type={'gb'}
                            isDisabled={player.balls.greatball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('greatball', ballBonus.greatball, roll)}
                            bonus={ballBonus.greatball}
                        />
                    </Box>

                    <Box my={2} title="Ultra Ball">
                        <PokeballButton 
                            type={'ub'}
                            isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick('ultraball', ballBonus.ultraball, roll)} 
                            bonus={ballBonus.ultraball}
                        />
                    </Box>

                    <Box my={2} title="Master Ball">
                        <PokeballButton 
                            type={'mb'}
                            isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
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