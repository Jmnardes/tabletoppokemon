import { Box, Button, Center, Flex, HStack, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { keyframes } from "@emotion/react";
import PlayerContext from "@context/PlayerContext";
import { stringToUpperCase } from "@utils";

import PokeTeam from "./PokeTeam";
import Card from "@features/pokemon/Card";
import ItemsPanel from "@game/header/Buttons/PokeBag/ItemsPanel";
import SelectPokemonModal from "@game/header/Buttons/PokeBag/SelectPokemonModal";

import pokeboxClosed from '@assets/images/box/pokebox-closed.png'
import pokeboxOpen from '@assets/images/box/pokebox-open.png'
import greatboxClosed from '@assets/images/box/greatbox-closed.png'
import greatboxOpen from '@assets/images/box/greatbox-open.png'
import ultraboxClosed from '@assets/images/box/ultrabox-closed.png'
import ultraboxOpen from '@assets/images/box/ultrabox-open.png'

const BOX_NAMES = {
    pokebox: 'box.pokebox',
    greatbox: 'box.greatbox',
    ultrabox: 'box.ultrabox',
}

const BOX_CLOSED = { pokebox: pokeboxClosed, greatbox: greatboxClosed, ultrabox: ultraboxClosed }
const BOX_OPEN = { pokebox: pokeboxOpen, greatbox: greatboxOpen, ultrabox: ultraboxOpen }

const spinGlow = keyframes`
  0% { transform: rotateY(0deg) scale(1); filter: drop-shadow(0 0 2px gold); }
  25% { transform: rotateY(90deg) scale(1.1); filter: drop-shadow(0 0 12px gold); }
  50% { transform: rotateY(180deg) scale(1.2); filter: drop-shadow(0 0 20px white); }
  75% { transform: rotateY(270deg) scale(1.1); filter: drop-shadow(0 0 12px gold); }
  100% { transform: rotateY(360deg) scale(1); filter: drop-shadow(0 0 2px gold); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
`

export default function TeamContainer() {
    const { boxIds, pokemonData, moveToTeam, teamIds, bagDirty, confirmBag, emit, handleToast, setPlayer, setBerries } = useContext(PlayerContext)
    const { colorMode } = useColorMode()
    const { t } = useTranslation()

    const boxPokemons = boxIds.map(id => pokemonData[id]).filter(Boolean)
    const teamFull = teamIds?.length >= 6
    const hasBox = boxPokemons.length > 0

    // Item/box modal state (moved from RightPanel)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDust, setIsDust] = useState(false)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [boxToOpen, setBoxToOpen] = useState(null)
    const [animPhase, setAnimPhase] = useState(null)
    const [lootResult, setLootResult] = useState(null)

    const handleSelectItem = (item, dust, isBox) => {
        if (isBox) {
            setBoxToOpen(item)
            setAnimPhase(null)
            setLootResult(null)
            return
        }
        setSelectedItem(item)
        setIsDust(dust)
        setIsSelectOpen(true)
    }

    const handleOpenBox = async () => {
        if (!boxToOpen) return
        const boxType = boxToOpen.type
        setAnimPhase('spinning')
        try {
            const result = await emit('player-open-box', { boxType })
            if (result) {
                setPlayer(prev => ({
                    ...prev,
                    boxes: result.boxes,
                    items: result.items,
                    balls: result.balls,
                    potions: result.potions,
                    daycare: result.daycare,
                }))
                setBerries(result.berries)
                const loot = result.loot
                const lootText = loot.type === 'berry'
                    ? `${loot.berry.name} berry`
                    : `${loot.amount}x ${loot.key || loot.type}`
                setLootResult(lootText)
            }
        } catch (err) {
            handleToast({
                id: 'box-error',
                title: t('common.error'),
                description: err.message,
                status: 'error',
                position: 'top',
            })
            setBoxToOpen(null)
            setAnimPhase(null)
        }
    }

    const handleAnimationEnd = () => {
        setAnimPhase('result')
    }

    const handleCloseBoxModal = () => {
        setBoxToOpen(null)
        setAnimPhase(null)
        setLootResult(null)
    }

    const bgBar = colorMode === 'light' ? "gray.300" : "gray.600"

    return (
        <Flex flex="1" flexDir="column" overflow="hidden">
            {/* Bar: box pokémon + usable items */}
            <Flex
                px={3}
                py={1}
                alignItems="center"
                backgroundColor={bgBar}
                justifyContent="center"
                gap={2}
                flexWrap="wrap"
            >
                {/* Box pokémon */}
                {hasBox && (
                    <HStack spacing={1}>
                        {boxPokemons.map(poke => {
                            const disabled = teamFull
                            return (
                                <Tooltip key={poke.id} label={<Card poke={poke} tooltip />} background="none" placement="bottom">
                                    <Center
                                        w={10}
                                        h={10}
                                        borderRadius={6}
                                        backgroundColor="gray.600"
                                        cursor={disabled ? "not-allowed" : "pointer"}
                                        opacity={disabled ? 0.5 : 1}
                                        _hover={!disabled ? { opacity: 0.8 } : undefined}
                                        onClick={!disabled ? () => moveToTeam(poke.id) : undefined}
                                    >
                                        <Image
                                            w={8}
                                            h={7}
                                            src={poke.sprites?.mini || poke.sprites?.front}
                                            title={stringToUpperCase(poke.name)}
                                            draggable={false}
                                            fallback={<Text fontSize="md" w={8} h={7} textAlign="center">?</Text>}
                                        />
                                    </Center>
                                </Tooltip>
                            )
                        })}
                        {bagDirty && (
                            <Button
                                colorScheme="yellow"
                                size="xs"
                                w={10}
                                h={10}
                                minW={10}
                                borderRadius={6}
                                onClick={confirmBag}
                                title={t('team.confirmChanges')}
                            >
                                ✓
                            </Button>
                        )}
                    </HStack>
                )}

                {(hasBox && true) && <Box w="1px" h="28px" bg="gray.500" mx={1} />}

                {/* Usable items (boxes + berries/dust) */}
                <ItemsPanel onSelectItem={handleSelectItem} />
            </Flex>

            {/* Pokémon team cards */}
            <Flex flex="1" overflow="auto">
                <PokeTeam bag={hasBox} />
            </Flex>

            {/* Select Pokémon modal for item use */}
            <SelectPokemonModal
                isOpen={isSelectOpen}
                onClose={() => setIsSelectOpen(false)}
                selectedItem={selectedItem}
                isDust={isDust}
            />

            {/* Box open modal with animation */}
            {boxToOpen && (
                <Modal isOpen onClose={handleCloseBoxModal} isCentered size="sm" closeOnOverlayClick={animPhase !== 'spinning'}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign="center">{t('box.openTitle')}</ModalHeader>
                        <ModalBody>
                            <Center flexDir="column" gap={4} py={4}>
                                {animPhase === 'result' ? (
                                    <>
                                        <Image
                                            src={BOX_OPEN[boxToOpen.type]}
                                            w="120px"
                                            animation={`${fadeIn} 0.5s ease-out`}
                                        />
                                        <Text
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color="gold"
                                            animation={`${fadeIn} 0.5s ease-out 0.2s both`}
                                        >
                                            {lootResult}
                                        </Text>
                                        <Text fontSize="sm" color="gray.400">{t('box.received')}</Text>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src={BOX_CLOSED[boxToOpen.type]}
                                            w="120px"
                                            animation={animPhase === 'spinning' ? `${spinGlow} 0.75s ease-in-out 2` : undefined}
                                            onAnimationEnd={handleAnimationEnd}
                                        />
                                        {!animPhase && (
                                            <>
                                                <Text textAlign="center" fontWeight="bold">{t(BOX_NAMES[boxToOpen.type])}</Text>
                                                <Text fontSize="sm" color="gray.400" textAlign="center">{t('box.openDesc')}</Text>
                                            </>
                                        )}
                                        {animPhase === 'spinning' && (
                                            <Text fontSize="sm" color="yellow.300">✨ {t('box.opening')} ✨</Text>
                                        )}
                                    </>
                                )}
                            </Center>
                        </ModalBody>
                        <ModalFooter justifyContent="center" gap={4}>
                            {!animPhase && (
                                <>
                                    <Button colorScheme="green" onClick={handleOpenBox}>{t('common.confirm')}</Button>
                                    <Button variant="ghost" onClick={handleCloseBoxModal}>{t('common.cancel')}</Button>
                                </>
                            )}
                            {animPhase === 'result' && (
                                <Button colorScheme="yellow" onClick={handleCloseBoxModal}>{t('common.close')}</Button>
                            )}
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    )
}