import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  red: {
    primary: 'red',
  },
}

const theme = extendTheme({ config, colors })

export default theme