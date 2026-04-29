import { useContext, useMemo } from "react";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import { stringToUpperCase } from "@utils";
import Card from "@features/pokemon/Card";

const SIZE_MAP = {
  sm: { box: 52, img: 52, nameFont: "2xs" },
  md: { box: 64, img: 64, nameFont: "xs" },
  lg: { box: 84, img: 84, nameFont: "sm" },
};

export default function HorizontalArray({
  box = false,
  team = false,
  handler,
  isDisabled = false,
  size = "md",
}) {
  const { pokemonData, boxIds, teamIds } = useContext(PlayerContext);
  const dims = SIZE_MAP[size] ?? SIZE_MAP.md;

  const ids = useMemo(() => {
    if (box && team) return Array.from(new Set([...boxIds, ...teamIds]));
    if (box) return boxIds;
    if (team) return teamIds;
    return [];
  }, [box, team, boxIds, teamIds]);

  const pokeArray = useMemo(() => {
    if (pokemonData && typeof pokemonData === "object" && !Array.isArray(pokemonData)) {
      return ids.map((id) => pokemonData[id]).filter(Boolean);
    }
    if (Array.isArray(pokemonData)) {
      return ids.map((id) => pokemonData.find((p) => p?.id === id)).filter(Boolean);
    }
    return [];
  }, [ids, pokemonData]);

  return (
    <Flex
      gap={4}
      p={2}
      overflowX="auto"
      overflowY="hidden"   // Ô£à kills vertical scroll
      align="flex-start"
    >
      {pokeArray.map((pokemon, idx) => {
        const clickable = !isDisabled && typeof handler === "function";

        return (
          <Box
            key={pokemon.id ?? idx}
            minW={`${dims.box}px`}
            w={`${dims.box}px`}
            cursor={clickable ? "pointer" : "not-allowed"}
            opacity={isDisabled ? 0.5 : 1}
            onClick={clickable ? () => handler(pokemon.id, pokemon) : undefined}
          >
            <Box
              w={`${dims.box}px`}
              h={`${dims.box}px`}
              borderRadius={8}
              backgroundColor="gray.600"
              boxShadow="md"
              overflow="hidden"
            >
              <Tooltip label={<Card poke={pokemon} tooltip={true} />} background="none">
                <Image
                  src={pokemon?.sprites?.main}
                  w="100%"
                  h="100%"
                  title={stringToUpperCase(pokemon.name)}
                  draggable={false}
                />
              </Tooltip>
            </Box>

            <Text
              mt={1}
              fontSize={dims.nameFont}
              textAlign="center"
              isTruncated        // Ô£à ellipsis
              maxW={`${dims.box}px`}
            >
              {stringToUpperCase(pokemon.name)}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}