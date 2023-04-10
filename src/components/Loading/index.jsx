import { Box, Center, Flex, keyframes } from '@chakra-ui/react'
import PokeballIcon from '../Icons/PokeballIcon'
import { motion } from 'framer-motion'

const rotationKeyframes = keyframes`
    0% { transform: rotate(360deg) }
    100% { transform: rotate(0deg) }
`

const Loading = ({
    children,
    showSpinner = true,
}) => {
    return (
        <>
            <Box
                pos='absolute'
                top='0'
                left='0'
                width='100%'
                height='100%'
                bg='black'
                opacity='70%'
                zIndex='1'
            />
            <Center
                pos='absolute'
                top='0'
                left='0'
                width='100%'
                height='100%'
            >
                <Flex flexDirection='column' gap='1rem' zIndex='2'>
                    {showSpinner && (
                        <Center>
                            <Box as={motion.div} animation={`${rotationKeyframes} 2s linear infinite`}>
                                <PokeballIcon c='white'/>
                            </Box>
                        </Center>
                    )}
                    {children}
                </Flex>
            </Center>
        </>
    )
}

export default Loading
