import { Button, Center, Flex, Image, SimpleGrid, keyframes } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import { typeColor } from "../../../util";
import EncounterBalls from "./EncounterBalls";
import { catchDifficulty } from "../../../util/pokemonFunctions";
import { FaStar } from "react-icons/fa"

export default function Encounter() {
    const { session, encounter, emit, setLoadingApi, updateGame, player } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const [catchDiceWasRolled, setCatchDiceWasRolled] = useState(false)
    const [allDisabled, setAllDisabled] = useState(false);
    const divisibleByThree = encounter.length % 3 === 0
    
    const handleCatchDiceRoll = (result) => {
        setCatchDiceWasRolled(true)
        setCatchRoll(result)
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
        const catchRollDifficulty = catchDifficulty(
            poke.tier, 
            session.gameDifficulty,
            poke.rarity, 
            poke.shiny,
            session.turns
        )

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
                            <PokeRarity rarity={poke.rarity} />
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
            const catchRollDifficulty = catchDifficulty(
                poke.tier, 
                session.gameDifficulty,
                poke.rarity, 
                poke.shiny,
                session.turns
            );
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
                        <EncounterBalls handleCatchDiceRoll={handleCatchDiceRoll}>
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