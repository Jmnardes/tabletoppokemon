import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import PokeTeam from "../../body/Team/PokeTeam";
import ChallengeInfo from "./ChallengeInfo";
import TeamInBox from "../../header/Buttons/PokeBag/TeamInBox";
import { pokemonHasChallengeBerry } from "@utils";

export default function ChallengeTeam({ event, bonus, setBonus, setTeamReady }) {
    const { pokeTeam, pokeBox, player, emit } = useContext(PlayerContext)
    const [ready, setReady] = useState(false)

    const checkChallengeBonus = (team) => {
        setBonus(() => {
            const generalBonuses =
            team?.reduce((acc, poke) => {
                if (event.advantage.type !== "element") return acc;

                const types = poke.types ?? [];
                const challengeBonus = pokemonHasChallengeBerry(poke) ? 1 : 0;
                const augmentBonus = player.status.challengeBonus;

                const perType = types.reduce((sum, element) => {
                const isAdv = event.advantage.value.includes(element);
                const isDis = event.disadvantage?.value?.includes(element);

                const base = isAdv ? 1 : isDis ? -1 : 0;
                return sum + base + challengeBonus + augmentBonus;
                }, 0);

                return acc + perType;
            }, 0) ?? 0;

            return generalBonuses + (team?.length ?? 0);
        });
    };

    useEffect(() => {
        socket.on('event-challenge-start', res => {
            if (res.start === true) {
                setTeamReady(true)
            }
        })

        return () => {
            socket.off('event-challenge-start')
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        checkChallengeBonus(pokeTeam)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <Button h={24} w={"100%"} mb={2} isDisabled={(pokeTeam.length < 3 && pokeBox.length > 0) || ready} onClick={() => {
                setReady(true)
                emit('event-challenge-ready')
            }}>
                {ready ? 'Waiting for players...' : 'Ready'}
            </Button>
        </Center>
    )
}