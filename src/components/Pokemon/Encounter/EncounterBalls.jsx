import { Button, Flex, Image } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

export default function EncounterBalls({ children, handleCatchDiceRoll }) {
    const { game, player, updateBall, updateGame, session } = useContext(PlayerContext)

    const handleBallClick = (qty, type, bonus) => {
        updateBall(qty, type)
        updateGame({ isPokemonRollDisabled: true })
        handleCatchDiceRoll(bonus)
    }

    const ballRollAnimation = { transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }

    return (
        <>
            {session.turns > 0 && (
                <Flex flexDirection="column" mr={8}>
                    <Button
                        my={2}
                        title="Poke Ball"
                        isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'pokeball', 2)}
                    >
                        <Image
                            src={greatballIcon} 
                            alt={'pokeball'}
                            w="36px"
                            _hover={ballRollAnimation}
                        ></Image>
                    </Button>
                    <Button
                        my={2}
                        title="Great Ball"
                        isDisabled={player.balls.greatball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'greatball', 3)}
                    >
                        <Image
                            src={superballIcon} 
                            alt={'greatball'}
                            w="36px"
                            _hover={ballRollAnimation}
                        ></Image>
                    </Button>

                    <Button 
                        my={2}
                        title="Ultra Ball"
                        isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'ultraball', 5)}
                    >
                        <Image
                            src={ultraballIcon} 
                            alt={'ultraball'}
                            w="36px"
                            _hover={ballRollAnimation}
                        ></Image>
                    </Button>

                    <Button 
                        my={2}
                        title="Master Ball"
                        isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
                        onClick={() => handleBallClick(-1, 'masterball', 15)}
                    >
                        <Image
                            src={masterballIcon} 
                            alt={'masterball'}
                            w="36px"
                            _hover={ballRollAnimation}
                        ></Image>
                    </Button>
                </Flex>
            )}
            {children}
        </>
    )
}