import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
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

    useEffect(() => {
        setLife(total)
    }, [])

    return ( 
        <Box mx={2}textAlign="center">
            <Flex direction="row">
                <Button
                    mx={1}
                    size="xs"
                    title="Life sum"
                    onClick={() => handleLifeSum()}
                >
                    <FaPlusSquare size="16px" color="green"/>
                </Button>

                <Button
                    mx={1}
                    size="xs"
                    title="Life sub"
                    onClick={() => handleLifeSub()}
                >
                    <FaMinusSquare size="16px" color="red"/>
                </Button>

                <Box mx={1} textAlign="center">
                    <Text fontSize='1xl' fontWeight="bold">{life}</Text>
                </Box>
            </Flex>
        </Box>
    )
}