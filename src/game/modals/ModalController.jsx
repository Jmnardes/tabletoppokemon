import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

import socket from "@client";
import PlayerContext from "@context/PlayerContext";

import EncounterModal from "./EventModals/EncounterModal";
import CaptureModal from "./Capture/CaptureModal";
import AugmentsModal from "./Augments/AugmentsModal";
import GymModal from "./Gym/GymModal";
import StarterKitModal from "./StarterKit/StarterKitModal";

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
        setTasks,
        setGym,
        setNextGym,
        gym,
        nextGym,
        setTrainingCamp,
        setActiveTab,
        setTurnPhases,
        setCurrentPhaseIndex,
        setFarm,
        setCraft,
        setPlayer,
    } = useContext(PlayerContext)
    const [augments, setAugments] = useState({ type: '', list: []})
    const [capturedPokemon, setCapturedPokemon] = useState({})
    const [lastNextGymNotified, setLastNextGymNotified] = useState(null)
    const [lastGymAvailableNotified, setLastGymAvailableNotified] = useState(null)

    useEffect(() => {
        socket.on('turn-start', (res, callback) => {
            const trainedPokemons = res.trained

            // Update training camp state from turn tick
            if (res.trainingCamp) setTrainingCamp(res.trainingCamp)

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

            // Update farm state from turn tick
            if (res.farm) setFarm(res.farm)

            // Update craft state from turn tick
            if (res.craft) setCraft(res.craft)

            // Update balls (craft may have produced pokeballs)
            if (res.balls) setPlayer(prev => ({ ...prev, balls: res.balls }))

            // Farm notifications
            if (res.farmNotifications?.length) {
                res.farmNotifications.forEach(n => {
                    if (n.type === 'ready') {
                        handleToast({
                            id: `farm-ready-${n.plotId}`,
                            title: 'Berry ready!',
                            description: 'A berry is ready to harvest on your farm!',
                            duration: 5000,
                            position: 'bottom-left',
                            status: 'info',
                        })
                    }
                })
            }

            // Craft notifications
            if (res.craftNotifications?.length) {
                res.craftNotifications.forEach(n => {
                    if (n.type === 'broken') {
                        handleToast({
                            id: `craft-broken-${n.machineId}`,
                            title: 'Machine broke!',
                            description: 'A craft machine broke down! Repair it for 1 token.',
                            duration: 5000,
                            position: 'bottom-left',
                            status: 'warning',
                        })
                    }
                })
            }
            if (res.craftProduced?.length) {
                const summary = {}
                res.craftProduced.forEach(p => {
                    summary[p.type] = (summary[p.type] || 0) + 1
                })
                const desc = Object.entries(summary).map(([type, count]) => `${count}x ${type}`).join(', ')
                handleToast({
                    id: `craft-produced-${res.turn}`,
                    title: 'Craft produced!',
                    description: desc,
                    duration: 5000,
                    position: 'bottom-left',
                    status: 'success',
                })
            }

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
            updateGame({ openEncounterModal: false, openStarterKitModal: true })
        })

        return () => {
            console.log('disconnect turn-start socket')
            socket.off('turn-start')
            socket.off('player-capture-pokemon')
            socket.off('player-capture-starters')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            {game.openAugmentsModal && <AugmentsModal augments={augments} />}
            {game.openStarterKitModal && <StarterKitModal />}
        </>
    )
}