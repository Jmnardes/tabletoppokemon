import { Button, Center, Flex, Text } from "@chakra-ui/react"
import { useContext } from "react"

import PlayerContext from "@context/PlayerContext"
import PrizeIcon from "@features/prizes/PrizeIcon"
import { FaDoorOpen } from "react-icons/fa"

export default function BattleResultPanel({ battleResult, myPlayerId, event }) {
    const { updateStatus, setLoading, playerWinPrize, advancePhase } = useContext(PlayerContext)
    const iWon = battleResult.winnerId === myPlayerId
    const prize = event.prizes[2]

    const handleLeave = async () => {
        if (iWon) {
            setLoading({ loading: true, text: "Awarding..." })
            await updateStatus('wins')
            await playerWinPrize(prize)
            setLoading({ loading: false })
        } else {
            await updateStatus('loses')
        }

        advancePhase()
    }

    return (
        <Center flexDir="column" gap={6} w="100%">
            {iWon ? (
                <Flex justifyContent="center" alignItems="center" gap={2}>
                    <Text fontSize="3xl">You won and received {prize.amount}</Text>
                    <PrizeIcon type={prize.name} size={12} />
                </Flex>
            ) : (
                <Text fontSize="3xl">Sorry, you lost the battle</Text>
            )}

            <Button
                size="lg"
                onClick={handleLeave}
                leftIcon={<FaDoorOpen />}
            >
                Leave Battle
            </Button>
        </Center>
    )
}
