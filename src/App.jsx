import { Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import Game from "./components/Game/Game"
import GameMenu from "./components/Menu/GameMenu"
import PlayerContext from "./Contexts/PlayerContext"
import day from "./assets/images/background/day.jpg"
import night from "./assets/images/background/night.jpg"
import Loading from "./components/Loading"
import { ConfettiCanvas } from "react-raining-confetti";

const App = () => {
  const { hasGameStarted, waitingForPlayers, loadingApi, loadingText, confetti, game } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <Flex flexDirection='column' h='100vh' w='100vw' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      {(waitingForPlayers || loadingApi) && (
        <Loading showSpinner>
            <Heading color='white'>
              {loadingApi ? loadingText : 'Waiting for other players...'}
            </Heading>
        </Loading>
      )}
      {hasGameStarted ? (
        <>
          {confetti ? (
                <ConfettiCanvas active={true} fadingMode="LIGHT" stopAfterMs={4000} />
            ): null}
          <Game game={game} />
        </>
      ): (
          <GameMenu />
      )}
    </Flex>
  )
}
export default App
