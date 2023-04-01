import { Box, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import PokePage from "./components/PokePage"

const App = () => {
  const toast = useToast()
  const [maxTurns, setMaxTurns] = useState(40)
  const [shinyChance, setShinyChance] = useState(1)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameReset, setGameReset] = useState(false)
  const teamLength = 3
  const gameDifficulty = 1
  const generation = 8
  const gameHost = true
  const trainerName = `trainer`

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
    <Box h='100vh' m={0} backgroundImage={"https://wallup.net/wp-content/uploads/2016/05/24/143432-nature-Pokemon.jpg"}>
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
        <InitialMenu handleGameStart={setGameStarted} />
      )}
    </Box>
  )
}
export default App
