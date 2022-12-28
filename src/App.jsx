import { Box, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import PokePage from "./components/PokePage"

const App = () => {
  const toast = useToast()
  const [maxTurns, setMaxTurns] = useState(45)
  const [shinyChance, setShinyChance] = useState(2)
  const [gameDifficulty, setGameDifficulty] = useState(0)
  const [generation, setGeneration] = useState(3)
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

  const handleToast = (id, title, description, icon) => {
    if (!toast.isActive(id)) {
      toast({
        id: id,
        icon: icon,
        title: title,
        description: description,
        isClosable: true,
        duration: 6000,
      })
    }
  }

  useEffect(() => {
    const hasTurnInitiated = localStorage.getItem('turn')
    
    if(hasTurnInitiated > 0) {
      setGameStarted(true)
    }
  }, [])

  return (
      <Box h='100vh' m={0}>
        {gameStarted ? (
          <PokePage 
            shinyPercentage={shinyChance} 
            maxTurns={maxTurns} 
            handleGameReset={setGameReset}
            trainerName={trainerName}
            teamLength={teamLength}
            generation={generation}
            handleToast={handleToast}
            gameHost={gameHost}
          />
        ): (
          <InitialMenu
            handleMaxTurns={setMaxTurns}
            handleGameDifficulty={setGameDifficulty}
            gameDifficulty={gameDifficulty}
            handleShinyChance={setShinyChance}
            handleGameStart={setGameStarted}
            handleTrainerName={setTrainerName}
            setGeneration={setGeneration}
            gameHost={gameHost}
            setGameHost={setGameHost}
          />
        )}
        <Box position='absolute' right={0} bottom={0}>
          <ThemeSwitch />
        </Box>
      </Box>
    )
}
export default App
