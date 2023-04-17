import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useContext, useState } from "react"
import Game from "./components/Game"
import PlayerContext from "./Contexts/PlayerContext"
import GameMenu from "./components/GameMenu/GameMenu"
import day from "./assets/images/background/day.jpg"
import night from "./assets/images/background/night.jpg"
import Loading from "./components/Loading"
import DebugPage from "./components/Debug/debugPage"
import { ConfettiCanvas } from "react-raining-confetti";

const App = () => {
  const { hasGameStarted, waitingForPlayers, loadingApi, loadingText, confetti } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  const [debug, setDebug] = useState(false)

  if (debug) {
    return <DebugPage setDebug={setDebug} />
  }

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
          <Game />
        </>
      ): (
        <>
          <Button onClick={() => setDebug(true)}>Enter debug</Button>
          <GameMenu />
        </>
      )}
    </Flex>
  )
}
export default App
