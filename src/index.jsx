import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript  } from '@chakra-ui/react'
import theme from './theme'
import { PlayerProvider } from "./context/PlayerContext"
import logger from '@utils/logger'
import './i18n/i18n'

import "@fontsource/press-start-2p"; // Defaults to weight 400
import "@fontsource/press-start-2p/400.css"; // Specify weight

// Global error handlers — catch unhandled errors and send to logger
window.onerror = (message, source, lineno, colno, error) => {
  logger.error('Unhandled error', {
    message, source, lineno, colno,
    stack: error?.stack,
  })
}

window.onunhandledrejection = (event) => {
  logger.error('Unhandled promise rejection', {
    reason: event.reason?.message || String(event.reason),
    stack: event.reason?.stack,
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PlayerProvider>
        <App />
      </PlayerProvider>
  </ChakraProvider>
);
