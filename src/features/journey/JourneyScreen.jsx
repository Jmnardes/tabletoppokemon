import { useContext, useState } from "react"
import { Flex } from "@chakra-ui/react"
import PlayerContext from "@context/PlayerContext"

import JourneyPreBattle from "./JourneyPreBattle"
import JourneyBattle from "./JourneyBattle"
import JourneyCapture from "./JourneyCapture"
import JourneyCheckpoint from "./JourneyCheckpoint"
import JourneyExit from "./JourneyExit"

const PHASES = {
    PRE_BATTLE: 'pre_battle',
    BATTLE: 'battle',
    CAPTURE: 'capture',
    CHECKPOINT: 'checkpoint',
    EXIT: 'exit',
}

export default function JourneyScreen() {
    const { game, updateGame, advancePhase } = useContext(PlayerContext)
    const [phase, setPhase] = useState(PHASES.PRE_BATTLE)
    const [journeyState, setJourneyState] = useState(game.journeyData)
    const [lastFightResult, setLastFightResult] = useState(null)

    const handleFightComplete = (result) => {
        setLastFightResult(result)
        if (result.playerWon) {
            // Offer capture of the defeated wild pokemon
            setPhase(PHASES.CAPTURE)
        } else if (result.allPlayerDefeated) {
            // Journey is over
            setPhase(PHASES.EXIT)
        } else {
            // Player lost this pokemon, go back to pre-battle to reorder
            setPhase(PHASES.PRE_BATTLE)
        }
    }

    const handleCaptureComplete = () => {
        if (lastFightResult?.allWildDefeated) {
            setPhase(PHASES.CHECKPOINT)
        } else {
            setPhase(PHASES.PRE_BATTLE)
        }
    }

    const handleContinue = (newJourneyData) => {
        setJourneyState(prev => ({ ...prev, ...newJourneyData }))
        setPhase(PHASES.PRE_BATTLE)
    }

    const handleExit = () => {
        updateGame({
            isInJourney: false,
            journeyBagLocked: false,
            openJourneySelection: false,
            journeyData: null,
        })
        advancePhase()
    }

    return (
        <Flex flex="1" direction="column" align="center" justify="center" p={4}>
            {phase === PHASES.PRE_BATTLE && (
                <JourneyPreBattle
                    journeyState={journeyState}
                    onFightStart={(result) => {
                        setLastFightResult(result)
                        setPhase(PHASES.BATTLE)
                    }}
                    setJourneyState={setJourneyState}
                />
            )}
            {phase === PHASES.BATTLE && (
                <JourneyBattle
                    fightResult={lastFightResult}
                    journeyState={journeyState}
                    onBattleEnd={handleFightComplete}
                    setJourneyState={setJourneyState}
                />
            )}
            {phase === PHASES.CAPTURE && (
                <JourneyCapture
                    lastFightResult={lastFightResult}
                    journeyState={journeyState}
                    setJourneyState={setJourneyState}
                    onComplete={handleCaptureComplete}
                />
            )}
            {phase === PHASES.CHECKPOINT && (
                <JourneyCheckpoint
                    journeyState={journeyState}
                    onContinue={handleContinue}
                    onExit={() => setPhase(PHASES.EXIT)}
                />
            )}
            {phase === PHASES.EXIT && (
                <JourneyExit
                    journeyState={journeyState}
                    onLeave={handleExit}
                />
            )}
        </Flex>
    )
}
