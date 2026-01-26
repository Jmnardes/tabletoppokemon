import { HStack } from "@chakra-ui/react"
import { useContext } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import PokeBox from "./PokeBox"

export default function TeamInBox() {
    const { boxWithData } = useContext(PlayerContext)

    return (
        <HStack
            p={1}
            h={28}
            direction={['column', 'row']}
            justifyContent="center"
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
            {boxWithData?.map((poke) => {
                return (
                    <PokeBox 
                        key={poke.id} 
                        poke={poke}
                    />
                )
            })}
        </HStack>
    )
}