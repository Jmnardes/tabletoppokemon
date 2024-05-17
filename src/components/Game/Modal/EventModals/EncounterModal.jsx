import { useContext, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    Button,
    ModalOverlay,
    Center,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import Encounter from "../../Encounter/Encounter"
import SadIcon from "../../../Icons/emote/SadIcon"

export default function EncounterModal() {
    const { updateGame, session, player } = useContext(PlayerContext)
    const [catchablePokemon, setCatchablePokemon] = useState(true)

    return (
        <>
            <Modal isOpen size="xl" isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        {session.turns === 0 ? (
                            'Starter Pokémon'
                        ) : (
                            'Pokémon Encounter'
                        )}
                    </ModalHeader>

                    {catchablePokemon ? (
                        <Encounter setCatchablePokemon={setCatchablePokemon} />
                    ) : (
                        <Center flexDirection="column">
                            <SadIcon h={16} w={16} />

                            <Button mt={6} h={12} onClick={() => {
                                updateGame({ openEncounterModal: false })
                            }}>
                                Sorry, you lost all of them
                            </Button>
                        </Center>
                    )}

                    {(player.balls.pokeball === 0 &&
                    player.balls.greatball === 0 && 
                    player.balls.ultraball === 0 &&
                    player.balls.masterball === 0) && (
                        <Button mt={6} h={12} onClick={() => {
                            updateGame({ openEncounterModal: false })
                        }}>
                            Sorry, you don't have pokeballs
                        </Button>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}