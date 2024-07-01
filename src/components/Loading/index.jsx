import { Box, Center, Flex, keyframes } from '@chakra-ui/react'
import PokeballIcon from '../Icons/PokeballIcon'
import { motion } from 'framer-motion'
import { fullRotationAnimation } from '../Animations'

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
                zIndex='1401'
            />
            <Center
                pos='absolute'
                top='0'
                left='0'
                width='100%'
                height='100%'
            >
                <Flex flexDirection='column' gap='1rem' zIndex='1402'>
                    {showSpinner && (
                        <Center>
                            <Box as={motion.div} animation={`${fullRotationAnimation} 2s linear infinite`}>
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
