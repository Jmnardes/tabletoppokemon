import { Button, Flex, Image } from "@chakra-ui/react"
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";

export default function Pokeballs({
    disablePokeballs,
    setBonusOnCatch,
    setDisablePokeballs,
    handleCatchDiceRoll,
    disableDiceRoll
}) {
    const { balls, updateBalls } = useContext(PlayerContext)

    return (
        <Flex justifyContent="center" my={4}>
            <Button
                mx={4}
                title="Great Ball"
                disabled={balls.greatball === 0 || disablePokeballs || disableDiceRoll}
                onClick={() => {
                    if(balls.greatball > 0) {
                        updateBalls(balls, {greatball: balls.greatball - 1})
                        setBonusOnCatch(2)
                        setDisablePokeballs(true)
                    }
                    handleCatchDiceRoll()
                }}
            >
                <Image
                    src={greatballIcon} 
                    alt={'greatball'}
                    w="32px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>
            <Button 
                mx={4}
                title="Super Ball"
                disabled={balls.superball === 0 || disablePokeballs || disableDiceRoll}
                onClick={() => {
                    if(balls.superball > 0) {
                        updateBalls(balls, {superball: balls.superball - 1})
                        setBonusOnCatch(3)
                        setDisablePokeballs(true)
                    }
                    handleCatchDiceRoll()
                }}
            >
                <Image
                    src={superballIcon} 
                    alt={'superball'}
                    w="32px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>

            <Button 
                mx={4}
                title="Ultra Ball"
                disabled={balls.ultraball === 0 || disablePokeballs || disableDiceRoll}
                onClick={() => {
                    if(balls.ultraball > 0) {
                        updateBalls(balls, {ultraball: balls.ultraball - 1})
                        setBonusOnCatch(5)
                        setDisablePokeballs(true)
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
                disabled={balls.masterball === 0 || disablePokeballs || disableDiceRoll}
                onClick={() => {
                    if(balls.masterball > 0) {
                        updateBalls(balls, {masterball: balls.masterball - 1})
                        setBonusOnCatch(10)
                        setDisablePokeballs(true)
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