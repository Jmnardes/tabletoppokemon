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
                opacity='90%'
                zIndex='1401'
            />
            <Flex
                pos='absolute'
                top='0'
                left='0'
                width='100%'
                height='100%'
                direction='column'
                align='center'
                zIndex='1402'
                py={4}
            >
                {showSpinner && (
                    <Center mb={2}>
                        <Box as={motion.div} animation={`${rotationKeyframes} 2s linear infinite`}>
                            <PokeballIcon c='white' w={20} h={20} />
                        </Box>
                    </Center>
                )}
                {children}
            </Flex>
        </>
    )
}

export default Loading
