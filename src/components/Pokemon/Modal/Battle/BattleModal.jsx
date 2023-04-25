import { useContext } from "react"
import {
    Modal,
    ModalContent,
    Button,
    ModalOverlay,
} from "@chakra-ui/react"
import PlayerContext from "../../../../Contexts/PlayerContext"
import BattleContent from "../../Battle/BattleContent"

export default function BattleModal() {
    const { updateGame } = useContext(PlayerContext)

    return (
        <>
            <Modal isOpen size={"full"} isCentered>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px) hue-rotate(0deg)'
                />
                <ModalContent p={4}>
                    <BattleContent />

                    <Button mt={6} h={12} onClick={() => {
                        updateGame({ openBattleModal: false })
                    }}>
                        Close
                    </Button>
                </ModalContent>
            </Modal>
        </>
    )
}