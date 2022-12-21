import { Button, Flex, Input, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaMinusSquare, FaPlusSquare, FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";

export function PokeLife({ total, lifeSize = '1xl', iconSize = '16px', title }) {
    const [life, setLife] = useState(0)
    const [oponentAttack, setOponentAttack] = useState(1)

    const handleLifeSum = () => {
        if (life < total) {
            setLife(() => life + 1)
        }
    }

    const handleLifeSub = () => {
        if (life >= oponentAttack) {
            setLife(() => life - oponentAttack)
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
            <Button
                m={1}
                size='xs'
                height={title? "40px" : "24px"}
                width={title? "40px" : "12px"}
                _hover={{
                    cursor: 'inherit'
                }}
            >
                <Text fontSize={lifeSize} fontWeight="bold">{life}</Text>
            </Button>
            
            <Flex flexDirection={title ? 'column' : 'row'}>
                <Button
                    m={title ? 0.25 : 1}
                    size={title ? '12px' : 'xs'}
                    p={title ? 1 : 0}
                    title="Life sum"
                    onClick={() => handleLifeSum()}
                >
                    <FaPlusSquare size={iconSize} color="green"/>
                </Button>

                <Button
                    m={title ? 0.25 : 1}
                    size={title ? '12px' : 'xs'}
                    p={title ? 1 : 0}
                    title="Life sub"
                    onClick={() => handleLifeSub()}
                >
                    <FaMinusSquare size={iconSize} color="red"/>
                </Button>
            </Flex>

            {title && (
                <Flex flexDirection={title ? 'column' : 'row'}>
                    <Button
                        m={0.25}
                        size={title ? '12px' : 'xs'}
                        p={title ? 1 : 0}
                        title="Life sum"
                        onClick={() => handleMaxLife()}
                    >
                        <FaAngleDoubleUp size={iconSize} color="green"/>
                    </Button>

                    <Button
                        m={0.25}
                        size={title ? '12px' : 'xs'}
                        p={title ? 1 : 0}
                        title="Life sub"
                        onClick={() => handleZeroLife()}
                    >
                        <FaAngleDoubleDown size={iconSize} color="red"/>
                    </Button>
                </Flex>
            )}

            {title && (
                <Input 
                    type="number" 
                    title="Oponent Attack"
                    textAlign="center"
                    size="xs" 
                    ml={1}
                    w={8} 
                    h={10}
                    defaultValue={1}
                    min={1}
                    max={30}
                    borderRadius={4}
                    onChange={e => {
                        if(e.target.value > 0 && e.target.value <= 30) {
                            setOponentAttack(e.target.value)
                        }
                    }}
                />
            )}
        </Flex>
    )
}