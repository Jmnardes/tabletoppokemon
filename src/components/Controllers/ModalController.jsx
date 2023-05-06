import { useContext, useEffect, useState } from "react";
import socket from "../../client";
import PlayerContext from "../../Contexts/PlayerContext";
import ChallengeModal from "../Game/Modal/EventModals/ChallengeModal";
import EncounterModal from "../Game/Modal/EventModals/EncounterModal";
import WalkModal from "../Game/Modal/EventModals/WalkModal";
import PokeBoxModal from "../Game/Modal/PokeBoxModal";
import PokeShopModal from "../Game/Modal/PokeShopModal";
import BattleController from "./BattleController";

export default function ModalController() {
    const { 
        game, 
        setSession, 
        updateOpponents, 
        setWaitingForPlayers, 
        updateGame, 
        setEncounter,
    } = useContext(PlayerContext)
    const [event, setEvent] = useState({})
    const [battleId, setBattleId] = useState('')

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
                case 'battle':
                    updateGame({ openBattleModal: true })
                    setBattleId(res.battleId)
                    break
                default:
                    break
            }

            setWaitingForPlayers(false)
            updateGame({ isPokemonRollDisabled: false })
        })

        socket.on('battle-end', () => updateGame({ openBattleModal: false }))

        socket.on('battle-choose-pokemon-other', () => updateGame({ openBattleModal: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            {game.openPokeShop && <PokeShopModal />}
            {game.openChallengeModal && <ChallengeModal event={event} />}
            {game.openWalkModal && <WalkModal event={event} />}
            {/* {game.openGymModal && <GymModal />} */}
            {game.openEncounterModal && <EncounterModal />}
            {/* {game.openSelectScreenModal && <SelectScreenModal />} */}
            {game.openPokeBoxModal && <PokeBoxModal />}

            <BattleController battleId={battleId} />
        </>
    )
}