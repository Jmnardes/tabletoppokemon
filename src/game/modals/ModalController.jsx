import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

import socket from "@client";
import PlayerContext from "@context/PlayerContext";

import EncounterModal from "./EventModals/EncounterModal";
import CaptureModal from "./Capture/CaptureModal";
import NewTasksModal from "./NewTasks/NewTasks";
import AugmentsModal from "./Augments/AugmentsModal";
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
        handleToast,
        tasks,
        setTasks,
        setGym,
        setNextGym,
        gym,
        nextGym,
        updateTrainedCamp,
        setActiveTab,
        setLoading,
        setTurnPhases,
        setCurrentPhaseIndex,
    } = useContext(PlayerContext)
    const [augments, setAugments] = useState({ type: '', list: []})
    const [lastTurnModalTaskShown, setLastTurnModalTaskShown] = useState(0)
    const [capturedPokemon, setCapturedPokemon] = useState({})
    const [lastNextGymNotified, setLastNextGymNotified] = useState(null)
    const [lastGymAvailableNotified, setLastGymAvailableNotified] = useState(null)

    useEffect(() => {
        socket.on('turn-start', (res, callback) => {
            const trainedPokemons = res.trained

            // Update trained camp pokes in box and pokemonData
            if (res.trainedCamp) {
                updateTrainedCamp(res.trainedCamp)
            }

            callback(true)

            setActiveTab('bag')
            setSession(old => ({...old, turns: res.turn, level: res.level}))
            updateOpponents(false, 'turnReady')
            
            // Update gym and nextGym from response
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
            setTasks([...res.tasks])

            // Set turn phases from server
            const phases = res.phases || ['freeActions']
            setTurnPhases(phases)
            setCurrentPhaseIndex(0)

            // Store battle and journey data on game state for phase routing
            updateGame({ 
                battleData: res.battleData || null,
                journeyWildPreview: res.journeyWildPreview || [],
                journeyProgress: res.journeyProgress || 0,
                isPokemonRollDisabled: false,
            })

            setWaitingForPlayers(false)
        })

        socket.on('player-capture-pokemon', res => {
            setCapturedPokemon(res.pokemon)
            updateGame({ openEncounterModal: false, openPokemonCaptureModal: true })
        })

        socket.on('player-capture-starters', () => {
            updateGame({ openEncounterModal: false })
            setLoading({ loading: false })
        })

        return () => {
            console.log('disconnect turn-start socket')
            socket.off('turn-start')
            socket.off('player-capture-pokemon')
            socket.off('player-capture-starters')
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
                description: `The path to ${nextGym.name} has been set. Available at level ${nextGym.gymLevel}.`,
                status: 'info',
                duration: 6000,
                position: 'top-right'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextGym])

    // Toast quando gym fica disponível
    useEffect(() => {
        if (gym && gym.id !== lastGymAvailableNotified) {
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
            {game.openGymModal && <GymModal />}
            {game.openEncounterModal && <EncounterModal augments={augments} />}
            {game.openPokemonCaptureModal && <CaptureModal capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} augments={augments} />}
            {game.openNewTasksModal && <NewTasksModal />}
            {game.openAugmentsModal && <AugmentsModal augments={augments} />}
        </>
    )
}