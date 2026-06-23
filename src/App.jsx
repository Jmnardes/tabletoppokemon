import { CloseButton, Flex, Heading, Text, useColorMode } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useTranslation } from "react-i18next"
import Game from "@pages/GameScreen/Game"
import GameMenu from "@pages/Menu/GameMenu"
import PlayerContext from "./context/PlayerContext"
import Loading from "@components/Loading"
import ErrorBoundary from "@components/ErrorBoundary"
import BadgeProgressMap from "@game/body/Opponents/BadgeProgressMap"
import ExpandedPlayerCard from "@game/body/Opponents/ExpandedPlayerCard"

import day from "@assets/images/background/day.jpg"
import night from "@assets/images/background/night.jpg"

const App = () => {
  const { hasGameStarted, waitingForPlayers, setWaitingForPlayers, loading, game, emit, waitingSnapshot, session } = useContext(PlayerContext)
  const { colorMode } = useColorMode()

  return (
    <ErrorBoundary>
      <Flex flexDirection='column' h='100vh' w='100vw' m={0} backgroundImage={colorMode === 'light' ? day : night}>
        <LoadingScreen
          waitingForPlayers={waitingForPlayers}
          loading={loading.loading}
          loadingText={loading.text}
          opponents={waitingSnapshot}
          badgesToWin={session?.badgesToWin || 3}
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

const LoadingScreen = ({ waitingForPlayers, loading, loadingText, opponents, badgesToWin, onCancel }) => {
  const { t } = useTranslation()
  const [expandedPlayer, setExpandedPlayer] = useState(null)

  if (!waitingForPlayers && !loading) return null;

  const playerCount = opponents?.length || 0

  const handlePlayerClick = (player) => {
    setExpandedPlayer(prev => prev?.id === player.id ? null : player)
  }

  return (
    <Loading showSpinner>
      {/* Cancel button — top right */}
      {waitingForPlayers && !loading && (
        <CloseButton
          position="absolute"
          top={4}
          right={4}
          color="white"
          size="lg"
          onClick={onCancel}
          zIndex={10}
          _hover={{ bg: 'whiteAlpha.200' }}
        />
      )}

      {/* Header section */}
      <Heading color='whiteAlpha.700' fontSize="sm" fontWeight="normal" mt={2}>
        {loadingText ? loadingText : t('lobby.waitingPlayers')}
      </Heading>

      {waitingForPlayers && !loading && playerCount > 0 && (
        <Text color="gray.400" fontSize="xs" textAlign="center" mt={1}>
          {t('lobby.speedBonusExplanation')}
        </Text>
      )}

      {/* Expanded card — appears in the middle */}
      {waitingForPlayers && expandedPlayer && (
        <Flex flex={1} align="center" justify="center" my={2}>
          <ExpandedPlayerCard
            player={expandedPlayer}
            onClose={() => setExpandedPlayer(null)}
          />
        </Flex>
      )}

      {/* Spacer when no expanded card */}
      {waitingForPlayers && !expandedPlayer && <Flex flex={1} />}

      {/* Badge progress map with player bubbles — bottom */}
      {waitingForPlayers && !loading && playerCount > 0 && (
        <Flex w="100%" justify="center" mb={6} px={4}>
          <BadgeProgressMap
            badgesToWin={badgesToWin}
            players={opponents}
            expandedId={expandedPlayer?.id}
            onPlayerClick={handlePlayerClick}
            playerCount={playerCount}
          />
        </Flex>
      )}
    </Loading>
  );
}

export default App
