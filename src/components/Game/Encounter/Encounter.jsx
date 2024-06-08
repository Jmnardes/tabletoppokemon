import { Button, Center, Flex, Image, SimpleGrid, keyframes } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import { typeColor } from "../../../util";
import EncounterBalls from "./EncounterBalls";
import { catchDifficulty } from "../../../util/pokemonFunctions";
import { FaStar } from "react-icons/fa"
import SadIcon from "../../Icons/emote/SadIcon"

export default function Encounter() {
    const { session, encounter, emit, setLoadingApi, updateGame, player } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const [catchablePokemon, setCatchablePokemon] = useState(true)
    const catchDiceRolled = useRef(false)
    const catchablePokemons = useRef(4)
    const divisibleByThree = encounter.length % 3 === 0
    
    const handleCatchDiceRoll = (result) => {
        catchDiceRolled.current = true
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
        const shiny = poke.rarity === 3
        let catchRollDifficulty = catchDifficulty(
            poke.tier, 
            session.gameDifficulty,
            poke.rarity, 
            shiny
        )

        if(session.turns === 0) catchRollDifficulty = 0

        const disableCatch = !catchDiceRolled.current && catchRollDifficulty > catchRoll
        const colorByType = typeColor(poke.types)
        if(catchRollDifficulty > catchRoll) catchablePokemons.current--
    
        const pulseAnimation = keyframes`
            0% {
                transform: scale(0.99);
                box-shadow: 0 0 0 0 ${shiny ? 'white' : colorByType};
            }
        
            70% {
                transform: scale(1);
                box-shadow: 0 0 0 ${shiny ? '10px' : '6px'} rgba(0, 0, 0, 0);
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
        if(catchablePokemons.current === 0 && catchDiceRolled.current) setCatchablePokemon(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catchablePokemons.current, catchDiceRolled.current])

    return (
        <Center>
            {(player.balls.pokeball === 0 &&
                player.balls.greatball === 0 && 
                player.balls.ultraball === 0 &&
                player.balls.masterball === 0 &&
                catchRoll === 0) ? (
                    <Button mt={6} h={12} onClick={() => {
                        updateGame({ openEncounterModal: false })
                    }}>
                        Sorry, you don't have pokeballs
                    </Button>
            ) : (
                <EncounterBalls handleCatchDiceRoll={handleCatchDiceRoll}>
                    {catchablePokemon && catchRoll > 0 ? (
                        <Center flexDirection="column">
                            <SadIcon h={16} w={16} />

                            <Button mt={6} h={12} onClick={() => {
                                updateGame({ openEncounterModal: false })
                            }}>
                                Sorry, they ran!
                            </Button>
                        </Center>
                    ) : (
                        <SimpleGrid columns={divisibleByThree ? 3 : 2} p={2}>
                            {encounter.map(poke => {
                                return <PokemonEncounterCard key={poke.id} poke={poke} />
                            })}
                        </SimpleGrid>
                    )}
                </EncounterBalls>
            )}
        </Center>
    )
}