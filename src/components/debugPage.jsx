import { Box, Button, Center, Flex, Heading, NumberInput, NumberInputField, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const DebugPage = ({
    setDebug
}) => {
    const [acc, setAcc] = useState(1)
    const [def, setDef] = useState(1)
    const [evs, setEvs] = useState(1)

    const [totalDef, setTotalDef] = useState(0)
    const [defOff, setDefOff] = useState(0)

    const [area, setArea] = useState(0)
    const [defArea, setDefArea] = useState(0)
    const [evsArea, setEvsArea] = useState(0)

    const set = (v, setValue) => setValue(v ? Number(v) : 0)

    useEffect(() => {
        setTotalDef(Math.floor((def + evs) / 2))
    }, [def, evs])

    useEffect(() => {
        setDefOff(totalDef + acc)
    }, [acc, totalDef])

    useEffect(() => {
        const fullDef = def + evs
        const newArea = Math.max(1, Math.floor((totalDef / defOff) * 20))
        const newEvsArea = Math.floor((evs / fullDef) * newArea)
        const newDefArea = newArea - newEvsArea
        setArea(newArea)
        setDefArea(newDefArea)
        setEvsArea(newEvsArea)
    }, [defOff])

    return (
        <Flex flexDirection='column' gridGap='2rem'>
            <Box>
                <Button onClick={() => setDebug(false)}>Voltar</Button>
            </Box>
            <Flex gridGap='2rem' justifyContent='center'>
                <Flex flexDirection='column' gridGap='1rem'>
                    <Heading color='white'>Attacker</Heading>
                    <Text color='white'>Accuracy</Text>
                    <NumberInput
                        placeholder="Accuracy"
                        defaultValue={1}
                        onChange={v => set(v, setAcc)}
                        color='orange.400'
                    >
                        <NumberInputField />
                    </NumberInput>
                </Flex>
                <Flex flexDirection='column' gridGap='1rem'>
                    <Heading color='white'>Defender</Heading>
                    <Text color='white'>Defense</Text>
                    <NumberInput
                        placeholder="Defense"
                        defaultValue={1}
                        onChange={v => set(v, setDef)}
                        color='green.400'
                    >
                        <NumberInputField />
                    </NumberInput>
                    <Text color='white'>Evasion</Text>
                    <NumberInput
                        placeholder="Evasion"
                        defaultValue={1}
                        onChange={v => set(v, setEvs)}
                        color='blue.400'
                    >
                        <NumberInputField />
                    </NumberInput>
                </Flex>
            </Flex>
            <Center>
                <Text>Total defense: (</Text>
                <Text color='green.400'>{def}</Text>
                <Text>&nbsp;+&nbsp;</Text>
                <Text color='blue.400'>{evs}</Text>
                <Text>) / 2 =&nbsp;</Text>
                <Text color='cyan.400'>{totalDef}</Text>
            </Center>
            <Center>
                <Text>Sum of totalDef and accuracy:&nbsp;</Text>
                <Text color='cyan.400'>{totalDef}</Text>
                <Text>&nbsp;+&nbsp;</Text>
                <Text color='orange.400'>{acc}</Text>
                <Text>&nbsp;=&nbsp;</Text>
                <Text color='yellow.400'>{defOff}</Text>
            </Center>
            <Center>
                <Text>Defense area: (</Text>
                <Text color='cyan.400'>{totalDef}</Text>
                <Text>&nbsp;/&nbsp;</Text>
                <Text color='yellow.400'>{defOff}</Text>
                <Text>) * 20 =&nbsp;</Text>
                <Text color='gray.400' as='b' fontSize='lg'>{area}</Text>
                <Text as='b' fontSize='lg'>d20</Text>
            </Center>
            <Center>
                <Text>Miss area:&nbsp;</Text>
                <Text color='blue.400' as='b' fontSize='lg'>{evsArea}</Text>
                <Text as='b' fontSize='lg'>d20</Text>
            </Center>
            <Center>
                <Text>Half damage area:&nbsp;</Text>
                <Text color='green.400' as='b' fontSize='lg'>{defArea}</Text>
                <Text as='b' fontSize='lg'>d20</Text>
            </Center>
        </Flex>
    )
}

export default DebugPage
