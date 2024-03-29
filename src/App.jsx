import { Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import Game from "./components/Game"
import PlayerContext from "./Contexts/PlayerContext"
import GameMenu from "./components/GameMenu/GameMenu"
import day from "./assets/images/background/day.jpg"
import night from "./assets/images/background/night.jpg"
import Loading from "./components/Loading"

const App = () => {
  const { hasGameStarted, waitingForPlayers, loadingApi, loadingText } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <Flex flexDirection='column' h='100vh' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      {(waitingForPlayers || loadingApi) && (
        <Loading showSpinner>
            <Heading color='white'>
              {loadingApi ? loadingText : 'Waiting for other players...'}
            </Heading>
        </Loading>
      )}
      {hasGameStarted ? (
        <Game />
      ): (
        <GameMenu />
      )}
    </Flex>
  )
}
export default App
