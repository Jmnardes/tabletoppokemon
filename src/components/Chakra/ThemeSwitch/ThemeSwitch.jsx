import { Button, useColorMode } from "@chakra-ui/react"
import { Sun, Moon } from "phosphor-react";

function ThemeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <header>
        <Button size="sm" m={2} onClick={toggleColorMode}>
          {colorMode === 'light' ? (
            <Moon size={16} color="#020303" />
          ) : (
            <Sun size={16} color="#020303" />
          )}
        </Button>
      </header>
    )
}

export default ThemeSwitch