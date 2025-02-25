import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import PokeTeam from "../../body/Team/PokeTeam";
import ChallengeInfo from "./ChallengeInfo";
import TeamInBox from "../../header/Buttons/PokeBag/TeamInBox";
import { pokemonHasChallengeBerry } from "@utils";

export default function ChallengeTeam({ event, bonus, setBonus, setTeamReady }) {
    const { pokeTeam, player, emit } = useContext(PlayerContext)
    const [ready, setReady] = useState(false)

    const checkChallengeBonus = (team) => {
        setBonus(() => {
            const generalBonuses = team?.reduce((acc, poke) => {
                if(event.advantage.type === 'element') {
                    return acc + (poke.types).reduce((acc2, element) => {
                        const checkIfAdvIncludes = event.advantage.value.includes(element)
                        const checkIfDisIncludes = event.disadvantage?.value.includes(element)
                        const challengeBonus = pokemonHasChallengeBerry(poke) ? 1 : 0
                        const augmentBonus = player.status.challengeBonus
    
                        if(checkIfAdvIncludes) return acc2 + 1 + challengeBonus + augmentBonus
                        if(checkIfDisIncludes) {
                            return acc2 - 1 + challengeBonus + augmentBonus
                        } else {
                            return acc2 + challengeBonus + augmentBonus
                        }
                    }, 0)
                }
            }, 0)
            const teamBonuses = team.length

            return (generalBonuses + teamBonuses)
        })
    }

    useEffect(() => {
        socket.on('event-challenge-start', res => {
            if (res.start === true) {
                setTeamReady(true)
            }
        })

        return () => {
            socket.off('event-challenge-start')
        }
    }, [])

    useEffect(() => {
        checkChallengeBonus(pokeTeam)
    }, [pokeTeam])

    return (
        <Center flex flexDir={"column"} justifyContent={"space-between"} h="100%">
            <ChallengeInfo event={event} bonus={bonus} />

            <Center flex flexDir={"column"}>
                {!ready && (
                    <>
                        <Text>Bag</Text>
                        <TeamInBox />
                    </>
                )}
                <Text>Team</Text>
                <Center minH={60}>
                    <PokeTeam bag={!ready} challenge={true} />
                </Center>
            </Center>

            <Button h={24} w={"100%"} mb={2} isDisabled={pokeTeam.length < 1 || ready} onClick={() => {
                setReady(true)
                emit('event-challenge-ready')
            }}>
                {ready ? 'Waiting for players...' : 'Ready'}
            </Button>
        </Center>
    )
}