import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

import socket from "@client";
import PlayerContext from "@Contexts/PlayerContext";

import BattleModal from "./EventModals/BattleModal";
import ChallengeModal from "./EventModals/ChallengeModal";
import EncounterModal from "./EventModals/EncounterModal";
import WalkModal from "./EventModals/WalkModal";
import PokeDayCare from "../header/Buttons/PokeDayCare/PokeDayCare";
import PokeBoxModal from "../header/Buttons/PokeBag/PokeBoxModal";
import PokeUpgradeModal from "../header/Buttons/PokeUpgrade/PokeUpgradeModal";
import BerriesModal from "../header/Buttons/PokeBerries/BerriesModal";
import CaptureModal from "./Capture/CaptureModal";
import NewTasksModal from "./NewTasks/NewTasks";
import AugmentsModal from "./Augments/AugmentsModal";

export default function ModalController() {
    const { 
        game,
        session,
        setSession, 
        updateOpponents, 
        setWaitingForPlayers, 
        updateGame, 
        updatePokemonOnTeam,
        setEncounter,
        handleToast,
        tasks,
        setTasks,
        setNextEvent
    } = useContext(PlayerContext)
    const [event, setEvent] = useState({})
    const [battle, setBattle] = useState({})
    const [augments, setAugments] = useState([])
    const [showTasksModal, setShowTasksModal] = useState({})
    const [capturedPokemon, setCapturedPokemon] = useState({})

    useEffect(() => {
        socket.on('turn-start', (res, callback) => {
            const trainedPokemons = res.trained

            callback(true)

            setSession(old => ({...old, turns: res.turn, level: res.level}))
            updateOpponents(false, 'turnReady')
            if (trainedPokemons.length) {
                trainedPokemons.forEach(pokemon => {
                    updatePokemonOnTeam(pokemon)
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
            
            if (res.augments.length > 0) {
                if (res.event.type = 'battle') setBattle(res.event.battle)
                updateGame({ openAugmentsModal: true })
            } else {
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
        if (session.turns % 10 === 1 && showTasksModal) {
            updateGame({ openNewTasksModal: true })
            setShowTasksModal(false)
        } else {
            setShowTasksModal(true)
        }
    }, [tasks])

    return(
        <>
            {game.openChallengeModal && <ChallengeModal event={event} />}
            {game.openWalkModal && <WalkModal event={event} />}
            {/* {game.openGymModal && <GymModal />} */}
            {game.openEncounterModal && <EncounterModal />}
            {/* {game.openSelectScreenModal && <SelectScreenModal />} */}
            {game.openPokeBoxModal && <PokeBoxModal />}
            {game.openDayCareModal && <PokeDayCare />}
            {game.openPokeUpgradeModal && <PokeUpgradeModal />}
            {game.openBerriesModal && <BerriesModal />}
            {game.openPokemonCaptureModal && <CaptureModal capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} />}
            {game.openNewTasksModal && <NewTasksModal />}
            {game.openAugmentsModal && <AugmentsModal augments={augments} event={event} />}
            {game.openBattleModal && <BattleModal battleId={battle.id} participants={battle.participants} event={event}/>}
        </>
    )
}