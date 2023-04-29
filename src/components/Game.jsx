import React, { useEffect, useState } from "react"
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeShopModal from "./Pokemon/Modal/PokeShopModal";
import GameHeader from "./GameHeader";
import GameContent from "./GameContent";
import socket from "../client";
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import SelectScreenModal from "./Pokemon/Modal/Battle/SelectScreenModal";
import PokeBoxModal from "./Pokemon/Modal/PokeBoxModal";
import BattleModal from "./Pokemon/Modal/Battle/BattleModal";

function PokePage() {
    const { 
        game, 
        setSession, 
        updateOpponents, 
        setWaitingForPlayers, 
        updateGame, 
        setEncounter, 
        pokeTeam
    } = useContext(PlayerContext)
    const [event, setEvent] = useState({})

    useEffect(() => {
        socket.on('turn-start', res => {
            setSession(old => ({...old, turns: res.turn}))
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
    }, [])

    return (
        <>
            <GameHeader />

            <GameContent pokeTeam={pokeTeam} />

            {game.openPokeShop && <PokeShopModal />}
            {game.openChallengeModal && <ChallengeModal event={event} />}
            {game.openWalkModal && <WalkModal event={event} />}
            {/* {game.openGymModal && <GymModal />} */}
            {game.openEncounterModal && <EncounterModal />}
            {/* {game.openSelectScreenModal && <SelectScreenModal />} */}
            {game.openPokeBoxModal && <PokeBoxModal />}
            {game.openBattleModal && <BattleModal />}
        </>
    )
}

export default PokePage