import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import Game from "@pages/GameScreen/Game"
import GameMenu from "@pages/Menu/GameMenu"
import PlayerContext from "./context/PlayerContext"
import Loading from "@components/Loading"

import day from "@assets/images/background/day.jpg"
import night from "@assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted, waitingForPlayers, setWaitingForPlayers, loading, game, emit } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <Flex flexDirection='column' h='100vh' w='100vw' m={0} backgroundImage={colorMode === 'light' ? day : night}>
      <LoadingScreen
        waitingForPlayers={waitingForPlayers}
        loading={loading.loading}
        loadingText={loading.text}
        onCancel={() => {
          emit('turn-cancel')
          setWaitingForPlayers(false)
        }}
      />
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

const LoadingScreen = ({ waitingForPlayers, loading, loadingText, onCancel }) => {
  if (!waitingForPlayers && !loading) return null;
  return (
    <Loading showSpinner>
      <Heading color='white'>
        {loadingText ? loadingText : 'Waiting for other players...'}
      </Heading>
      {waitingForPlayers && !loading && (
        <Button mt={4} colorScheme="red" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Loading>
  );
}

export default App
