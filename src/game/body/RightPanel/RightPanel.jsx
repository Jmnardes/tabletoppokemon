import { useContext, useState } from "react";
import { Button, Center, Flex, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorMode } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import PlayerContext from "@context/PlayerContext";
import ItemsPanel from "@game/header/Buttons/PokeBag/ItemsPanel";
import SelectPokemonModal from "@game/header/Buttons/PokeBag/SelectPokemonModal";
import { useTranslation } from "react-i18next";

import pokeboxClosed from '@assets/images/box/pokebox-closed.png'
import pokeboxOpen from '@assets/images/box/pokebox-open.png'
import greatboxClosed from '@assets/images/box/greatbox-closed.png'
import greatboxOpen from '@assets/images/box/greatbox-open.png'
import ultraboxClosed from '@assets/images/box/ultrabox-closed.png'
import ultraboxOpen from '@assets/images/box/ultrabox-open.png'

import dustIcon from '@assets/images/items/dust.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import potionIcon from '@assets/images/items/potion.png'
import superPotionIcon from '@assets/images/items/super-potion.png'
import tokenIcon from '@assets/images/game/coin.png'

const LOOT_ICONS = {
    dust: dustIcon, pokeball: pokeballIcon, greatball: greatballIcon,
    potion: potionIcon, superPotion: superPotionIcon, token: tokenIcon,
}

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

export default function RightPanel() {
    const { colorMode } = useColorMode();
    const { activeTab, emit, handleToast, setPlayer, setBerries } = useContext(PlayerContext);
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDust, setIsDust] = useState(false)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [boxToOpen, setBoxToOpen] = useState(null)
    const [animPhase, setAnimPhase] = useState(null) // null | 'spinning' | 'result'
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
                const lootIcon = LOOT_ICONS[loot.type] || null
                setLootResult({ text: lootText, icon: lootIcon })
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

    const showItems = activeTab === 'bag'

    return (
        <Flex>
            {/* Items - only in bag view */}
            {showItems && (
                <Flex
                    flexDir="column"
                    alignItems="center"
                    backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
                    py={2}
                    px={1}
                    overflowY="auto"
                >
                    <ItemsPanel onSelectItem={handleSelectItem} />
                </Flex>
            )}

            {showItems && (
                <SelectPokemonModal
                    isOpen={isSelectOpen}
                    onClose={() => setIsSelectOpen(false)}
                    selectedItem={selectedItem}
                    isDust={isDust}
                />
            )}

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
                                        {lootResult?.icon && (
                                            <Image
                                                src={lootResult.icon}
                                                w="48px" h="48px"
                                                objectFit="contain"
                                                animation={`${fadeIn} 0.5s ease-out 0.1s both`}
                                            />
                                        )}
                                        <Text
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color="gold"
                                            animation={`${fadeIn} 0.5s ease-out 0.2s both`}
                                        >
                                            {lootResult?.text}
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
    );
}