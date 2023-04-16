import { Button, Flex, Image } from "@chakra-ui/react"
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'
import { diceRoll } from "../../../util";

export default function EncounterBalls({ children }) {
    const { game, player, updatePlayer } = useContext(PlayerContext)

    const handleCatchDiceRoll = (bonus) => {
        let result = diceRoll(19)
        result += bonus

        return result
    }

    return (
        <>
            <Flex justifyContent="center" my={4}>
                <Button
                    mx={4}
                    title="Poke Ball"
                    isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                    onClick={() => {
                        if(player.balls.pokeball > 0) {
                            updatePlayer(player.balls.pokeball - 1, 'balls', 'pokeball')
                            handleCatchDiceRoll(2)
                        }
                    }}
                >
                    <Image
                        src={greatballIcon} 
                        alt={'pokeball'}
                        w="32px"
                        _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                    ></Image>
                </Button>
                <Button
                    mx={4}
                    title="Great Ball"
                    isDisabled={player.balls.greatball === 0 || game.isPokemonRollDisabled}
                    onClick={() => {
                        if(player.balls.greatball > 0) {
                            updatePlayer(player.balls.greatball - 1, 'balls', 'greatball')
                            handleCatchDiceRoll(3)
                        }
                    }}
                >
                    <Image
                        src={superballIcon} 
                        alt={'greatball'}
                        w="32px"
                        _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                    ></Image>
                </Button>

                <Button 
                    mx={4}
                    title="Ultra Ball"
                    isDisabled={player.balls.ultraball === 0 || game.isPokemonRollDisabled}
                    onClick={() => {
                        if(player.balls.ultraball > 0) {
                            updatePlayer(player.balls.ultraball - 1, 'balls', 'ultraball')
                            handleCatchDiceRoll(5)
                        }
                    }}
                >
                    <Image
                        src={ultraballIcon} 
                        alt={'ultraball'}
                        w="32px"
                        _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                    ></Image>
                </Button>

                <Button 
                    mx={4}
                    title="Master Ball"
                    isDisabled={player.balls.masterball === 0 || game.isPokemonRollDisabled}
                    onClick={() => {
                        if(player.balls.masterball > 0) {
                            updatePlayer(player.balls.masterball - 1, 'balls', 'masterball')
                            handleCatchDiceRoll(15)
                        }
                    }}
                >
                    <Image
                        src={masterballIcon} 
                        alt={'masterball'}
                        w="32px"
                        _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                    ></Image>
                </Button>
            </Flex>
            {children}
        </>
    )
}