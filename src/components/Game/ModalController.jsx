import { useContext, useEffect, useState } from "react";
import socket from "../../client";
import PlayerContext from "../../Contexts/PlayerContext";
import BattleModal from "./Modal/EventModals/BattleModal";
import ChallengeModal from "./Modal/EventModals/ChallengeModal";
import EncounterModal from "./Modal/EventModals/EncounterModal";
import WalkModal from "./Modal/EventModals/WalkModal";
import PokeBoxModal from "./Modal/PokeBoxModal";
import PokeShopModal from "./Modal/PokeShopModal";

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
    const [battle, setBattle] = useState({})

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
                    setBattle(res.event.battle)
                    break
                default:
                    break
            }

            setWaitingForPlayers(false)
            updateGame({ isPokemonRollDisabled: false })
        })
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
            {game.openBattleModal && <BattleModal battleId={battle.id} participants={battle.participants} event={event}/>}
        </>
    )
}