import { Button, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export function PokeLife({ total, buttonSize = 'xs', lifeSize = '1xl', iconSize = '16px' }) {
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
    }, [total])

    return ( 
        <Flex mx={2} direction="row" textAlign="center" alignItems="center" justifyContent="center">
            <Button
                mx={1}
                size={buttonSize}
                title="Life sum"
                onClick={() => handleLifeSum()}
            >
                <FaPlusSquare size={iconSize} color="green"/>
            </Button>

            <Button
                mx={1}
                size={buttonSize}
                title="Life sub"
                onClick={() => handleLifeSub()}
            >
                <FaMinusSquare size={iconSize} color="red"/>
            </Button>

            <Button
                mx={1}
                size={buttonSize}
                _hover={false}
            >
                <Text fontSize={lifeSize} fontWeight="bold">{life}</Text>
            </Button>
        </Flex>
    )
}