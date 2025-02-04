import { useContext, useEffect } from "react"
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

import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import DayCareContent from "./DayCareContent"
import useHandleTasks from "@hooks/useHandleTask";
import { taskTypeEnum } from "@enum"

import dustIcon from '@assets/images/items/dust.png'

export default function PokeDayCare() {
    const { updateGame, pokeBox, removeFromPokeBoxById, setLoadingApi, emit, handleToast, updateItem } = useContext(PlayerContext)
    const handleTasks = useHandleTasks()

    const handleTrade = (pokemon) => {
        emit('player-pokemon-trade', { pokeId: pokemon.id, rarity: pokemon.rarity.rarity })
        setLoadingApi(true)
    };

    useEffect(() => {
        const handleTradeResponse = (res) => {
            setLoadingApi(false);
    
            if (res) {
                removeFromPokeBoxById(res.pokeId, pokeBox);
                updateItem(res.dust, 'dust');
                handleTasks({ type: taskTypeEnum.gainDust, amount: res.dust });
    
                handleToast({
                    title: 'Pokémon Day Care',
                    description: `Your ${res.name} will be treated with kindness, you received ${res.dust} dust(s)`,
                    status: 'info',
                    duration: 6000,
                    icon: <Image src={dustIcon} w={12} />,
                });
            }
        };
    
        socket.off('player-pokemon-trade', handleTradeResponse);
        socket.on('player-pokemon-trade', handleTradeResponse);
    
        return () => {
            socket.off('player-pokemon-trade', handleTradeResponse);
        };
    }, [removeFromPokeBoxById, updateItem, handleTasks, setLoadingApi, handleToast]);

    // useEffect(() => {
    //     socket.on('player-pokemon-trade', res => {
    //         setLoadingApi(false)
            
    //         if (res) {
    //             removeFromPokeBoxById(res.pokeId, pokeBox)
    //             changeItem(res.dust.current, 'dust')
    //             handleTasks({ type: taskTypeEnum.gainDust, amount: res.dust.received })
    //             handleToast({
    //                 title: 'Pokémon Day Care',
    //                 description: `Your ${res.name} will be treated with kindness, you received ${res.dust.received} dust(s)`,
    //                 status: 'info',
    //                 duration: 6000,
    //                 icon:<Image src={dustIcon} w={12}></Image>
    //             })
    //         }
    //     })

    //     return () => {
    //         socket.off('player-pokemon-trade')
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

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