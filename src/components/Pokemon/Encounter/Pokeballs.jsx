import { Button, Flex, Image } from "@chakra-ui/react"
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function Pokeballs({
    setBonusOnCatch,
    handleCatchDiceRoll
}) {
    const { balls, updateBalls, game } = useContext(PlayerContext)

    return (
        <Flex justifyContent="center" my={4}>
            <Button
                mx={4}
                title="Poke Ball"
                isDisabled={balls.pokeball === 0 || game.isPokemonRollDisabled}
                onClick={() => {
                    if(balls.pokeball > 0) {
                        updateBalls(balls, {pokeball: balls.pokeball - 1})
                        setBonusOnCatch(2)
                    }
                    handleCatchDiceRoll()
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
                isDisabled={balls.greatball === 0 || game.isPokemonRollDisabled}
                onClick={() => {
                    if(balls.greatball > 0) {
                        updateBalls(balls, {greatball: balls.greatball - 1})
                        setBonusOnCatch(3)
                    }
                    handleCatchDiceRoll()
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
                isDisabled={balls.ultraball === 0 || game.isPokemonRollDisabled}
                onClick={() => {
                    if(balls.ultraball > 0) {
                        updateBalls(balls, {ultraball: balls.ultraball - 1})
                        setBonusOnCatch(5)
                    }
                    handleCatchDiceRoll()
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
                isDisabled={balls.masterball === 0 || game.isPokemonRollDisabled}
                onClick={() => {
                    if(balls.masterball > 0) {
                        updateBalls(balls, {masterball: balls.masterball - 1})
                        setBonusOnCatch(10)
                    }
                    handleCatchDiceRoll()
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