import React, { useState } from "react"
import { FaGift } from "react-icons/fa";
import PokeModal from "./Modal/Modal"

import items from '../../assets/json/items.json'
import events from '../../assets/json/events.json'
import treasures from '../../assets/json/treasures.json'

import { Box, Button, Container, Image, Text } from '@chakra-ui/react'

const PokeItems = () => {
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
        <PokeModal title={'Cards'} button={<FaGift size="22px"/>}>
            <Container>
                <Box textAlign="center">
                    <Button m={2} onClick={() => handleDrawCard('item')}>Item</Button>
                    <Button m={2} onClick={() => handleDrawCard('event')}>Event</Button>
                    <Button m={2} onClick={() => handleDrawCard('treasure')}>Treasure</Button>
                </Box>
                <Box textAlign="center" backgroundColor="#1A202C" borderRadius={8} p={2} mb={4}>
                    <Text fontSize='4xl' m={2}>{card.name}</Text>
                    <Image 
                        src={card.picture} 
                        alt={card.name}
                        m="4px auto"
                        height="16rem"
                        objectFit='cover'
                        borderRadius={8}
                        mb={2}
                    />
                    <Text 
                        backgroundColor="#2D3748"
                        borderRadius={8}
                        height={28}
                        p={2}
                    >{card.description}</Text>
                </Box>
            </Container>
        </PokeModal>
    )
}

export default PokeItems