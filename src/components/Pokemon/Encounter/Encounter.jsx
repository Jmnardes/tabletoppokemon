import { Button, Center, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import { diceRoll, typeColor } from "../../../util";
import Types from "../Table/Types";
import EncounterBalls from "./EncounterBalls";
import { catchDifficulty } from "../../../util/pokemonFunctions";

export default function Encounter({ setCatchablePokemon }) {
    const { encounter, updatePokeBox, updateGame, session } = useContext(PlayerContext)
    const [catchRoll, setCatchRoll] = useState(0)
    const catchDiceRolled = useRef(false)
    const catchablePokemons = useRef(4)
    const divisibleByThree = encounter.length % 3 === 0
    
    const handleCatchDiceRoll = (bonus) => {
        let result = diceRoll(19)
        result += bonus

        catchDiceRolled.current = true
        setCatchRoll(result)
    }

    const PokemonEncounterCard = ({ poke }) => {
        let catchRollDifficulty = catchDifficulty(poke.tier, session.gameDifficulty) + poke.shiny

        if(session.turns === 0) catchRollDifficulty = 0

        const disableCatch = !catchDiceRolled.current && catchRollDifficulty > catchRoll
        let colorByType = typeColor(poke.types)

        if(catchRollDifficulty > catchRoll) catchablePokemons.current--

        return (
            <Flex px={4} py={2}>
                <Button
                    background=""
                    borderRadius={4}
                    h={36} p={1}
                    isDisabled={disableCatch}
                    _hover={disableCatch ? {} : { 'cursor': 'pointer', 'opacity': 0.7 }}
                    onClick={() => {
                        updateGame({ isPokemonRollDisabled: true, openEncounterModal: false })
                        updatePokeBox(poke)
                        setCatchablePokemon(true)
                    }}
                >
                    <Image
                        h="100%" w="100%"
                        borderRadius={16}
                        title={poke.name}
                        backgroundColor={colorByType}
                        src={poke.sprites.front}
                    />
                    <Types
                        types={poke.types} 
                        shiny={poke.shiny}
                        tier={poke.tier} 
                        color={colorByType}
                    />
                </Button>
            </Flex>
        )
    }

    useEffect(() => {
        catchablePokemons.current = 4
    }, [])

    useEffect(() => {
        if(catchablePokemons.current === 0 && catchDiceRolled.current) setCatchablePokemon(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catchablePokemons.current, catchDiceRolled.current])

    return (
        <Center>
            <EncounterBalls handleCatchDiceRoll={handleCatchDiceRoll}>
                <SimpleGrid columns={divisibleByThree ? 3 : 2} p={2}>
                    {encounter.map(poke => {
                        return <PokemonEncounterCard key={poke.id} poke={poke} />
                    })}
                </SimpleGrid>
            </EncounterBalls>
        </Center>
    )
}