import { useContext, useEffect, useState } from "react"
import {
    Text,
    Center,
    Box,
    Button,
    Image
} from "@chakra-ui/react"
import socket from '@client'
import PlayerContext from "@Contexts/PlayerContext"
import Card from "@components/Pokemon/Card"
import Element from "@components/Elements/Element";
import { stringToUpperCase } from "@utils"

export default function Capture({ capturedPokemon, setCapturedPokemon }) {
    const { updateGame, pokeTeam, emit, setLoadingApi } = useContext(PlayerContext)
    const [chooseAttackType, setChooseAttackType] = useState(capturedPokemon.types.length > 1)
    const [attackType, setAttackType] = useState(capturedPokemon.types[0])
    const [specialType, setSpecialType] = useState(capturedPokemon.types[0])
    const [selectedToRemove, setSelectedToRemove] = useState(null)
    const isTeamFull = pokeTeam.length > 2

    const handleFinishCapture = ({ removedId, dayCare, starterTeam }) => {
        emit('pokemon-handle-capture', { 
            capturedPokemonId: capturedPokemon.id, attackType, specialType, removedId, dayCare, starterTeam
        })
        setLoadingApi(true)
    }

    useEffect(() => {
        socket.on('pokemon-handle-capture', () => {
            setCapturedPokemon({})
            updateGame({ openPokemonCaptureModal: false })
            setLoadingApi(false)
        })

        if (!isTeamFull) {
            handleFinishCapture({ removedId: null, dayCare: false, starterTeam: true })
        } else {
            setLoadingApi(false)
        }

        return () => {
            socket.off('pokemon-handle-capture')
        }
    }, [])

    const ChooseTypes = ({ title, setter, selectedType, types }) => {
        return (
            <>
                <Text fontSize={"small"}>{title}</Text>
                <Center m={4} gap={4}>
                    {types.map((type) => (
                        <Button
                            key={type}
                            onClick={() => setter(type)}
                            isDisabled={type === selectedType}
                            border={type === selectedType ? '2px solid' : 'none'}
                        >
                            <Element element={type} w={8} h={8} />
                        </Button>
                    ))}
                </Center>
            </>
        );
    };

    return (
        <Center flex flexDir={"column"} p={4}>
            {chooseAttackType ? (
                <>
                    <Text>You caught a {stringToUpperCase(capturedPokemon.name)}!</Text>

                    <Image
                        h={24} w={24} mb={8}
                        title={stringToUpperCase(capturedPokemon.name)} 
                        src={capturedPokemon.sprites.mini}
                        fallbackSrc={capturedPokemon.sprites.front}
                    />

                    <ChooseTypes
                        title="Choose his attack type:"
                        setter={setAttackType}
                        selectedType={attackType}
                        types={capturedPokemon.types}
                    />
                    {/* <ChooseTypes
                        title="Choose his special type:"
                        setter={setSpecialType}
                        selectedType={specialType}
                        types={capturedPokemon.types}
                    /> */}

                    <Button w={"100%"} mt={2} onClick={() => setChooseAttackType(false)}>Confirm</Button>
                </>
            ) : (
                <>
                    <Card poke={capturedPokemon} isCaptured />

                    <Center gap={4}>
                        <Button mt={4} onClick={() => handleFinishCapture({ removedId: null, dayCare: false, starterTeam: false })}>
                            Add to box
                        </Button>
                        <Button mt={4} isDisabled={!selectedToRemove} onClick={() => handleFinishCapture({ removedId: selectedToRemove, dayCare: false, starterTeam: false })}>
                            Add to team
                        </Button>
                        <Button mt={4} onClick={() => handleFinishCapture({ removedId: null, dayCare: true, starterTeam: false })}>
                            Left on Day Care
                        </Button>
                    </Center>

                    {isTeamFull && (
                        <>
                            <Text mt={4}>Change with a pokemon on team</Text>
                            <Text fontSize={"xx-small"}>The selected pokemon goes to your box</Text>

                            <Center flex flexDir={"row"} gap={4} mt={4}>
                                {pokeTeam?.map((poke) => {
                                    return (
                                        <Box 
                                            key={poke.id}
                                            cursor={"pointer"}
                                            _hover={{ opacity: 1 }}
                                            opacity={selectedToRemove === poke.id ? 1 : 0.4}
                                            boxShadow={selectedToRemove === poke.id ? "0 0 10px 6px rgba(255, 255, 255, 0.7)" : "none"}
                                            borderRadius={8}
                                            onClick={() => setSelectedToRemove(poke.id)}
                                        >
                                            <Card
                                                poke={poke}
                                                pokeTeam={pokeTeam}
                                                isCaptured
                                            />
                                        </Box>
                                    )
                                })}
                            </Center>
                        </>
                    )}
                </>
            )}
        </Center>
    )
}