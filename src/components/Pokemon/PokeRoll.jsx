import PokeModal from "./Modal/Modal";
import { FaDice, FaUndo } from "react-icons/fa";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

export function PokeRoll({ handlePokeRoll, rolledPokemon, setPokemonArray, options, setTier, children }) {
    return (
        <PokeModal title={'roll'} button={<FaDice size="24px"/>}>
            <Flex justifyContent="center">
                <Box mx={2} textAlign="center" w={28}>
                    <Select
                        placeholder={'Tier'}
                        mx={2}
                        variant='outline'
                        options={options}
                        onChange={(e) => setTier(e.value)}
                    />
                </Box>
                <Button
                    mx={2}
                    title="Roll"
                    isDisabled={rolledPokemon < 4 ? false : true}
                    onClick={() => handlePokeRoll()}
                >
                    <FaDice size="24px"/>
                </Button>
                <Button 
                    mx={2}
                    title="Clear"
                    isDisabled={rolledPokemon === 0 ? true : false}
                    onClick={() => setPokemonArray([])}
                >
                    <FaUndo size="18px"/>
                </Button>
            </Flex>

            {children}
        </PokeModal>
    )
}