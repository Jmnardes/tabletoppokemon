import { useContext, useEffect } from "react"
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    CloseButton,
    Center,
    ModalBody,
    Image,
} from "@chakra-ui/react"
import DayCareContent from "./DayCareContent"
import dustIcon from '@assets/images/items/dust.png'

export default function PokeDayCare() {
    const { updateGame, pokeBox, removeFromPokeBoxById, setLoadingApi, emit, handleToast, updateItem } = useContext(PlayerContext)

    const handleTrade = (pokemon) => {
        emit('player-pokemon-trade', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
        setLoadingApi(true)
    };

    useEffect(() => {
        socket.on('player-pokemon-trade', res => {
            setLoadingApi(false)
            
            if (res) {
                console.log(res)
                removeFromPokeBoxById(res.pokeId, pokeBox)
                updateItem(res.dust, 'dust')
                handleToast({
                    title: 'Pokémon care',
                    description: `Your ${res.name} will be treated with kindness, you received ${res.dust} dust(s)`,
                    status: 'info',
                    duration: 6000,
                    icon:<Image src={dustIcon} w={12}></Image>
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