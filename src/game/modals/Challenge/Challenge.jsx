import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext"
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import ChallengeInfo from "./ChallengeInfo";
import OpponentsResult from "./OpponentsResult";
import DiceButton from '@components/AnimatedButton/Dice/DiceButton'
import ChallengeResult from "./ChallengeResult";
import SuccessIcon from "@components/Icons/SuccessIcon"
import Prizes from "./Prizes";

export default function Challenge({ event, bonus }) {
    const { emit, opponents, setLoading, updateStatus, updateGame, playerWinPrize } = useContext(PlayerContext)
    const [diceWasRolled, setDiceWasRolled] = useState(false)
    const [won, setWon] = useState(false)
    const [place, setPlace] = useState(null)
    const [opponentsRoll, setOpponentsRoll] = useState([])
    const [allResultsShown, setAllResultsShown] = useState(false)
    const [roll, setRoll] = useState(0)
    const prizes = event.prizes

    const awardDistribution = () => {
        const resultArray = []

        resultArray.push(roll + bonus)

        opponentsRoll.forEach(oppRoll => {
            resultArray.push(oppRoll.roll + oppRoll.bonus)
        })

        resultArray.sort(function(a, b){return b-a})
        const resultArrayWithoutDuplicates = [...new Set(resultArray)]

        if((roll + bonus) === resultArrayWithoutDuplicates[0]) {
            awarding(0)
            return
        }

        if((roll + bonus) === resultArrayWithoutDuplicates[1]) {
            awarding(1)
            return
        }

        if(opponents.length > 1) {
            if((roll + bonus) === resultArrayWithoutDuplicates[2]) {
                awarding(2)
                return
            }
        }

        setPlace(4)
    }

    const awarding = async (place) => {
        setWon(true)
        setPlace(place)
        
        if (place === 0) {
            await updateStatus('challenges')
        }
        setLoading({ loading: true, text: 'Awarding...' })
        await playerWinPrize(prizes[place])
        setLoading({ loading: false })
    }

    useEffect(() => {
        socket.on('event-roll-other', res => {
            setOpponentsRoll(old => [...old, res])
        })

        return () => {
            socket.off('event-roll-other')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(opponents.length === opponentsRoll.length && diceWasRolled) {
            awardDistribution()
            setAllResultsShown(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opponentsRoll, roll])

    return (
        <Center flex flexDir={"column"} justifyContent={"space-between"} h={"100%"}>
            <ChallengeInfo event={event} bonus={bonus} />

            <Center 
                flex
                p={2} 
                borderRadius={8}
                justifyContent="space-between"
                gap={16}
            >
                <OpponentsResult myRoll={roll} myBonus={bonus} opponentsRoll={opponentsRoll} />

                { allResultsShown ? (
                    <ChallengeResult won={won} place={place} prizes={prizes} />
                ) : (
                    <Center minW={44} flex flexDir={"column"}>
                        <Text fontSize={"2xl"} mb={8}>Roll the die!</Text>
                        <DiceButton bonus={bonus} onRoll={(roll) => {
                            setRoll(roll)
                            setDiceWasRolled(true)
                            emit('event-roll', { roll, bonus })
                        }} />
                    </Center>
                ) }
            </Center>

            <Center>
                <Prizes prizes={prizes} opponents={opponents} />
                { allResultsShown && (
                    <Button ml={8} mb={4} h={16} w={24} onClick={() => {
                        // Backend atualiza tasks automaticamente ao detectar vitória no desafio
                        updateGame({ openChallengeModal: false, openEncounterModal: true })
                    }}><SuccessIcon c={"green.400"} /></Button>
                )}
            </Center>
                
        </Center>
    )
}