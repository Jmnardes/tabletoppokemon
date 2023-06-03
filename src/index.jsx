import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript  } from '@chakra-ui/react'
import theme from './theme'
import { PlayerProvider } from "./Contexts/PlayerContext"

import "@fontsource/press-start-2p"; // Defaults to weight 400
import "@fontsource/press-start-2p/400.css"; // Specify weight

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PlayerProvider>
        <App />
      </PlayerProvider>
  </ChakraProvider>
);
