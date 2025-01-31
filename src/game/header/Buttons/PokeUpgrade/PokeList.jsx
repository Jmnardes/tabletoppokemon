import React from 'react'
import { HStack } from '@chakra-ui/react'
import PokeCard from './PokeCard'

export default function PokeList ({ allPokemon, setSelectedPokemon }) {
    return (
        <HStack 
            h={44} overflowX={"auto"} spacing={1} my={2}
            direction={['column', 'row']}
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
            {allPokemon?.map((poke) => {
                return (
                    <PokeCard
                        key={poke.id} 
                        pokemon={poke}
                        setSelectedPokemon={setSelectedPokemon}
                    />
                )
            })}
        </HStack>
    )
}