import { Box, Center, Flex, Heading, IconButton, Image, keyframes, useColorMode } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { diceRoll } from '../../../util'
import pokeballIcon from '../../../assets/images/pokeballs/pokeball.png'
import greatballIcon from '../../../assets/images/pokeballs/greatball.png'
import ultraballIcon from '../../../assets/images/pokeballs/ultraball.png'
import masterballIcon from '../../../assets/images/pokeballs/masterball.png'
import PlayerContext from '../../../Contexts/PlayerContext'
import { diceShakeAnimation, diceRollAnimation, diceSpinAnimation, textShowAnimation } from '../../Animations'

const regex = /_EMO_(.*)_@[\S\s]+,\s*_EMO_(.*)_@/m

const endAnimationName = diceRollAnimation.match(regex)[2]

export default function PokeballButton({
    onRoll,
    maxRow = 20,
    bonus = 0,
    type = 'pb',
    isDisabled
}) {
    const { updateStatus } = useContext(PlayerContext)
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
                            rollValue === (maxRow + 1) && updateStatus('critics')
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
                    isDisabled={isDisabled}
                    _hover={{ 'animation': diceShakeAnimation }}
                    onClick={() => setRolling(true)}
                    icon={setDiceByType(type)}
                    bg='none'
                />
            ))}
        </Center>
    )
}
