import { useContext, useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import socket from '@client'
import PlayerContext from "@context/PlayerContext"
import ChooseAttack from "./ChooseAttack"
import NewPokemon from "./NewPokemon"

export default function Capture({ capturedPokemon, setCapturedPokemon, augments }) {
    const { updateGame, teamIds, pokemonData, emit, setLoading, session} = useContext(PlayerContext)
    const { t } = useTranslation()
    const [chooseAttackType, setChooseAttackType] = useState(capturedPokemon.types.length > 1)
    const [attackType, setAttackType] = useState(capturedPokemon.types[0])
    const [specialType, setSpecialType] = useState(capturedPokemon.types[0])
    const [selectedToRemove, setSelectedToRemove] = useState(null)
    const isTeamFull = teamIds.length >= (session?.teamLength || 6)

    const teamPokemons = teamIds.map(id => pokemonData[id]).filter(Boolean)

    const handleFinishCapture = ({ removedId, dayCare }) => {
        emit('pokemon-handle-capture', { attackType, specialType, removedId, dayCare })
        setLoading({ loading: true, text: t('toast.capturingPokemon') })
    }

    useEffect(() => {
        socket.on('pokemon-handle-capture', () => {
            setCapturedPokemon({})
            if (augments.list.length > 0) {
                updateGame({ openPokemonCaptureModal: false, openAugmentsModal: true })
            } else {
                updateGame({ openPokemonCaptureModal: false })
            }
            setLoading({ loading: false })
        })

        setLoading({ loading: false })

        return () => {
            socket.off('pokemon-handle-capture')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Center flex flexDir={"column"} p={12} justifyContent={"space-between"} h="100%">
            {chooseAttackType ? (
                <ChooseAttack
                    capturedPokemon={capturedPokemon}
                    attackType={attackType} 
                    setAttackType={setAttackType}
                    specialType={specialType}
                    setSpecialType={setSpecialType}
                    setChooseAttackType={setChooseAttackType}
                ></ChooseAttack>
            ) : (
                <NewPokemon
                    capturedPokemon={capturedPokemon}
                    handleFinishCapture={handleFinishCapture} 
                    teamPokemons={teamPokemons} 
                    selectedToRemove={selectedToRemove} 
                    setSelectedToRemove={setSelectedToRemove} 
                    isTeamFull={isTeamFull}
                ></NewPokemon>
            )}
        </Center>
    )
}