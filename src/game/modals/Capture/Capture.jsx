import { useContext, useEffect, useState } from "react"
import { Center } from "@chakra-ui/react"
import socket from '@client'
import PlayerContext from "@Contexts/PlayerContext"
import ChooseAttack from "./ChooseAttack"
import NewPokemon from "./NewPokemon"

export default function Capture({ capturedPokemon, setCapturedPokemon }) {
    const { updateGame, pokeTeam, setPoketeam, setPokeBox, setPokemonData, emit, setLoading} = useContext(PlayerContext)
    const [chooseAttackType, setChooseAttackType] = useState(capturedPokemon.types.length > 1)
    const [attackType, setAttackType] = useState(capturedPokemon.types[0])
    const [specialType, setSpecialType] = useState(capturedPokemon.types[0])
    const [selectedToRemove, setSelectedToRemove] = useState(null)
    const isTeamFull = pokeTeam.length > 2

    const handleFinishCapture = ({ removedId, dayCare }) => {
        emit('pokemon-handle-capture', { attackType, specialType, removedId, dayCare })
        setLoading({ loading: true, text: "Capturing pokemon..." })
    }

    useEffect(() => {
        socket.on('pokemon-handle-capture', ({ pokeTeam, pokeBox, capturedPoke }) => {
            setPoketeam(pokeTeam);
            setPokeBox(pokeBox);
          
            setPokemonData((old) => ({
              ...old,
              [capturedPoke.id]: {
                id: capturedPoke.id,
                types: capturedPoke.types,
              },
            }));

            setCapturedPokemon({})
            updateGame({ openPokemonCaptureModal: false })
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
                    pokeTeam={pokeTeam} 
                    selectedToRemove={selectedToRemove} 
                    setSelectedToRemove={setSelectedToRemove} 
                    isTeamFull={isTeamFull}
                ></NewPokemon>
            )}
        </Center>
    )
}