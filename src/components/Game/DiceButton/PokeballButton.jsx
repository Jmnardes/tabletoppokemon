import { Box, Center, Flex, Heading, IconButton, Image, keyframes, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import { diceRoll } from '../../../util'
import pokeballIcon from '../../../assets/images/pokeballs/pokeball.png'
import greatballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'

const regex = /_EMO_(.*)_@[\S\s]+,\s*_EMO_(.*)_@/m

const diceShakeAnimation = keyframes`
    0% { transform: rotate(0deg) }
    5% { transform: rotate(-15deg) }
    10% { transform: rotate(0deg) }
    15% { transform: rotate(15deg) }
    20% { transform: rotate(0deg) }
    35% { transform: rotate(0deg) }
    40% { transform: rotate(-15deg) }
    45% { transform: rotate(0deg) }
    50% { transform: rotate(15deg) }
    55% { transform: rotate(0deg) }
` + ' 0.8s ease-in-out infinite'

const diceRollAnimation = keyframes`
    0% { transform: translateY(0) }
    100% { transform: translateY(-50px) }
` + ' 0.4s cubic-bezier(0, 0.6, 0.4, 1) 0s 1, '
+ keyframes`
    0% { transform: translateY(-50px) }
    100% { transform: translateY(0) }
` + ' 0.4s cubic-bezier(0.6, 0, 1, 0.4) 0.4s 1'

const diceSpinAnimation = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
` + ' 0.3s linear 0s infinite'

const textShowAnimation = keyframes`
    0% {
        transform: translateY(-1rem);
        opacity: 0.3;
    }
    100% {
        transform: translateY(-2rem);
    }
` + ' 0.2s ease-out 0s 1 normal forwards'

const endAnimationName = diceRollAnimation.match(regex)[2]

export default function PokeballButton({
    onRoll,
    maxRow = 20,
    bonus = 0,
    type = 'pb'
}) {
    const [rolling, setRolling] = useState(false)
    const [value, setValue] = useState(0)

    const { colorMode } = useColorMode()

    const light = colorMode === 'light'
    const rolled = !!value
    const critical = value === maxRow

    const setDiceByType = (type) => {
        if(type === 'pb') return <Image
            src={pokeballIcon} 
            title={'+0'}
            w="24px"
        ></Image>
        if(type === 'gb') return <Image
            src={greatballIcon} 
            title={'+2'}
            w="24px"
        ></Image>
        if(type === 'ub') return <Image
            src={ultraballIcon} 
            title={'+3'}
            w="24px"
        ></Image>
        if(type === 'mb') return <Image
            src={masterballIcon} 
            title={'+5'}
            w="24px"
        ></Image>
    }

    return (
        <Center w='4rem' h='4rem'>
            {rolling ? (
                <Center
                    w='4rem'
                    h='4rem'
                    animation={diceRollAnimation}
                    onAnimationEnd={(e) => {
                        if (endAnimationName === e.animationName) {
                            const rollValue = diceRoll(maxRow) + 1
                            setRolling(false)
                            setValue(rollValue)
                            onRoll && onRoll(rollValue)
                        }
                    }}
                >
                    <Box animation={diceSpinAnimation}>
                        {setDiceByType(type)}
                    </Box>
                </Center>
            ) : ( rolled ? (
                <>
                    <Flex
                        pos='absolute'
                        animation={textShowAnimation}
                    >
                        <Heading
                            size='md'
                            color={critical ? (light ? 'green' : 'green') : (light ? 'black' : 'white')}
                        >
                            {value}
                        </Heading>
                        {bonus !== 0 && (
                            <Heading
                                fontSize='12px'
                                color={(bonus > 0) ? 'green' : 'red'}
                            >
                                {(bonus > 0) ? `+${bonus}` : bonus}
                            </Heading>
                        )}
                    </Flex>
                    {setDiceByType(type)}
                </>
            ) : (
                <IconButton
                    w='4rem'
                    h='4rem'
                    _hover={{ 'animation': diceShakeAnimation }}
                    onClick={() => setRolling(true)}
                    icon={setDiceByType(type)}
                    bg='none'
                />
            ))}
        </Center>
    )
}
