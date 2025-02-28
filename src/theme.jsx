import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  ...config,
  colors: {
    gray: {
      650: '#3d4759',
    },
  },
  components: {
    Button: {
      variants: {
        solid: ({ colorMode }) => ({
          bg: colorMode === 'light' ? 'gray.200' : 'gray.650',
        }),
      },
    },
    Text: {
      baseStyle: {
        fontFamiliy: `'Press Start 2P', sans-serif`
      }
    },
    Toast: {
      baseStyle: {
        title: {
          fontSize: '12px',
        },
        description: {
          fontSize: '12px',
        },
      },
    },
  },
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
    body: `'Press Start 2P', sans-serif`,
    text: `'Press Start 2P', sans-serif`,
  }
})

export default theme
