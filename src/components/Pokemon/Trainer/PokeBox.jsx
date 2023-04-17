import { Box, Button, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "../../../Contexts/PlayerContext"
import { tierSellingPrice, typeColor } from "../../../util"
import Inventary from "../Inventary/Inventary"
import { FaPlusSquare, FaDollarSign } from "react-icons/fa";

export default function PokeBox() {
    const { pokeBox, pokeTeam, session, updatePokeTeam, removeFromPokeBox } = useContext(PlayerContext)

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
                        <Inventary poke={poke} />
                        <Box display="flex" justifyContent="center">
                            <Button
                                size="sm" 
                                width="50%" 
                                borderRadius="0 0 0 16px"
                                borderLeft={`2px solid ${typeColor(poke.types)}`}
                                borderBottom={`2px solid ${typeColor(poke.types)}`}
                                _hover={{
                                    backgroundColor: `#327ae64c`,
                                    cursor: "pointer",
                                    borderLeft: "2px solid #327ae64c",
                                    borderBottom: "2px solid #327ae64c"
                                }}
                                isDisabled={pokeTeam?.length >= session.teamLength ? true : false}
                                onClick={() => {
                                    updatePokeTeam(poke)
                                    removeFromPokeBox(poke, pokeBox)
                                }}
                            >
                                <FaPlusSquare size="16px" style={{ color: "#085ad6", marginRight: "4px" }}/>
                            </Button>
                            <Button 
                                size="sm" 
                                width="50%"
                                title={
                                    poke.shiny 
                                    ? tierSellingPrice(poke.tier + 1) 
                                    : tierSellingPrice(poke.tier)
                                }
                                borderRadius="0 0 16px 0"
                                borderRight={`2px solid ${typeColor(poke.types)}`}
                                borderBottom={`2px solid ${typeColor(poke.types)}`}
                                _hover={{
                                    backgroundColor: "#52d73750",
                                    cursor: "pointer",
                                    borderRight: "2px solid #52d73750",
                                    borderBottom: "2px solid #52d73750"
                                }}
                                onClick={() => removeFromPokeBox(poke)}
                            >
                                <FaDollarSign size="16px" style={{ color: "green" }}/>
                            </Button>
                        </Box>
                    </Box>
                )
            })}
        </HStack>
    )
}