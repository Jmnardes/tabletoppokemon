import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript  } from '@chakra-ui/react'
import theme from './theme'
import { PlayerProvider } from "./Contexts/PlayerContext"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <PlayerProvider>
        <App />
      </PlayerProvider>
  </ChakraProvider>
);



