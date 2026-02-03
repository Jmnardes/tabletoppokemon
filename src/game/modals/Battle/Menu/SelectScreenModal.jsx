import { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    Button,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import ShowBattleTeam from "./ShowBattleTeam"

export default function SelectScreenModal() {
    const { updateGame, getTeamPokemons } = useContext(PlayerContext)
    const [battleTeam, setBattleTeam] = useState([])

    useEffect(() => {
        setBattleTeam(getTeamPokemons())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal isOpen size={"full"} isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <ModalHeader fontSize="3xl" textAlign="center" pt={0}>
                        Select your team
                    </ModalHeader>

                    {/* <PokeBox battleBox={true} battleTeam={battleTeam} setBattleTeam={setBattleTeam} /> */}

                    <ShowBattleTeam battleTeam={battleTeam} setBattleTeam={setBattleTeam} />

                    <Button mt={6} h={12} onClick={() => {
                        updateGame({ openSelectScreenModal: false })
                    }}>
                        Close
                    </Button>
                </ModalContent>
            </Modal>
        </>
    )
}