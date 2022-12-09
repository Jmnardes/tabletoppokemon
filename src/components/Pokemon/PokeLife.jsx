import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export function PokeLife({ total }) {
    const [life, setLife] = useState(0)

    const handleLifeSum = () => {
        if (life < total) {
            setLife(() => life + 1)
        }
    }

    const handleLifeSub = () => {
        if (life > 0) {
            setLife(() => life - 1)
        }
    }

    return ( 
        <Box mx={2}textAlign="center">
            <Flex direction="row">
                <Button
                    mx={2}
                    title="Life sum"
                    onClick={() => handleLifeSum()}
                >
                    <FaPlusSquare size="24px" color="green"/>
                </Button>

                <Box mx={2} textAlign="center">
                    <Text fontSize='2xl'>{life}</Text>
                </Box>

                <Button
                    mx={2}
                    title="Life sub"
                    onClick={() => handleLifeSub()}
                >
                    <FaMinusSquare size="24px" color="red"/>
                </Button>
            </Flex>
        </Box>
    )
}