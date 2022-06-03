import React, { useState } from "react"

import items from '../../assets/json/items.json'
import events from '../../assets/json/events.json'
import treasures from '../../assets/json/treasures.json'

import { Box, Button, Container, Image, Text } from '@chakra-ui/react'

const Pokecards = () => {
    const [card, setCard] = useState([])

    const handleDrawCard = (type) => {
        if ( type === 'item') {
            let sort = Math.floor(Math.random() * items.length)
            setCard(items[sort])
        }

        if ( type === 'event') {
            let sort = Math.floor(Math.random() * events.length)
            setCard(events[sort])
        }

        if ( type === 'treasure') {
            let sort = Math.floor(Math.random() * treasures.length)
            setCard(treasures[sort])
        }
    }

    return (
         <Container>
            <Box textAlign="center">
                <Button m={2} onClick={() => handleDrawCard('item')}>draw item</Button>
                <Button m={2} onClick={() => handleDrawCard('event')}>draw event</Button>
                <Button m={2} onClick={() => handleDrawCard('treasure')}>draw treasure</Button>
            </Box>
            <Box textAlign="center">
                <Text fontSize='4xl' m={2}>{card.name}</Text>
                <Image 
                    src={card.picture} 
                    alt={card.name}
                    m="4px auto"
                    boxSize='16rem'
                />
                <Text 
                    backgroundColor="#2D3748"
                    borderRadius={4}
                    height={28}
                    p={2}
                >{card.description}</Text>
            </Box>
        </Container>
    )
}

export default Pokecards