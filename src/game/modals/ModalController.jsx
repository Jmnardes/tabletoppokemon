import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import socket from "@client";
import PlayerContext from "@context/PlayerContext";

import EncounterModal from "./EventModals/EncounterModal";
import CaptureModal from "./Capture/CaptureModal";
import AugmentsModal from "./Augments/AugmentsModal";
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
        setLoading,
        setTasks,
        setGym,
        setNextGym,
        setGymRoute,
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
    const { t } = useTranslation()

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
            if (res.gymRoute) {
                setGymRoute(res.gymRoute)
            }
            
            if (trainedPokemons.length) {
                trainedPokemons.forEach(pokemon => {
                    updatePokemon(pokemon.id, pokemon)
                    handleToast({
                        id: pokemon.id,
                        title: t('toast.levelUp'),
                        description: t('toast.levelUpDesc', { name: pokemon.name, level: pokemon.level }),
                        icon: <Image
                                width="32px"
                                src={pokemon.sprites?.front}
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

            // Update items (incense may have been consumed)
            if (res.items) setPlayer(prev => ({ ...prev, items: res.items }))

            // Update daycare tokens (passive token generation)
            if (res.daycare) setPlayer(prev => ({ ...prev, daycare: res.daycare }))

            // Update threat (decay applied by server each turn)
            if (res.threat != null) setPlayer(prev => ({ ...prev, threat: res.threat }))

            // Farm notifications
            if (res.farmNotifications?.length) {
                res.farmNotifications.forEach(n => {
                    if (n.type === 'ready') {
                        handleToast({
                            id: `farm-ready-${n.plotId}`,
                            title: t('toast.berryReady'),
                            description: t('toast.berryReadyDesc'),
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
                            title: t('toast.machineBroke'),
                            description: t('toast.machineBrokeDesc'),
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
                    title: t('toast.craftProduced'),
                    description: desc,
                    duration: 5000,
                    position: 'bottom-left',
                    status: 'success',
                })
            }

            // Passive economy notification
            if (res.passiveTokens) {
                handleToast({
                    id: `passive-${res.turn}`,
                    title: t('toast.passiveEconomy'),
                    description: t('toast.passiveEconomyDesc', { tokens: res.passiveTokens }),
                    duration: 4000,
                    position: 'bottom-left',
                    status: 'info',
                })
            }

            // Dust → EXP notifications
            if (res.dustNotifications?.length) {
                const names = res.dustNotifications.map(d => d.name).join(', ')
                handleToast({
                    id: `dust-exp-${res.turn}`,
                    title: t('toast.dustExp'),
                    description: t('toast.dustExpDesc', { names, count: res.dustNotifications.length }),
                    duration: 4000,
                    position: 'bottom-left',
                    status: 'info',
                })
            }

            // Expired berries notifications
            if (res.expiredBerries?.length) {
                res.expiredBerries.forEach(b => {
                    handleToast({
                        id: `berry-expired-${b.pokemonId}-${res.turn}`,
                        title: t('toast.berryExpired'),
                        description: t('toast.berryExpiredDesc', { berry: b.berryName, pokemon: b.pokemonName }),
                        duration: 5000,
                        position: 'bottom-left',
                        status: 'warning',
                    })
                })
            }

            // Training camp notifications (broken equipment)
            if (res.campNotifications?.length) {
                res.campNotifications.forEach(n => {
                    if (n.type === 'broken') {
                        handleToast({
                            id: `camp-broken-${n.pokemonId}-${res.turn}`,
                            title: t('toast.campBroken'),
                            description: t('toast.campBrokenDesc', { name: n.name }),
                            duration: 5000,
                            position: 'bottom-left',
                            status: 'warning',
                        })
                    }
                })
            }

            // Farm rotted notification
            if (res.farmNotifications?.length) {
                res.farmNotifications.forEach(n => {
                    if (n.type === 'rotted') {
                        handleToast({
                            id: `farm-rotted-${n.plotId}`,
                            title: t('toast.berryRotted'),
                            description: t('toast.berryRottedDesc'),
                            duration: 5000,
                            position: 'bottom-left',
                            status: 'error',
                        })
                    }
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
                journeyWildDefeatedCount: res.journeyWildDefeatedCount || 0,
                journeyLevel: res.level ?? 1,
                isPokemonRollDisabled: false,
            })

            setWaitingForPlayers(false)
        })

        socket.on('player-capture-pokemon', res => {
            setCapturedPokemon(res.pokemon)
            updateGame({ openEncounterModal: false, openPokemonCaptureModal: true })
        })

        socket.on('player-capture-starters', () => {
            setLoading({ loading: false })
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
                title: t('toast.nextGymRoute'),
                description: t('toast.nextGymRouteDesc', { name: nextGym.name, level: nextGym.gymLevel }),
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
                title: t('toast.gymAvailable'),
                description: t('toast.gymAvailableDesc', { name: gym.name, leader: gym.leader, badge: gym.badge }),
                status: 'success',
                duration: 8000,
                position: 'top-right'
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gym, session?.turns])

    return(
        <>
            {game.openEncounterModal && <EncounterModal augments={augments} />}
            {game.openPokemonCaptureModal && <CaptureModal capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} augments={augments} />}
            {game.openAugmentsModal && <AugmentsModal augments={augments} />}
            {game.openStarterKitModal && <StarterKitModal />}
        </>
    )
}