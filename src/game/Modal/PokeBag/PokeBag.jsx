import { useContext, useEffect } from "react"
import {
    ModalHeader,
    Text,
    CloseButton,
    Center,
    ModalBody,
} from "@chakra-ui/react"
import PlayerContext from "../../../Contexts/PlayerContext"
import PokeBox from "../../Trainer/PokeBox"
import PokeTeam from "../../Trainer/PokeTeam"
import socket from "../../../client"

export default function PokeBag() {
    const { updateGame, pokeTeam, pokeBox, emit } = useContext(PlayerContext)

    const playerUpdateBag = () => {
        updateGame({ openPokeBoxModal: false, showBagLength: false })
    }

    useEffect(() => {
        socket.on('player-update-bag', playerUpdateBag)

        return () => {
            socket.off('player-update-bag', playerUpdateBag)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <ModalHeader fontSize="3xl" textAlign="center">
                <Center>
                    <Text>Poke Bag</Text>
                    <CloseButton 
                        position="absolute" 
                        right="20px"
                        isDisabled={pokeTeam.length !== 3 && (pokeBox.length + pokeTeam.length) >= 3}
                        title={pokeTeam.length !== 3 ? 'Você precisa de 3 pokemons no time' : 'Fechar'}
                        onClick={() => {
                            const newTeamIds = pokeTeam.map((poke) => poke.id)
                            emit('player-update-bag', { pokeTeamIds: newTeamIds })
                        }} 
                    />
                </Center>
            </ModalHeader>
            
            <ModalBody>
                <PokeBox />

                <PokeTeam bag={true} />
            </ModalBody>
        </>
    )
}