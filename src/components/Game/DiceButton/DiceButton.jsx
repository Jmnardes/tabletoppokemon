import { Box, Center, Flex, Heading, IconButton, Image, keyframes, useColorMode } from '@chakra-ui/react'
import SixSidesDiceIcon from '../../Icons/dices/SixSidesDice'
import { useState } from 'react'
import { diceRoll } from '../../../util'
import TwentySidesDice from '../../Icons/dices/TwentySidesDice'
import { diceShakeAnimation, diceRollAnimation, diceSpinAnimation, textShowAnimation } from '../../Animations'

const regex = /_EMO_(.*)_@[\S\s]+,\s*_EMO_(.*)_@/m

const endAnimationName = diceRollAnimation.match(regex)[2]

export default function DiceButton({
    onRoll,
    maxRow = 6,
    bonus = 0,
    diceSides = 6
}) {
    const [rolling, setRolling] = useState(false)
    const [value, setValue] = useState(0)

    const { colorMode } = useColorMode()

    const light = colorMode === 'light'
    const rolled = !!value
    const critical = value === maxRow

    const setDiceBySides = (sides, c) => {
        if(sides === 6) return <SixSidesDiceIcon w={12} h={12} c={c}/>
        if(sides === 20) return <TwentySidesDice w={12} h={12} c={c} />
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
                        {setDiceBySides(diceSides)}
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
                    {setDiceBySides(diceSides, '#808080')}
                </>
            ) : (
                <IconButton
                    w='4rem'
                    h='4rem'
                    _hover={{ 'animation': diceShakeAnimation }}
                    onClick={() => setRolling(true)}
                    icon={setDiceBySides(diceSides)}
                    bg='none'
                />
            ))}
        </Center>
    )
}
