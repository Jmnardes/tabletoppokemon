import { Box, Button, HStack, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import { typeColor } from "../../../util"
import Inventary from "../Inventary/Inventary"
import { FaDollarSign, FaArrowDown } from "react-icons/fa";

export default function PokeBox({ battleBox, battleTeam, setBattleTeam }) {
    const { pokeBox, pokeTeam, session, updatePokeTeam, removeFromPokeBox, updateCurrency } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const sellPokemon = (poke) => {
        updateCurrency(poke.tier + poke.shiny + poke.rarity.rarity, 'coins')
    }

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
                    <Box key={poke.id}>
                        <Inventary 
                            poke={poke} 
                            battleBox={battleBox} 
                            battleTeam={battleTeam} 
                            setBattleTeam={setBattleTeam}
                            pokeBox={pokeBox}
                            removeFromPokeBox={removeFromPokeBox}
                        />
                        <Box display="flex" justifyContent="center">
                            { !battleBox && (
                                <>
                                    <Button
                                        size="sm" 
                                        width="50%"
                                        h={6}
                                        borderRadius="0 0 0 16px"
                                        borderLeft={`2px solid ${typeColor(poke.types)}`}
                                        borderRight={`1px solid ${typeColor(poke.types)}`}
                                        borderBottom={`2px solid ${typeColor(poke.types)}`}
                                        _hover={{
                                            backgroundColor: (colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60"),
                                            cursor: "pointer",
                                            borderLeft: `2px solid ${(colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60")}`,
                                            borderBottom: `2px solid ${(colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60")}`
                                        }}
                                        isDisabled={pokeTeam?.length >= session.teamLength ? true : false}
                                        onClick={() => {
                                            updatePokeTeam(poke)
                                            removeFromPokeBox(poke, pokeBox)
                                        }}
                                    >
                                        <FaArrowDown size="12px" style={{ color: (colorMode === 'light' ? "#000000" :"#ffffff"), marginRight: "4px" }}/>
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        width="50%"
                                        h={6}
                                        title={poke.tier + poke.shiny + poke.rarity.rarity}
                                        borderRadius="0 0 16px 0"
                                        borderLeft={`1px solid ${typeColor(poke.types)}`}
                                        borderRight={`2px solid ${typeColor(poke.types)}`}
                                        borderBottom={`2px solid ${typeColor(poke.types)}`}
                                        _hover={{
                                            backgroundColor: (colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60"),
                                            cursor: "pointer",
                                            borderRight: `2px solid ${(colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60")}`,
                                            borderBottom: `2px solid ${(colorMode === 'light' ? "#2b2b2bae" : "#bbbbbb60")}`
                                        }}
                                        onClick={() => {
                                            removeFromPokeBox(poke, pokeBox)
                                            sellPokemon(poke)
                                        }}
                                    >
                                        <FaDollarSign size="12px" style={{ color: (colorMode === 'light' ? "#000000" :"#ffffff") }}/>
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                )
            })}
        </HStack>
    )
}