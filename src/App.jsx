import { Box, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import PokePage from "./components/PokePage"
import { PlayerProvider } from "./Contexts/PlayerContext"

const App = () => {
  const toast = useToast()
  const [maxTurns, setMaxTurns] = useState(40)
  const [shinyChance, setShinyChance] = useState(1)
  const [gameDifficulty, setGameDifficulty] = useState(1)
  const [generation, setGeneration] = useState(8)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameReset, setGameReset] = useState(false)
  const [gameHost, setGameHost] = useState(false)
  const [trainerName, setTrainerName] = useState('Trainer')
  const teamLength = 3

  useEffect(() => {
    if(gameReset) {
      localStorage.clear()
      document.location.reload(true)
    }
  }, [gameReset])

  const handleToast = (id, title, description, icon, type = 'info', duration = 6000) => {
    if (!toast.isActive(id)) {
      toast({
        id: id,
        icon: icon,
        title: title,
        description: description,
        status: type,
        duration: duration,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    const trainer = JSON.parse(localStorage.getItem('trainer'))
    
    if(trainer?.turn) {
      if(trainer.turn > 0) {
        setGameStarted(true)
      }
    }

  }, [])

  return (
      <PlayerProvider>
        <Box h='100vh' m={0}>
          {gameStarted ? (
            <PokePage 
              shinyPercentage={shinyChance}
              setShinyPercentage={setShinyChance}
              maxTurns={maxTurns} 
              handleGameReset={setGameReset}
              trainerName={trainerName}
              teamLength={teamLength}
              generation={generation}
              handleToast={handleToast}
              gameHost={gameHost}
              setMaxTurns={setMaxTurns}
              gameDifficulty={gameDifficulty}
            />
          ): (
            <InitialMenu
              handleMaxTurns={setMaxTurns}
              handleGameDifficulty={setGameDifficulty}
              gameDifficulty={gameDifficulty}
              handleGameStart={setGameStarted}
              handleTrainerName={setTrainerName}
              setGeneration={setGeneration}
              setGameHost={setGameHost}
            />
          )}
          <Box position='absolute' right={0} bottom={0}>
            <ThemeSwitch />
          </Box>
        </Box>
      </PlayerProvider>
    )
}
export default App
