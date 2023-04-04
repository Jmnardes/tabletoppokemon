import { Flex, useColorMode } from "@chakra-ui/react"
import { useContext, useState } from "react"
import Game from "./components/Game"
import PlayerContext from "./Contexts/PlayerContext"
import GameMenu from "./components/GameMenu/GameMenu"
import day from "./assets/images/background/day.jpg"
import night from "./assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted } = useContext(PlayerContext)
  const { colorMode } = useColorMode()
  const [maxTurns, setMaxTurns] = useState(40)
  const [shinyChance, setShinyChance] = useState(1)
  const teamLength = 3
  const gameDifficulty = 1
  const generation = 8
  const gameHost = true

  return (
    <Flex flexDirection='column' h='100vh' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      {hasGameStarted ? (
        <Game 
          shinyPercentage={shinyChance}
          setShinyPercentage={setShinyChance}
          maxTurns={maxTurns}
          teamLength={teamLength}
          generation={generation}
          gameHost={gameHost}
          setMaxTurns={setMaxTurns}
          gameDifficulty={gameDifficulty}
        />
      ): (
        <GameMenu />
      )}
    </Flex>
  )
}
export default App
