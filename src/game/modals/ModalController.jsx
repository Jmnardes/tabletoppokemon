import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

import socket from "@client";
import PlayerContext from "@Contexts/PlayerContext";

import BattleModal from "./EventModals/BattleModal";
import ChallengeModal from "./Challenge/ChallengeModal";
import EncounterModal from "./EventModals/EncounterModal";
import WalkModal from "./EventModals/WalkModal";
import PokeUpgradeModal from "../header/Buttons/PokeUpgrade/PokeUpgradeModal";
import BerriesModal from "../header/Buttons/PokeBerries/BerriesModal";
import CaptureModal from "./Capture/CaptureModal";
import NewTasksModal from "./NewTasks/NewTasks";
import AugmentsModal from "./Augments/AugmentsModal";
import PokeBagModal from "../header/Buttons/PokeBag/PokeBagModal";
import DayCareModal from "../header/Buttons/PokeDayCare/DayCareModal";
import GymModal from "./Gym/GymModal";

export default function ModalController() {
    const { 
        game,
        session,
        setSession, 
        updateOpponents, 
        setWaitingForPlayers, 
        updateGame, 
        updatePokemon,
        setEncounter,
        handleToast,
        tasks,
        setTasks,
        setNextEvent,
        setGym,
        setNextGym,
        gym,
        nextGym,
        player
    } = useContext(PlayerContext)
    const [event, setEvent] = useState({})
    const [battle, setBattle] = useState({})
    const [augments, setAugments] = useState({ type: '', list: []})
    const [lastTurnModalTaskShown, setLastTurnModalTaskShown] = useState(0)
    const [capturedPokemon, setCapturedPokemon] = useState({})
    const [lastNextGymNotified, setLastNextGymNotified] = useState(null)
    const [lastGymAvailableNotified, setLastGymAvailableNotified] = useState(null)

    useEffect(() => {
        socket.on('turn-start', (res, callback) => {
            const trainedPokemons = res.trained

            callback(true)

            setSession(old => ({...old, turns: res.turn, level: res.level}))
            updateOpponents(false, 'turnReady')
            
            // Atualizar gym e nextGym se vierem no response
            if (res.gym !== undefined) {
                setGym(res.gym)
            }
            if (res.nextGym !== undefined) {
                setNextGym(res.nextGym)
            }
            
            if (trainedPokemons.length) {
                trainedPokemons.forEach(pokemon => {
                    updatePokemon(pokemon.id, pokemon)
                    handleToast({
                        id: pokemon.id,
                        title: "Pokémon level up!",
                        description: `${pokemon.name} has leveled up to ${pokemon.level}!`,
                        icon: <Image
                                width="32px"
                                src={pokemon.sprites.mini}
                                fallbackSrc={pokemon.sprites.front}
                            ></Image>,
                        duration: 5000,
                        position: 'bottom-left',
                        status: 'success'
                    })
                })
            }

            setAugments(res.augments)

            setEvent({
                title: res.event.title,
                label: res.event.label,
                type: res.event.type,
                prizes: res.event.prizes,
                advantage: res.event.advantage,
                disadvantage: res.event.disadvantage,
                dice: res.event.dice
            })

            setNextEvent(res.nextEventType)
            
            setEncounter([...res.encounter])

            setTasks([...res.tasks])
            
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

        socket.on('player-capture-pokemon', res => {
            setCapturedPokemon(res.pokemon)
            updateGame({ openEncounterModal: false, openPokemonCaptureModal: true })
        })

        return () => {
            console.log('disconnect turn-start socket')
            socket.off('turn-start')
            socket.off('player-capture-pokemon')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLastTurnModalTaskShown(session.turns)

        if (session.turns % 10 === 1 && lastTurnModalTaskShown !== session.turns) {
            updateGame({ openNewTasksModal: true })
            setLastTurnModalTaskShown(session.turns)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks])

    // Toast quando nextGym muda (nova rota decidida)
    useEffect(() => {
        if (nextGym && nextGym.id !== lastNextGymNotified) {
            setLastNextGymNotified(nextGym.id)
            
            handleToast({
                id: `next-gym-${nextGym.id}`,
                title: "🗺️ Next Gym Route Decided!",
                description: `The path to ${nextGym.name} has been set. Available on turn ${nextGym.turnStart}.`,
                status: 'info',
                duration: 6000,
                position: 'top-right'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextGym])

    // Toast quando gym fica disponível
    useEffect(() => {
        const currentTurn = session?.turns || 0
        
        if (gym && gym.id !== lastGymAvailableNotified && gym.turnStart <= currentTurn) {
            setLastGymAvailableNotified(gym.id)
            
            handleToast({
                id: `gym-available-${gym.id}`,
                title: "🏆 Gym Challenge Available!",
                description: `${gym.name} is now open for challenges. Face ${gym.leader} and earn the ${gym.badge}!`,
                status: 'success',
                duration: 8000,
                position: 'top-right'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gym, session?.turns])

    return(
        <>
            {game.openChallengeModal && <ChallengeModal event={event} />}
            {game.openWalkModal && <WalkModal event={event} />}
            {game.openGymModal && <GymModal />}
            {game.openEncounterModal && <EncounterModal augments={augments} />}
            {/* {game.openSelectScreenModal && <SelectScreenModal />} */}
            {game.openPokeBoxModal && <PokeBagModal />}
            {game.openDayCareModal && <DayCareModal />}
            {game.openPokeUpgradeModal && <PokeUpgradeModal />}
            {game.openBerriesModal && <BerriesModal />}
            {game.openPokemonCaptureModal && <CaptureModal capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} augments={augments} />}
            {game.openNewTasksModal && <NewTasksModal />}
            {game.openAugmentsModal && <AugmentsModal augments={augments} />}
            {game.openBattleModal && <BattleModal battleId={battle.id} participants={battle.participants} event={event}/>}
        </>
    )
}