import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import PokePage from "./components/Pokemon/PokePage"

const App = () => {
  const [maxTurns, setMaxTurns] = useState(45)
  const [shinyChance, setShinyChance] = useState(1)
  const [gameDifficulty, setGameDifficulty] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameReset, setGameReset] = useState(false)
  const [trainerName, setTrainerName] = useState('')

  useEffect(() => {
    if(gameReset) {
      localStorage.clear()
      document.location.reload(true)
    }
  }, [gameReset])

  return (
      <Box h='100vh' m={0}>
        {gameStarted ? (
          <PokePage shinyPercentage={shinyChance} maxTurns={maxTurns} handleGameReset={setGameReset} hasGameStarted={gameStarted} trainerName={trainerName} />
        ): (
          <InitialMenu
            handleMaxTurns={setMaxTurns}
            handleGameDifficulty={setGameDifficulty}
            gameDifficulty={gameDifficulty}
            handleShinyChance={setShinyChance}
            handleGameStart={setGameStarted}
            handleTrainerName={setTrainerName}
          />
        )}
        <Box position='absolute' right={0} bottom={0}>
          <ThemeSwitch />
        </Box>
      </Box>
    )
}
export default App
