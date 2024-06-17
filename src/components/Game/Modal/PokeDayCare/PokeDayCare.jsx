import { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    CloseButton,
    Center,
    ModalBody,
} from "@chakra-ui/react"
import DayCareContent from "./DayCareContent"
import PlayerContext from "../../../../Contexts/PlayerContext"
import socket from "../../../../client"

export default function PokeDayCare() {
    const { updateGame, pokeBox, removeFromPokeBoxById, setLoadingApi, emit, handleToast, updateStatusAmount } = useContext(PlayerContext)

    const handleTrade = (pokemon) => {
        emit('player-pokemon-trade', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
        setLoadingApi(true)
    };

    useEffect(() => {
        socket.on('player-pokemon-trade', res => {
            setLoadingApi(false)
            
            if (res) {
                removeFromPokeBoxById(res.pokeId, pokeBox)
                updateStatusAmount('candy', res.candy)
                handleToast({
                    title: 'Pokémon care',
                    description: `Your ${res.name} will be treated with kindness, you received ${res.candy} candy(s)`,
                    status: 'info',
                    duration: 6000
                })
            }
        })

        return () => {
            socket.off('player-pokemon-trade')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal isOpen size="full" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent>
                    <ModalHeader fontSize="3xl" textAlign="center">
                        <Center>
                            <Text>Pokémon Day Care</Text>
                            <CloseButton 
                                position="absolute" 
                                right="20px"
                                title={'Fechar'}
                                onClick={() => updateGame({ openDayCareModal: false }) } 
                            />
                        </Center>
                    </ModalHeader>
                    
                    <ModalBody>
                        <Text textAlign={"center"}>Select a pokémon to leave it in Day Care dependencies</Text>
                        <DayCareContent handleTrade={handleTrade} pokeBox={pokeBox} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}