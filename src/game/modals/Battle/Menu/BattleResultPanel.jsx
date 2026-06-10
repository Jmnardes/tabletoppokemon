import { Button, Center, Flex, Text } from "@chakra-ui/react"
import { useContext } from "react"

import PlayerContext from "@context/PlayerContext"
import PrizeIcon from "@features/prizes/PrizeIcon"
import { FaDoorOpen } from "react-icons/fa"

export default function BattleResultPanel({ battleResult, myPlayerId, event }) {
    const { updateStatus, updateStatusAmount, setLoading, playerWinPrize, advancePhase } = useContext(PlayerContext)
    const iWon = battleResult.winnerId === myPlayerId
    const prize = event.prizes[0]

    const handleLeave = async () => {
        if (iWon) {
            setLoading({ loading: true, text: "Awarding..." })
            await updateStatus('wins')
            await updateStatusAmount(5, 'ranking')
            setLoading({ loading: false })
        } else {
            setLoading({ loading: true, text: "Awarding..." })
            await updateStatus('loses')
            await playerWinPrize(prize)
            setLoading({ loading: false })
        }

        advancePhase()
    }

    return (
        <Center flexDir="column" gap={6} w="100%">
            {iWon ? (
                <Text fontSize="3xl">You won! +5 Rank</Text>
            ) : (
                <Flex justifyContent="center" alignItems="center" gap={2}>
                    <Text fontSize="3xl">You lost but received {prize.amount}</Text>
                    <PrizeIcon type={prize.name} size={12} />
                </Flex>
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
