import { Button, Center, Flex, Image, SimpleGrid, Text, Tooltip, keyframes, useColorMode } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import { detailedDifficultyColors, typeColor } from "../../../util"
import EncounterBalls from "./EncounterBalls"
import { catchDifficulty, varianceCatchDifficulty } from "../../../util/pokemonFunctions"
import { FaStar } from "react-icons/fa"
import pokeballIcon from "../../../assets/images/pokeballs/pokeball.png"
import { pulseAnimation } from "../../Animations"
import { FaInfoCircle } from "react-icons/fa";
import CustomTooltip from "../Modal/CustomTooltip"

export default function EncounterNew() {
    const { session, encounter, emit, setLoadingApi, updateGame, player, handleToast, pokeTeam } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const [catchDiceWasRolled, setCatchDiceWasRolled] = useState(false)
    const [allDisabled, setAllDisabled] = useState(false);
    const divisibleByThree = encounter.length % 3 === 0
    const { colorMode } = useColorMode()
    
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
        const catchMediumDifficulty = varianceCatchDifficulty(poke.level)

        const { color, label } = detailedDifficultyColors(catchRollDifficulty - catchMediumDifficulty)
        console.log(catchRollDifficulty, catchMediumDifficulty)

        const disableCatch = (!catchDiceWasRolled || catchRollDifficulty > catchRoll) && !divisibleByThree
        const colorByType = typeColor(poke.types)

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
                        <Center position="absolute" w={"80%"} p={0.5} borderRadius={12} zIndex={5} mb={28}
                            backgroundColor={colorMode === 'light' ? 'white' : 'gray.600'}
                        >
                            <CustomTooltip
                                label={label}
                                fontSize="xs"
                                color={color}
                            >
                                <Text fontSize={"2xs"} color={color}>
                                    {poke.name}
                                </Text>
                            </CustomTooltip>
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
                    <CustomTooltip
                        label={'Your chances of successfully catching a Pokemon during an encounter increase with the strength of the Pokemon on your team.'}
                    >
                        <Text style={{
                            'position': 'absolute',
                            'top': '30px',
                            'right': '25px'
                        }}>
                            <FaInfoCircle size={20} />
                        </Text>
                    </CustomTooltip>
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