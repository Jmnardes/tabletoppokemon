import { Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import Game from "@pages/GameScreen/Game"
import GameMenu from "@pages/Menu/GameMenu"
import PlayerContext from "./Contexts/PlayerContext"
import Loading from "@components/Loading"

import day from "@assets/images/background/day.jpg"
import night from "@assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted, waitingForPlayers, loading, game } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <Flex flexDirection='column' h='100vh' w='100vw' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      <LoadingScreen waitingForPlayers={waitingForPlayers} loading={loading.loading} loadingText={loading.text} />
      {hasGameStarted ? (
        <>
          <Game game={game} />
        </>
      ) : (
        <GameMenu />
      )}
    </Flex>
  )
}

const LoadingScreen = ({ waitingForPlayers, loading, loadingText }) => {
  if (!waitingForPlayers && !loading) return null;
  return (
    <Loading showSpinner>
      <Heading color='white'>
        {loadingText ? loadingText : 'Waiting for other players...'}
      </Heading>
    </Loading>
  );
}

export default App
