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
    setDisablePokeballs
}) {

    const { pokeballs, updatePokeballs } = useContext(PlayerContext)
    return (
        <Flex justifyContent="center" my={4}>
            <Button
                mx={4}
                title="Great Ball"
                disabled={pokeballs.greatball === 0 || disablePokeballs}
                onClick={() => {
                    if(pokeballs.greatball > 0) {
                        updatePokeballs(pokeballs, {greatball: pokeballs.greatball - 1})
                        setBonusOnCatch(2)
                        setDisablePokeballs(true)
                    }
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
                disabled={pokeballs.superball === 0 || disablePokeballs}
                onClick={() => {
                    if(pokeballs.superball > 0) {
                        updatePokeballs(pokeballs, {superball: pokeballs.superball - 1})
                        setBonusOnCatch(3)
                        setDisablePokeballs(true)
                    }
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
                disabled={pokeballs.ultraball === 0 || disablePokeballs}
                onClick={() => {
                    if(pokeballs.ultraball > 0) {
                        updatePokeballs(pokeballs, {ultraball: pokeballs.ultraball - 1})
                        setBonusOnCatch(5)
                        setDisablePokeballs(true)
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
                disabled={pokeballs.masterball === 0 || disablePokeballs}
                onClick={() => {
                    if(pokeballs.masterball > 0) {
                        updatePokeballs(pokeballs, {masterball: pokeballs.masterball - 1})
                        setBonusOnCatch(10)
                        setDisablePokeballs(true)
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
    )
}