import { Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import Game from "@pages/GameScreen/Game"
import GameMenu from "@pages/Menu/GameMenu"
import PlayerContext from "./context/PlayerContext"
import Loading from "@components/Loading"
import ErrorBoundary from "@components/ErrorBoundary"
import OpponentCard from "@game/body/Opponents/OpponentCard"

import day from "@assets/images/background/day.jpg"
import night from "@assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted, waitingForPlayers, setWaitingForPlayers, loading, game, emit, opponents } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <ErrorBoundary>
      <Flex flexDirection='column' h='100vh' w='100vw' m={0} backgroundImage={colorMode === 'light' ? day : night}>
        <LoadingScreen
          waitingForPlayers={waitingForPlayers}
          loading={loading.loading}
          loadingText={loading.text}
          opponents={opponents}
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
    </ErrorBoundary>
  )
}

const LoadingScreen = ({ waitingForPlayers, loading, loadingText, opponents, onCancel }) => {
  const { t } = useTranslation()
  if (!waitingForPlayers && !loading) return null;
  return (
    <Loading showSpinner>
      <Heading color='white' fontSize="lg" order={-1}>
        {loadingText ? loadingText : t('lobby.waitingPlayers')}
      </Heading>
      {waitingForPlayers && !loading && opponents?.length > 0 && (
        <>
          <Text color="white" fontWeight="bold" fontSize="sm" textAlign="center" mt={2}>
            Players
          </Text>
          <Flex gap={3} flexWrap="wrap" justifyContent="center">
            {opponents.map(opponent => (
              <OpponentCard key={opponent.id} opponent={opponent} inFront />
            ))}
          </Flex>
        </>
      )}
      {waitingForPlayers && !loading && (
        <Button mt={4} colorScheme="red" variant="outline" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
      )}
    </Loading>
  );
}

export default App
