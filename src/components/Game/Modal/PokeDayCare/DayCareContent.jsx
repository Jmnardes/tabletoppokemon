import React from 'react'
import { Wrap } from '@chakra-ui/react'
import DayCarePoke from './DayCarePoke'

export default function DayCare ({ handleTrade, pokeBox }) {
    return (
        <Wrap direction={['column', 'row']} spacing={4} p={4}>
            {pokeBox?.map((poke) => {
                return (
                    <DayCarePoke
                        key={poke.id} 
                        pokemon={poke}
                        handleTrade={handleTrade}
                    />
                )
            })}
        </Wrap>
    )
}