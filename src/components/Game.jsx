import React, { useState } from "react"
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeShopModal from "./Pokemon/Modal/PokeShopModal";
import GameHeader from "./GameHeader";
import GameContent from "./GameContent";
import socket from "../client";

function PokePage() {
    const { game, setSession, updateOpponents, setWaitingForPlayers, setHasGameStarted, updateGame } = useContext(PlayerContext)
    const [event, setEvent] = useState({})
    const [encounter, setEncounter] = useState({})

    socket.on('lobby-start', (res) => {
        setEncounter([...res.starters])
        setHasGameStarted(true)
        updateGame({ openEncounterModal: true })
    })

    socket.on('turn-start', res => {
        setSession(old => ({...old, turns: res.session.turns}))
        updateOpponents(false, 'turnReady')

        setEvent({
            title: res.event.title,
            label: res.event.label,
            type: res.event.type,
            prizes: res.event.prizes,
            advantage: res.event.advantage,
            disadvantage: res.event.disadvantage,
            dice: res.event.dice
        })
        
        setEncounter([...res.encounter])
        
        switch (res.event.type) {
            case 'challenge':
                updateGame({ openChallengeModal: true })
                break
            case 'walk':
                updateGame({ openWalkModal: true })

                break
            default:
                break
        }

        setWaitingForPlayers(false)
        updateGame({ isPokemonRollDisabled: false })
    })

    return (
        <>
            <GameHeader />

            <GameContent />

            {game.openPokeShop && <PokeShopModal />}
            {game.openChallengeModal && <ChallengeModal event={event} />}
            {game.openWalkModal && <WalkModal event={event} />}
            {game.openGymModal && <GymModal />}
            {game.openEncounterModal && <EncounterModal encounter={encounter} />}
        </>
    )
}

export default PokePage