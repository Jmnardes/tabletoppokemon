import { Button, Flex } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import PokeballButton from "../DiceButton/PokeballButton";

export default function EncounterBalls({ children, handleCatchDiceRoll }) {
    const { game, player, updateBall, updateGame, session } = useContext(PlayerContext)

    const handleBallClick = (qty, type, bonus) => {
        updateBall(qty, type)
        updateGame({ isPokemonRollDisabled: true })
        handleCatchDiceRoll(bonus)
    }

    return (
        <>
            {session.turns > 0 && (
                <Flex flexDirection="column" mr={8}>
                    <Button
                        my={2}
                        title="Poke Ball"
                        isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'pokeball', 0)}
                    >
                        <PokeballButton type={'pb'} />
                    </Button>
                    <Button
                        my={2}
                        title="Great Ball"
                        isDisabled={player.balls.greatball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'greatball', 2)}
                    >
                        <PokeballButton type={'gb'} />
                    </Button>

                    <Button 
                        my={2}
                        title="Ultra Ball"
                        isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'ultraball', 5)}
                    >
                        <PokeballButton type={'ub'} />
                    </Button>

                    <Button 
                        my={2}
                        title="Master Ball"
                        isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'masterball', 15)}
                    >
                        <PokeballButton type={'mb'} />
                    </Button>
                </Flex>
            )}
            {children}
        </>
    )
}