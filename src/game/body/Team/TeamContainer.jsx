import { Box, Button, Center, Flex, Image, Text, Tooltip, useColorMode, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";
import { stringToUpperCase } from "@utils";

import PokeTeam from "./PokeTeam";
import Card from "@features/pokemon/Card";

// bag icon removed — using text label instead

const scrollbarCSS = {
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { width: "4px" },
  "&::-webkit-scrollbar-thumb": { backgroundColor: "#4A5568", borderRadius: "24px" },
}

export default function TeamContainer() {
    const { boxIds, pokemonData, moveToTeam, teamIds, bagDirty, confirmBag } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const boxPokemons = boxIds.map(id => pokemonData[id]).filter(Boolean)
    const teamFull = teamIds?.length >= 6
    const hasBox = boxPokemons.length > 0

    return (
        <Flex flex="1">
            {hasBox && (
                <Flex
                    flexDir="column"
                    alignItems="center"
                    py={2}
                    px={1}
                    gap={2}
                    backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
                >
                    <Text fontSize="2xs" fontWeight="bold">{t('team.pokes')}</Text>
                    <Box
                        flex="1"
                        overflowY="auto"
                        css={scrollbarCSS}
                    >
                        <VStack spacing={2}>
                            {boxPokemons.map(poke => {
                                const disabled = teamFull
                                return (
                                    <Tooltip key={poke.id} label={<Card poke={poke} tooltip />} background="none" placement="right">
                                        <Center
                                            w={14}
                                            h={14}
                                            minH={14}
                                            borderRadius={8}
                                            backgroundColor="gray.600"
                                            cursor={disabled ? "not-allowed" : "pointer"}
                                            opacity={disabled ? 0.5 : 1}
                                            _hover={!disabled ? { opacity: 0.8 } : undefined}
                                            onClick={!disabled ? () => moveToTeam(poke.id) : undefined}
                                        >
                                            <Image
                                                w={12}
                                                h={10}
                                                src={poke.sprites?.mini || poke.sprites?.front}
                                                title={stringToUpperCase(poke.name)}
                                                draggable={false}
                                                fallback={<Text fontSize="xl" w={12} h={10} textAlign="center">?</Text>}
                                            />
                                        </Center>
                                    </Tooltip>
                                )
                            })}
                        </VStack>
                    </Box>
                    {bagDirty && (
                        <Button
                            colorScheme="yellow"
                            size="xs"
                            w={14}
                            h={14}
                            minH={14}
                            borderRadius={8}
                            onClick={confirmBag}
                            title={t('team.confirmChanges')}
                        >
                            ✓
                        </Button>
                    )}
                </Flex>
            )}
            <PokeTeam bag={hasBox} />
        </Flex>
    )
}