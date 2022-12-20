import { Button, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaMinusSquare, FaPlusSquare, FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

export function PokeLife({ total, lifeSize = '1xl', iconSize = '16px', title }) {
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

    const handleZeroLife = () => {
        setLife(0)
    }

    const handleMaxLife = () => {
        setLife(total)
    }

    useEffect(() => {
        setLife(total)
    }, [total])

    return ( 
        <Flex mx={2} direction="row" textAlign="center" alignItems="center" justifyContent="center">
            <Flex flexDirection={title ? 'column' : 'row'}>
                <Button
                    m={title ? 0.25 : 1}
                    size='xs'
                    title="Life sum"
                    onClick={() => handleLifeSum()}
                >
                    <FaPlusSquare size={iconSize} color="green"/>
                </Button>

                <Button
                    m={title ? 0.25 : 1}
                    size='xs'
                    title="Life sub"
                    onClick={() => handleLifeSub()}
                >
                    <FaMinusSquare size={iconSize} color="red"/>
                </Button>
            </Flex>

            <Button
                m={1}
                size='xs'
                height={title? "90%" : "70%"}
                _hover={{
                    cursor: 'inherit'
                }}
            >
                <Text fontSize={lifeSize} fontWeight="bold">{life}</Text>
            </Button>

            {title && (
                <Flex flexDirection={title ? 'column' : 'row'}>
                    <Button
                        m={0.25}
                        size='xs'
                        title="Life sum"
                        onClick={() => handleMaxLife()}
                    >
                        <FaAngleDoubleUp size={iconSize} color="green"/>
                    </Button>

                    <Button
                        m={0.25}
                        size='xs'
                        title="Life sub"
                        onClick={() => handleZeroLife()}
                    >
                        <FaAngleDoubleDown size={iconSize} color="red"/>
                    </Button>
                </Flex>
            )}
        </Flex>
    )
}