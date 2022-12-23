import { Button, Flex, Image } from "@chakra-ui/react"
import greatballIcon from '../../../assets/images/pokeballs/pokeball.png'
import superballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

export default function Pokeballs({ 
        greatball, 
        superball, 
        ultraball, 
        masterball, 
        disablePokeballs,
        setGreatBall,
        setSuperBall,
        setUltraBall,
        setMasterBall,
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
                    w="32px"
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
                    w="32px"
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
                    w="32px"
                    _hover={{ transition: 'transform .7s ease-in-out', transform: 'rotate(360deg)' }}
                ></Image>
            </Button>

            <Button 
                mx={4}
                title="Master Ball"
                disabled={masterball === 0 || disablePokeballs}
                onClick={() => {
                    if(masterball > 0) {
                        setMasterBall(masterball - 1)
                        setBonusOnCatch(5)
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