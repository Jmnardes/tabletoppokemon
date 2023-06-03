import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useState } from "react"
import SelectPokemon from "./selectPokemon"

const DebugPage = ({
    setDebug
}) => {
    const [acc, setAcc] = useState(1)
    const [crt, setCrt] = useState(1)
    const [def, setDef] = useState(1)
    const [evs, setEvs] = useState(1)

    const [area, setArea] = useState(8)
    const [defArea, setDefArea] = useState(0)

    const set = (v, setValue) => setValue(v ? Number(v) : 0)

    const blocks = useMemo(() => {
        const blockArray = []
        for (let i = 0; i < 20; i++) {
            let color = 'none'
            if (i >= (20 - crt)) color = 'red.700'
            else if (i < evs) color = 'blue.500'
            else if (i < defArea) color = 'green.700'

            const block = (
                <Center
                    key={`${i} ${Date.now()}`}
                    w='3rem'
                    h='3rem'
                    border='1px solid rgba(255, 255, 255, 0.2)'
                    backgroundColor={color}
                >
                    <Text color='gray.400' fontSize='sm'>
                        {i+1}
                    </Text>
                </Center>
            )
            blockArray.push(block)
        }
        return blockArray
    }, [evs, crt, defArea])

    const attackerHandler = useCallback((data) => {
        setAcc(data.stats.acc)
        setCrt(data.stats.crt)
    }, [])
    
    const defenderHandler = useCallback((data) => {
        setDef(data.stats.def)
        setEvs(data.stats.evs)
    }, [])

    useEffect(() => {
        setDefArea(area + (def - acc))
    }, [acc, def, area])

    return (
        <Flex flexDirection='column' gridGap='2rem'>
            <Box>
                <Button onClick={() => setDebug(false)}>Voltar</Button>
            </Box>
            <Flex gridGap='2rem' justifyContent='center'>
                <Flex flexDirection='column' gridGap='1rem' width='30%'>
                    <Heading color='white'>Attacker</Heading>
                    <SelectPokemon onChange={attackerHandler} />
                    <Text color='white'>Accuracy</Text>
                    <NumberInput
                        placeholder="Accuracy"
                        value={acc}
                        onChange={v => set(v, setAcc)}
                        color='orange.400'
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Text color='white'>Critical Chance</Text>
                    <NumberInput
                        placeholder="Critical"
                        value={crt}
                        onChange={v => set(v, setCrt)}
                        color='red.400'
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
                <Flex flexDirection='column' gridGap='1rem' width='30%'>
                    <Heading color='white'>Defender</Heading>
                    <SelectPokemon onChange={defenderHandler} />
                    <Text color='white'>Defense</Text>
                    <NumberInput
                        placeholder="Defense"
                        value={def}
                        onChange={v => set(v, setDef)}
                        color='green.400'
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Text color='white'>Evasion</Text>
                    <NumberInput
                        placeholder="Evasion"
                        value={evs}
                        onChange={v => set(v, setEvs)}
                        color='blue.300'
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>
            <Center>
                <Flex flexDirection='column' gridGap='1rem'>
                    <Text color='white'>Base Defense Area</Text>
                    <NumberInput
                        placeholder="Base Defense Area"
                        value={area}
                        onChange={v => set(v, setArea)}
                        color='cyan.400'
                        min={0}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Center>
            <Center>
                <Text>Defense area:&nbsp;</Text>
                <Text color='cyan.400'>{area}</Text>
                <Text>&nbsp;+&nbsp;(</Text>
                <Text color='green.400'>{def}</Text>
                <Text>&nbsp;-&nbsp;</Text>
                <Text color='orange.400'>{acc}</Text>
                <Text>)&nbsp;=&nbsp;</Text>
                <Text color='green.400'>{defArea}</Text>
            </Center>
            <Center>
                {blocks}
            </Center>
        </Flex>
    )
}

export default DebugPage
