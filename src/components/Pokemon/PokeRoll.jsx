import PokeModal from "./Modal/Modal";
import { FaDice, FaDiceD20 } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
                    <FaDice size="18px"/>
                </Button>
                <Button 
                    mx={2}
                    title="Clear"
                    isDisabled={rolledPokemon === 0 ? true : false}
                    onClick={() => setPokemonArray([])}
                >
                    <AiFillDelete size="18px"/>
                </Button>
                <Button 
                    mx={2}
                    title="Rolld20"
                >
                    <FaDiceD20 size="18px"/>
                </Button>
                <Text fontSize='2xl' ml={2}>20</Text>
            </Flex>

            {children}
        </PokeModal>
    )
}