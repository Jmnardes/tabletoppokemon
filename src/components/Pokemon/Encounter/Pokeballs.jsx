import { Button, Flex, Image } from "@chakra-ui/react"
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'

export default function Pokeballs({ 
        greatball, 
        superball, 
        ultraball, 
        disablePokeballs,
        setGreatBall,
        setSuperBall,
        setUltraBall,
        setBonusOnCatch,
        setDisablePokeballs
    }) {
    return (
        <Flex justifyContent="center" my={4}>
            <Button
                mx={4}
                title="Great Ball"
                disabled={greatball === 0 || disablePokeballs}
                onClick={() => {
                    if(greatball > 0) {
                        setGreatBall(greatball - 1)
                        setBonusOnCatch(2)
                        setDisablePokeballs(true)
                    }
                }}
            >
                <Image
                    src={greatballIcon} 
                    alt={'greatball'}
                    w="38px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>
            <Button 
                mx={4}
                title="Super Ball"
                disabled={superball === 0 || disablePokeballs}
                onClick={() => {
                    if(superball > 0) {
                        setSuperBall(superball - 1)
                        setBonusOnCatch(3)
                        setDisablePokeballs(true)
                    }
                }}
            >
                <Image
                    src={superballIcon} 
                    alt={'superball'}
                    w="38px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>
            <Button 
                mx={4}
                title="Ultra Ball"
                disabled={ultraball === 0 || disablePokeballs}
                onClick={() => {
                    if(ultraball > 0) {
                        setUltraBall(ultraball - 1)
                        setBonusOnCatch(5)
                        setDisablePokeballs(true)
                    }
                }}
            >
                <Image
                    src={ultraballIcon} 
                    alt={'ultraball'}
                    w="38px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>
        </Flex>
    )
}