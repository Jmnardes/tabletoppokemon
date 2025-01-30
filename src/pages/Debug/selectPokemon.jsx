import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    ButtonGroup,
    Flex,
    IconButton,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Tooltip
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { Star } from "phosphor-react"
import socket from "@client"
import natures from "@assets/json/natures.json"

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const natureList = natures.map(nature => ({ label: capitalize(nature.Nature), value: nature.Nature.toLowerCase() }))

const SelectPokemon = ({ onChange }) => {
    const [entry, setEntry] = useState(null)
    const [tier, setTier] = useState(0)
    const [nature, setNature] = useState(null)
    const [rarity, setRarity] = useState(0)
    const [loading, setLoading] = useState(false)

    const request = () => {
        setLoading(true)
        const payload = { entry, tier, nature, rarity }
        socket.emit('request-pokemon', payload)
    }

    useEffect(() => {
        const listener = (data) => {
            setLoading(false)
            onChange(data)
        }

        socket.on('request-pokemon', listener)
        return () => {
            socket.off('request-pokemon', listener)
        }
    }, [])

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Text flex='1'>
                            Select Pokémon
                        </Text>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Flex direction='column'>
                        <Flex>
                            <Tooltip label="Click to fetch this pokémon's stats">
                                <IconButton
                                    isLoading={loading}
                                    isDisabled={!entry || !nature || !tier}
                                    aria-label=''
                                    onClick={request}
                                    icon={entry ? <Image src={`https://veekun.com/dex/media/pokemon/icons/${entry}.png`}/> : <FaSearch />}
                                />
                            </Tooltip>
                            <Tooltip label='Pokémon Entry ID'>
                                <NumberInput
                                    placeholder="Entry"
                                    onChange={setEntry}
                                    min={1}
                                    max={898}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Tooltip>
                            <Tooltip label="Tier">
                                <NumberInput
                                    placeholder="Tier"
                                    onChange={setTier}
                                    min={0}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Tooltip>
                        </Flex>
                        <Tooltip label="Nature">
                            <Select placeholder='Select Nature' onChange={ev => setNature(ev.target.value)}>
                                {natureList.map(nature => (
                                    <option key={nature.value} value={nature.value}>{nature.label}</option>
                                ))}
                            </Select>
                        </Tooltip>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <Text>Rarity:</Text>
                            <ButtonGroup>
                                <IconButton
                                    variant='unstyled'
                                    onClick={() => setRarity(0)}
                                    icon={<Star size={32} weight={rarity >= 0 ? 'fill' : 'regular'} />}
                                />
                                <IconButton
                                    variant='unstyled'
                                    onClick={() => setRarity(1)}
                                    icon={<Star size={32} weight={rarity >= 1 ? 'fill' : 'regular'} />}
                                />
                                <IconButton
                                    variant='unstyled'
                                    onClick={() => setRarity(2)}
                                    icon={<Star size={32} weight={rarity >= 2 ? 'fill' : 'regular'} />}
                                />
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default SelectPokemon
