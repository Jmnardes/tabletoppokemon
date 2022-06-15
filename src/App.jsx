import Pokemon from "./components/Pokemon/Pokemon"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import { Box } from "@chakra-ui/react"

const App = () => {
  return (
      <>
        <Box h='calc(100vh)'>
          <Pokemon/>
          <Box position='absolute' right={0} bottom={0}>
            <ThemeSwitch/>
          </Box>
        </Box>
      </>
    )
}
export default App
