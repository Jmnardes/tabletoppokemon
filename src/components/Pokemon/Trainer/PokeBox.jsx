import { HStack } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import BoxPoke from "./BoxPoke"

export default function PokeBox({ battleBox, battleTeam, setBattleTeam }) {
    const { pokeBox, updatePokeTeam, removeFromPokeBox } = useContext(PlayerContext)

    return (
        <HStack
            p={1}
            h={28}
            direction={['column', 'row']}
            spacing={1}
            overflowX={"auto"}
            css={{
                "&::-webkit-scrollbar": {
                    height: "14px",
                    width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                    width: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#4A5568",
                    borderRadius: "24px",
                },
            }}
        >
            {pokeBox?.map((poke) => {
                return (
                    <BoxPoke 
                        key={poke.id} 
                        poke={poke} 
                        battleBox={battleBox} 
                        battleTeam={battleTeam} 
                        setBattleTeam={setBattleTeam}
                        pokeBox={pokeBox}
                        removeFromPokeBox={removeFromPokeBox}
                        updatePokeTeam={updatePokeTeam}
                    />
                )
            })}
        </HStack>
    )
}