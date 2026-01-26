import { useContext, useEffect, useState } from "react";
import PlayerContext from "@Contexts/PlayerContext";
import socket from "@client"
import { Button, Center, Text } from "@chakra-ui/react";
import PokeTeam from "../../body/Team/PokeTeam";
import ChallengeInfo from "./ChallengeInfo";
import TeamInBox from "../../header/Buttons/PokeBag/TeamInBox";
import { pokemonHasChallengeBerry } from "@utils";

export default function ChallengeTeam({ event, bonus, setBonus, setTeamReady }) {
    const { pokeTeam, teamWithData, pokeBox, player, emit } = useContext(PlayerContext)
    const [ready, setReady] = useState(false)

    const checkChallengeBonus = (team) => {
        setBonus(() => {
            const teamBonuses = team.length;

            const berryBonus = team.reduce((acc, poke) => {
            return acc + (pokemonHasChallengeBerry(poke) ? 1 : 0);
            }, 0);

            const augmentBonus = player?.status?.challengeBonus ?? 0;

            let typeBonus = 0;

            if (event?.advantage?.type === "element") {
            const advList = event?.advantage?.value ?? [];
            const disList = event?.disadvantage?.value ?? [];

            for (const poke of team) {
                const types = (poke?.types ?? [])
                .map((t) => (typeof t === "string" ? t : t?.type?.name))
                .filter(Boolean);

                for (const element of types) {
                if (advList.includes(element)) typeBonus += 1;
                else if (disList.includes(element)) typeBonus -= 1;
                }
            }
            }

            return teamBonuses + berryBonus + augmentBonus + typeBonus;
        });
    };

    useEffect(() => {
        checkChallengeBonus(teamWithData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamWithData, event, player?.status?.challengeBonus]);

    useEffect(() => {
        const handleStart = (res) => {
            if (res?.start === true) setTeamReady(true);
        };

        socket.on("event-challenge-start", handleStart);

        return () => {
            socket.off("event-challenge-start", handleStart);
        };
    }, [])

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