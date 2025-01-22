import { Button, Center, Flex, Image, SimpleGrid, Text, keyframes } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import { typeColor } from "@utils";
import EncounterBalls from "./EncounterBalls";
import { catchDifficulty } from "@utils/pokemonFunctions";
import { FaStar } from "react-icons/fa"
import pokeballIcon from "@assets/images/pokeballs/pokeball.png"

export default function Encounter() {
    const { session, encounter, emit, setLoadingApi, updateGame, player, handleToast, pokeTeam } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const [catchDiceWasRolled, setCatchDiceWasRolled] = useState(false)
    const [allDisabled, setAllDisabled] = useState(false);
    const divisibleByThree = encounter.length % 3 === 0
    
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
        const catchRollDifficulty = catchDifficulty(session, poke, pokeTeam)

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
                        emit('player-capture-pokemon', poke.id)
                        setLoadingApi(true)
                    }}
                >
                    <>
                        <Center position="absolute" mb={28}>
                            <Text fontSize={"2xs"}>{
                                session.turns === 1 ? 1 : poke.level
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
            const catchRollDifficulty = catchDifficulty(session, poke, pokeTeam)
            return (!catchDiceWasRolled || catchRollDifficulty > catchRoll) && !divisibleByThree;
        });
        setAllDisabled(allDisabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [encounter, catchDiceWasRolled]);

    return (
        <Center>
            {(player.balls.pokeball === 0 &&
                player.balls.greatball === 0 && 
                player.balls.ultraball === 0 &&
                player.balls.masterball === 0 &&
                !catchDiceWasRolled) ? (
                    <Button mt={6} h={12} onClick={() => {
                        updateGame({ openEncounterModal: false })
                    }}>
                        Sorry, you don't have pokeballs
                    </Button>
            ) : (
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
                            onClick={() => {updateGame({ openEncounterModal: false })}}
                        >
                            Leave encounter
                        </Button>
                    )}
                </Center>
            )}
        </Center>
    )
}