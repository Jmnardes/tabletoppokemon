import { Button, Flex, Image } from "@chakra-ui/react"
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function Pokeballs({
    setBonusOnCatch,
    handleCatchDiceRoll,
    setEndTurnButton
}) {
    const { game, player, updatePlayer } = useContext(PlayerContext)

    return (
        <Flex justifyContent="center" my={4}>
            <Button
                mx={4}
                title="Poke Ball"
                isDisabled={player.balls.pokeball === 0 || game.isPokemonRollDisabled}
                onClick={() => {
                    if(player.balls.pokeball > 0) {
                        updatePlayer(player.balls.pokeball - 1, 'balls', 'pokeball')
                        setBonusOnCatch(2)
                    }
                    handleCatchDiceRoll()
                    setEndTurnButton(false)
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
                        setBonusOnCatch(3)
                    }
                    handleCatchDiceRoll()
                    setEndTurnButton(false)
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
                        setBonusOnCatch(5)
                    }
                    handleCatchDiceRoll()
                    setEndTurnButton(false)
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
                        setBonusOnCatch(10)
                    }
                    handleCatchDiceRoll()
                    setEndTurnButton(false)
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
    )
}