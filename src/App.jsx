import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import PokePage from "./components/Pokemon/PokePage"

const App = () => {
  const [maxTurns, setMaxTurns] = useState(45)
  const [shinyChance, setShinyChance] = useState(1)
  const [gameDifficulty, setGameDifficulty] = useState(0)
  const [genaration, setGeneration] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameReset, setGameReset] = useState(false)
  const [trainerName, setTrainerName] = useState('Trainer')
  const teamLength = 3

  useEffect(() => {
    if(gameReset) {
      localStorage.clear()
      document.location.reload(true)
    }
  }, [gameReset])

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
            genaration={genaration}
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
          />
        )}
        <Box position='absolute' right={0} bottom={0}>
          <ThemeSwitch />
        </Box>
      </Box>
    )
}
export default App
