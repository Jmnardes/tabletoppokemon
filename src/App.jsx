import { Box, useColorMode, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import InitialMenu from "./components/InitialMenu/InitialMenu"
import Game from "./components/Game"
import PlayerContext from "./Contexts/PlayerContext"

import day from "./assets/images/background/day.jpg"
import night from "./assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted } = useContext(PlayerContext)
  const { colorMode } = useColorMode()
  const toast = useToast()
  const [maxTurns, setMaxTurns] = useState(40)
  const [shinyChance, setShinyChance] = useState(1)
  const [isPlayerInLobby, setIsPlayerInLobby] = useState(false)
  const teamLength = 3
  const gameDifficulty = 1
  const generation = 8
  const gameHost = true

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

  return (
    <Box h='100vh' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      {hasGameStarted ? (
        <Game 
          shinyPercentage={shinyChance}
          setShinyPercentage={setShinyChance}
          maxTurns={maxTurns}
          teamLength={teamLength}
          generation={generation}
          handleToast={handleToast}
          gameHost={gameHost}
          setMaxTurns={setMaxTurns}
          gameDifficulty={gameDifficulty}
        />
      ): (
        <InitialMenu setIsPlayerInLobby={setIsPlayerInLobby} isPlayerInLobby={isPlayerInLobby} />
      )}
    </Box>
  )
}
export default App
