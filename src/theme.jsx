import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
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
    }
  },
})
console.log(theme)

export default theme
