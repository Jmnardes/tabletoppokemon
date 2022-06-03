import { Button } from "@chakra-ui/react"
import { useState } from "react"
import PokeDex from "./PokeDex"
import PokeRoll from "./PokeRoll"

function Pokemon() {
    const [isSearch, setIsSearch] = useState(false)

    const handleIsSearch = () => {
        setIsSearch(!isSearch)
    }

    return (
        <>
            <Button w={20} mr={2} onClick={() => handleIsSearch()}>
                { isSearch ? 'Random' : 'Search' }
            </Button>

            {isSearch ? (
                <PokeDex/>
            ) : (
                <PokeRoll/>
            )}
        </>
    )
}

export default Pokemon