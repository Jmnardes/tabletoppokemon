import { Button, Center, Image, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

import PlayerContext from "@context/PlayerContext"
import { FaDoorOpen } from "react-icons/fa"
import pokeboxIcon from '@assets/images/box/pokebox-closed.png'

export default function BattleResultPanel({ battleResult, myPlayerId }) {
    const { updateStatus, setLoading, playerWinPrize, advancePhase } = useContext(PlayerContext)
    const { t } = useTranslation()
    const iWon = battleResult.winnerId === myPlayerId
    const isWo = battleResult.wo

    const handleLeave = async () => {
        if (iWon) {
            setLoading({ loading: true, text: "Awarding..." })
            await updateStatus('wins')
            await playerWinPrize({ type: 'boxes', name: 'pokebox', amount: 1 })
            setLoading({ loading: false })
        } else {
            await updateStatus('loses')
        }

        advancePhase()
    }

    return (
        <Center flexDir="column" gap={6} w="100%">
            {iWon ? (
                <Center flexDir="column" gap={2}>
                    <Text fontSize="3xl">{isWo ? t('battle.wonByWo') : t('battle.wonBattle')}</Text>
                    <Center gap={2}>
                        <Text fontSize="lg">+1</Text>
                        <Image src={pokeboxIcon} w={8} />
                    </Center>
                </Center>
            ) : (
                <Text fontSize="3xl">{isWo ? t('battle.lostByWo') : t('battle.lostBattle')}</Text>
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
