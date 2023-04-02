import { Button, useColorMode } from "@chakra-ui/react"
import { Sun, Moon } from "phosphor-react";

function ThemeSwitch() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <>
        <Button h={12} m={4} onClick={toggleColorMode}>
          {colorMode === 'light' ? (
            <Moon size={18} weight="bold" color="#020303" />
          ) : (
            <Sun size={18} weight="bold" color="#ffffff" />
          )}
        </Button>
      </>
    )
}

export default ThemeSwitch