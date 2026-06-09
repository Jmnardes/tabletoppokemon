import { Box, Button, Center, Flex, Image, SimpleGrid, Text, keyframes } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import PlayerContext from "@context/PlayerContext";
import { typeColor } from "@utils";
import EncounterBalls from "./EncounterBalls";
import { catchDifficulty } from "@utils/pokemonFunctions";

import { FaStar } from "react-icons/fa"
import pokeballIcon from "@assets/images/pokeballs/pokeball.png"

const elementLabels = {
    grass: { label: 'Grass', color: '#78C850' },
    fire: { label: 'Fire', color: '#F08030' },
    water: { label: 'Water', color: '#6890F0' },
}

function StarterEncounter({ encounter, emit, setLoading }) {
    const [selected, setSelected] = useState({ grass: null, fire: null, water: null })
    const allSelected = selected.grass && selected.fire && selected.water

    const handleSelect = (element, poke) => {
        setSelected(prev => ({
            ...prev,
            [element]: prev[element]?.id === poke.id ? null : poke
        }))
    }

    const handleConfirm = () => {
        const capturedIds = [selected.grass.id, selected.fire.id, selected.water.id]
        emit('player-capture-starters', { capturedIds })
        setLoading({ loading: true, text: "Choosing starters..." })
    }

    const StarterCard = ({ poke, element }) => {
        const isSelected = selected[element]?.id === poke.id
        const colorByType = typeColor(poke.types)

        const pulseAnimation = keyframes`
            0% { transform: scale(0.99); box-shadow: 0 0 0 0 ${colorByType}; }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(0, 0, 0, 0); }
            100% { transform: scale(0.99); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }`

        return (
            <Flex px={2} py={2}>
                <Button
                    background=""
                    borderRadius={4}
                    h={28} p={1}
                    border={isSelected ? '3px solid white' : '3px solid transparent'}
                    opacity={isSelected ? 1 : 0.7}
                    _hover={{ 'cursor': 'pointer', 'opacity': 1 }}
                    onClick={() => handleSelect(element, poke)}
                >
                    <>
                        <Center position="absolute" mb={20}>
                            <Text fontSize={"2xs"}>1</Text>
                        </Center>
                        <Image
                            h="100%" w="100%"
                            borderRadius={16}
                            title={poke.name}
                            backgroundColor={colorByType}
                            src={poke.sprite}
                            _hover={{ 'animation': `${pulseAnimation} 1.5s infinite` }}
                            boxShadow={isSelected ? `0 0 8px 3px white` : `0 0 4px 1px ${colorByType}`}
                        />
                    </>
                </Button>
            </Flex>
        )
    }

    return (
        <Center flexDir="column" gap={2}>
            {['grass', 'fire', 'water'].map(element => (
                <Box key={element} w="100%">
                    <Text
                        fontSize="sm" fontWeight="bold" textAlign="center"
                        color={elementLabels[element].color} mb={1}
                    >
                        {elementLabels[element].label}
                    </Text>
                    <Flex justify="center">
                        {encounter[element].map(poke => (
                            <StarterCard key={poke.id} poke={poke} element={element} />
                        ))}
                    </Flex>
                </Box>
            ))}
            <Button
                mt={4} h={12} w="80%"
                isDisabled={!allSelected}
                colorScheme="green"
                onClick={handleConfirm}
            >
                Confirm Starters
            </Button>
        </Center>
    )
}

export default function Encounter({ augments }) {
    const { session, encounter, emit, setLoading } = useContext(PlayerContext)
    const isStarter = session.turns === 0

    if (isStarter) {
        return <StarterEncounter encounter={encounter} emit={emit} setLoading={setLoading} />
    }

    return <NormalEncounter augments={augments} />
}

function NormalEncounter({ augments }) {
    const { session, encounter, emit, setLoading, updateGame, player, handleToast, teamIds, pokemonData } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const [catchDiceWasRolled, setCatchDiceWasRolled] = useState(false)
    const [allDisabled, setAllDisabled] = useState(false)
    const divisibleByThree = encounter.length % 3 === 0
    
    const teamPokemons = teamIds.map(id => pokemonData[id]).filter(Boolean)
    
    const handleCatchDiceRoll = (result) => {
        setCatchDiceWasRolled(true)
        setCatchRoll(result)

        const totalBalls = pokeballTotalSum()
        if (totalBalls < 3) {
            handleToast({
                id: 'pokeballQuantityIsLow',
                title: "You need more Pokeballs!",
                description: `You have only ${totalBalls} in your bag.`,
                icon: <Image 
                        width="32px"
                        src={pokeballIcon}
                    ></Image>,
                duration: 5000,
                position: 'top',
                status: 'warning'
            })
        }
    }

    const pokeballTotalSum = () => {
        let ballsSum = Object.values(player.balls).reduce((acc, curr) => acc + curr, 0)
        ballsSum -= 1
        return ballsSum
    }

    const PokeRarity = ({ rarity }) => {
        const renderStars = () => {
          const stars = [];
          
          for (let i = 0; i < rarity; i++) {
            stars.push(<FaStar key={i} size={12} />);
          }
      
          return stars;
        };
      
        return renderStars();
    };

    const PokemonEncounterCard = ({ poke }) => {
        const catchRollDifficulty = catchDifficulty(session, poke, teamPokemons, player)

        const disableCatch = (!catchDiceWasRolled || catchRollDifficulty > catchRoll) && !divisibleByThree
        const colorByType = typeColor(poke.types)
    
        const pulseAnimation = keyframes`
            0% {
                transform: scale(0.99);
                box-shadow: 0 0 0 0 ${poke.shiny ? 'white' : colorByType};
            }
        
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 ${poke.shiny ? '10px' : '6px'} rgba(0, 0, 0, 0);
            }
        
            100% {
                transform: scale(0.99);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            }`

        return (
            <Flex px={4} py={2}>
                <Button
                    background=""
                    borderRadius={4}
                    h={36} p={1}
                    isDisabled={disableCatch}
                    _hover={disableCatch ? {} : { 'cursor': 'pointer', 'opacity': 0.8 }}
                    onClick={() => {
                        emit('player-capture-pokemon', { capturedId: poke.id })
                        setLoading({ loading: true, text: "Capturing..." })
                    }}
                >
                    <>
                        <Center position="absolute" mb={28}>
                            <Text fontSize={"2xs"}>{
                                session.turns === 0 ? 1 : poke.level
                            }</Text>
                        </Center>
                        <Image
                            h="100%" w="100%"
                            borderRadius={16}
                            title={poke.name}
                            backgroundColor={colorByType}
                            src={poke.sprite}
                            _hover={{ 'animation': `${pulseAnimation} 1.5s infinite` }}
                            boxShadow={`0 0 4px 1px ${colorByType}`}
                        />
                        <Center position="absolute" mt={28}>
                            <PokeRarity rarity={poke.rarity} />
                        </Center>
                    </>
                </Button>
            </Flex>
        )
    }

    useEffect(() => {
        const allDisabled = encounter.every(poke => {
            const catchRollDifficulty = catchDifficulty(session, poke, teamPokemons, player)
            return (!catchDiceWasRolled || catchRollDifficulty > catchRoll) && !divisibleByThree;
        });
        setAllDisabled(allDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [encounter, catchDiceWasRolled]);

    return (
        <Center>
            <Center flexDir={"column"}>
                <Center>
                    <EncounterBalls handleCatchDiceRoll={handleCatchDiceRoll} isStarter={divisibleByThree}>
                        <Center>
                            <SimpleGrid columns={divisibleByThree ? 3 : 2} p={2}>
                                {encounter.map((poke, index) => {
                                    return <PokemonEncounterCard key={poke.id} index={index} poke={poke} />
                                })}
                            </SimpleGrid>
                        </Center>
                    </EncounterBalls>
                </Center>
                {!divisibleByThree && (
                    <Button mt={6} h={12} w="100%" isDisabled={!allDisabled || !catchDiceWasRolled} 
                        onClick={() => {
                            if (augments.list.length > 0) {
                                updateGame({ openEncounterModal: false, openAugmentsModal: true })
                            } else {
                                updateGame({ openEncounterModal: false })
                            }
                        }}
                    >
                        Leave encounter
                    </Button>
                )}
            </Center>
        </Center>
    )
}