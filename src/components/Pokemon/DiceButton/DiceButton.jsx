import { Box, Center, Flex, Heading, IconButton, keyframes, useColorMode } from '@chakra-ui/react'
import SixSidesDiceIcon from '../../Icons/dices/SixSidesDice'
import { useState } from 'react'
import { diceRoll } from '../../../util'

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

export default function DiceButton({
    onRoll,
    maxRow = 6,
    bonus = 0,
}) {
    const [rolling, setRolling] = useState(false)
    const [value, setValue] = useState(0)

    const { colorMode } = useColorMode()

    const light = colorMode === 'light'
    const rolled = !!value
    const critical = value === maxRow
    return (
        <Center w='4rem' h='4rem'>
            {rolling ? (
                <Center
                    w='4rem'
                    h='4rem'
                    animation={diceRollAnimation}
                    onAnimationEnd={(e) => {
                        console.log({
                            endAnimationName,
                            animationName: e.animationName,
                            equal: endAnimationName === e.animationName,
                        })
                        if (endAnimationName === e.animationName) {
                            const rollValue = diceRoll(maxRow) + 1
                            setRolling(false)
                            setValue(rollValue)
                            onRoll && onRoll(rollValue)
                        }
                    }}
                >
                    <Box animation={diceSpinAnimation}>
                        <SixSidesDiceIcon w={12} h={12} />
                    </Box>
                </Center>
            ) : ( rolled ? (
                <>
                    <Flex
                        pos='absolute'
                        animation={textShowAnimation}
                    >
                        <Heading
                            size={critical ? '4xl' : '3xl'}
                            color={critical ? (light ? 'maroon' : 'yellow') : (light ? 'black' : 'white')}
                        >
                            {value}
                        </Heading>
                        {bonus !== 0 && (
                            <Heading
                                size={critical ? '4xl' : '3xl'}
                                color={(bonus > 0) ? 'green' : 'red'}
                            >
                                {(bonus > 0) ? `+${bonus}` : bonus}
                            </Heading>
                        )}
                    </Flex>
                    <SixSidesDiceIcon w={12} h={12} c='#808080' />
                </>
            ) : (
                <IconButton
                    w='4rem'
                    h='4rem'
                    _hover={{ 'animation': diceShakeAnimation }}
                    onClick={() => setRolling(true)}
                    icon={<SixSidesDiceIcon w={12} h={12} />}
                    bg='none'
                />
            ))}
        </Center>
    )
}
