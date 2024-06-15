import { Box, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import PokeballButton from "../DiceButton/PokeballButton";

export default function EncounterBalls({ children, handleCatchDiceRoll, isStarter }) {
    const { game, player, updateBall, updateGame } = useContext(PlayerContext)

    const handleBallClick = (updateAmount, type, bonus, roll) => {
        updateBall(updateAmount, type)
        updateGame({ isPokemonRollDisabled: true })
        handleCatchDiceRoll(roll + bonus)
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
                            onRoll={(roll) => handleBallClick(-1, 'greatball', 2, roll)}
                            bonus={2}
                        />
                    </Box>

                    <Box my={2} title="Ultra Ball">
                        <PokeballButton 
                            type={'ub'}
                            isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'ultraball', 5, roll)} 
                            bonus={5}
                        />
                    </Box>

                    <Box my={2} title="Master Ball">
                        <PokeballButton 
                            type={'mb'}
                            isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
                            onRoll={(roll) => handleBallClick(-1, 'masterball', 99, roll)} 
                            bonus={99}
                        />
                    </Box>
                </Flex>
            )}
            {children}
        </>
    )
}