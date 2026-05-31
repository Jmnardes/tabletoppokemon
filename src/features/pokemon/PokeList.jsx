import { useMemo } from "react"
import { Center, Flex, HStack, Image, Text, Tooltip } from "@chakra-ui/react"
import { stringToUpperCase } from "@utils"
import Card from "@features/pokemon/Card"
import ConfirmationModal from "@components/Modal/ConfirmationModal"

const SIZE_CONFIG = {
  xs: { container: 16, imgW: 16, imgH: 12, sprite: "mini", showName: false, nameFont: "2xs" },
  sm: { container: 36, imgW: 32, imgH: 32, sprite: "front", showName: false, nameFont: "2xs" },
  md: { container: 64, imgW: 64, imgH: 64, sprite: "main", showName: true, nameFont: "xs" },
}

const scrollbarCSS = {
  "&::-webkit-scrollbar": { height: "14px", width: "2px" },
  "&::-webkit-scrollbar-track": { width: "2px" },
  "&::-webkit-scrollbar-thumb": { backgroundColor: "#4A5568", borderRadius: "24px" },
}

function PokeItem({ pokemon, config, onSelect, showTooltip, confirmAction, isItemDisabled }) {
  const name = stringToUpperCase(pokemon.name)
  const spriteSrc = pokemon.sprites?.[config.sprite] || pokemon.sprites?.front
  const disabled = typeof isItemDisabled === "function" ? isItemDisabled(pokemon) : isItemDisabled

  const tooltipLabel = useMemo(() => {
    if (!showTooltip) return null
    return <Card poke={pokemon} tooltip={true} />
  }, [pokemon, showTooltip])

  const imageElement = (
    <Image
      w={config.imgW}
      minW={config.imgW}
      minH={config.imgH}
      h={config.imgH}
      title={name}
      src={spriteSrc}
      fallbackSrc={pokemon.sprites?.front}
      draggable={false}
    />
  )

  const content = (
    <>
      {showTooltip ? (
        <Tooltip label={tooltipLabel} background="none">
          {imageElement}
        </Tooltip>
      ) : imageElement}
      {config.showName && (
        <Text
          mt={1}
          fontSize={config.nameFont}
          textAlign="center"
          isTruncated
          maxW={`${config.container}px`}
        >
          {name}
        </Text>
      )}
    </>
  )

  const confirm = typeof confirmAction === "function" ? confirmAction(pokemon) : confirmAction

  if (confirm && onSelect) {
    return (
      <ConfirmationModal
        event={() => onSelect(pokemon)}
        modalTitle={confirm.title}
        modalText={confirm.text}
        h="auto"
        minW={0}
        p={0}
        isDisabled={disabled}
      >
        <Center
          flexDir="column"
          w={config.container}
          minW={config.container}
          backgroundColor="gray.600"
          borderRadius={8}
          overflow="hidden"
          opacity={disabled ? 0.5 : 1}
        >
          {content}
        </Center>
      </ConfirmationModal>
    )
  }

  return (
    <Center
      flexDir="column"
      w={config.container}
      minW={config.container}
      backgroundColor="gray.600"
      borderRadius={8}
      overflow="hidden"
      cursor={onSelect && !disabled ? "pointer" : disabled ? "not-allowed" : "default"}
      opacity={disabled ? 0.5 : 1}
      _hover={onSelect && !disabled ? { opacity: 0.8 } : undefined}
      onClick={onSelect && !disabled ? () => onSelect(pokemon) : undefined}
    >
      {content}
    </Center>
  )
}

export default function PokeList({
  pokemons,
  onSelect,
  size = "sm",
  layout = "scroll",
  showName,
  showTooltip = true,
  isDisabled = false,
  confirmAction,
  sprite,
  containerProps = {},
}) {
  const config = { ...SIZE_CONFIG[size] || SIZE_CONFIG.sm }

  if (showName !== undefined) config.showName = showName
  if (sprite) config.sprite = sprite

  if (layout === "wrap") {
    return (
      <Flex
        gap={4}
        p={2}
        flexWrap="wrap"
        justify="center"
        {...containerProps}
      >
        {pokemons?.map((poke) => (
          <PokeItem
            key={poke.id}
            pokemon={poke}
            config={config}
            onSelect={onSelect}
            showTooltip={showTooltip}
            confirmAction={confirmAction}
            isItemDisabled={isDisabled}
          />
        ))}
      </Flex>
    )
  }

  return (
    <HStack
      spacing={1}
      my={2}
      p={1}
      overflowX="auto"
      overflowY="hidden"
      justify="center"
      css={scrollbarCSS}
      {...containerProps}
    >
      {pokemons?.map((poke) => (
        <PokeItem
          key={poke.id}
          pokemon={poke}
          config={config}
          onSelect={onSelect}
          showTooltip={showTooltip}
          confirmAction={confirmAction}
          isItemDisabled={isDisabled}
        />
      ))}
    </HStack>
  )
}