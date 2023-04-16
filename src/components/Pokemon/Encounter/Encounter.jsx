import { Center, Flex, Image } from "@chakra-ui/react";
import { useContext } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import { typeColor } from "../../../util";
import Types from "../Table/Types";
import EncounterBalls from "./EncounterBalls";

export default function Encounter() {
    const { encounter, updatePokeBox, updateGame, game } = useContext(PlayerContext)

    const PokemonEncounterCard = ({ poke }) => {
        let colorByType = typeColor(poke.types)

        return (
            <Flex isDisabled={game.isPokemonRollDisabled} onClick={() => {
                // disable other pokemons
                updateGame({ isPokemonRollDisabled: true })
                // set new poke in box
                updatePokeBox(poke)
            }}>
                <Image
                    w={28}
                    title={poke.name}
                    backgroundColor={`${colorByType}90`}
                    src={poke.sprites.front}
                />
                {poke.tier}
                <Types
                    types={poke.types} 
                    shiny={poke.shiny}
                    tier={poke.tier} 
                    color={colorByType}
                />
            </Flex>
        )
    }

    return (
        <Center>
            <EncounterBalls>
                {encounter.map(poke => {
                    return <PokemonEncounterCard key={poke.id} poke={poke} />
                })}
            </EncounterBalls>
        </Center>
    )
}