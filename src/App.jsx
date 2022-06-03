import { useState } from "react"

import Pokecards from "./components/Pokecards"
import Pokemon from "./components/Pokemon/Pokemon"
import ThemeSwitch from "./components/Chakra/ThemeSwitch/ThemeSwitch"
import { Box, Button } from "@chakra-ui/react"

const App = () => {
  const [rollSwitch, setRollSwitch] = useState(false)

  const handleSetRollSwitch = () => {
    setRollSwitch(!rollSwitch)
  }

  return (
      <>
        <Box h='calc(100vh)'>
          <Button
            m={2}
            onClick={handleSetRollSwitch}
          >
            {rollSwitch ? "Pokedex" : "Cards"}
          </Button>
          {
            rollSwitch ? (
              <Pokecards/>
            ) : (
              <Pokemon/>
            )
          }
          <Box position='absolute' right={0} bottom={0}>
            <ThemeSwitch/>
          </Box>
        </Box>
      </>
    )
}
export default App
