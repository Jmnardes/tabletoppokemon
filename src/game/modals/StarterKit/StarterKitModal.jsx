import { useContext, useState } from "react"
import {
    Box,
    Button,
    Center,
    Flex,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import PlayerContext from "@context/PlayerContext"

import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import potionIcon from '@assets/images/items/potion.png'
import hyperPotionIcon from '@assets/images/items/hyper-potion.png'
import dustIcon from '@assets/images/items/dust.png'
import lureIcon from '@assets/images/items/lure.png'
import tokenIcon from '@assets/images/game/coin.png'

const defaultItems = [
    { icon: pokeballIcon, label: '10 Pokéballs' },
    { icon: lureIcon, label: '1 Incense' },
    { icon: tokenIcon, label: '5 Tokens' },
]

const classData = {
    adventurer: {
        name: 'Adventurer',
        emoji: '⚔️',
        color: 'blue.400',
        items: [
            { icon: potionIcon, label: '+3 Potions' },
            { icon: hyperPotionIcon, label: '+1 Hyper Potion' },
        ],
    },
    catcher: {
        name: 'Catcher',
        emoji: '🎯',
        color: 'green.400',
        items: [
            { icon: pokeballIcon, label: '+5 Pokéballs' },
            { icon: greatballIcon, label: '+1 Greatball' },
        ],
    },
    trainer: {
        name: 'Trainer',
        emoji: '🏋️',
        color: 'yellow.400',
        items: [
            { icon: dustIcon, label: '+7 Dust' },
        ],
    },
}

function ItemRow({ icon, label }) {
    return (
        <Flex align="center" gap={2} py={0.5}>
            {icon && <Image src={icon} w="20px" h="20px" />}
            {!icon && <Text fontSize="sm">🎁</Text>}
            <Text fontSize="sm">{label}</Text>
        </Flex>
    )
}

function ClassCard({ kitKey, data, isSelected, onSelect }) {
    return (
        <Box
            flex="1"
            p={4}
            borderWidth={2}
            borderColor={isSelected ? data.color : 'gray.600'}
            borderRadius="lg"
            bg={isSelected ? 'whiteAlpha.100' : 'transparent'}
            cursor="pointer"
            onClick={onSelect}
            _hover={{ borderColor: data.color, bg: 'whiteAlpha.50' }}
            transition="all 0.2s"
        >
            <VStack spacing={3}>
                <Text fontSize="2xl">{data.emoji}</Text>
                <Text fontSize="lg" fontWeight="bold" color={data.color}>
                    {data.name}
                </Text>
                <VStack align="start" spacing={1} w="full">
                    {data.items.map((item, i) => (
                        <ItemRow key={i} icon={item.icon} label={item.label} />
                    ))}
                </VStack>
            </VStack>
        </Box>
    )
}

export default function StarterKitModal() {
    const { emit, setPlayer, setBerries, updateGame, setLoading, handleToast, setFarm, setCraft, setTrainingCamp } = useContext(PlayerContext)
    const [selectedKit, setSelectedKit] = useState(null)
    const { t } = useTranslation()

    const handleConfirm = async () => {
        if (!selectedKit) return

        setLoading({ loading: true, text: 'Applying starter kit...' })

        try {
            const result = await emit('player-select-kit', { kit: selectedKit })

            if (result) {
                setPlayer(prev => ({
                    ...prev,
                    ...(result.balls && { balls: result.balls }),
                    ...(result.items && { items: result.items }),
                    ...(result.potions && { potions: result.potions }),
                    ...(result.daycare && { daycare: result.daycare }),
                }))
                if (result.berries) setBerries(result.berries)
                if (result.farm) setFarm(result.farm)
                if (result.craft) setCraft(result.craft)
                if (result.trainingCamp) setTrainingCamp(result.trainingCamp)
            }

            updateGame({ openStarterKitModal: false })
            setLoading({ loading: false })

            handleToast({
                title: t('toast.kitApplied', { name: classData[selectedKit].name }),
                description: t('toast.kitAppliedDesc'),
                status: 'success',
                duration: 4000,
            })
        } catch (error) {
            setLoading({ loading: false })
            handleToast({
                id: 'select-kit-error',
                title: t('toast.errorSelectingKit'),
                description: error.message || t('toast.connectionError'),
                status: 'error',
                position: 'top',
            })
            console.error('Error selecting starter kit:', error)
        }
    }

    return (
        <Modal isOpen size="4xl" isCentered closeOnOverlayClick={false}>
            <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(2px) hue-rotate(0deg)'
            />
            <ModalContent p={4}>
                <ModalHeader fontSize="2xl" textAlign="center" pt={0}>
                    {t('starterKit.chooseKit')}
                </ModalHeader>

                <Center flexDir="column" px={4}>
                    <Text fontSize="sm" color="gray.400" mb={2}>
                        {t('starterKit.everyTrainerReceives')}
                    </Text>
                    <Flex gap={4} mb={4} flexWrap="wrap" justify="center">
                        {defaultItems.map((item, i) => (
                            <ItemRow key={i} icon={item.icon} label={item.label} />
                        ))}
                    </Flex>

                    <Text fontSize="sm" color="gray.400" mb={3}>
                        {t('starterKit.pickClass')}
                    </Text>

                    <Flex gap={3} w="full" mb={4}>
                        {Object.entries(classData).map(([key, data]) => (
                            <ClassCard
                                key={key}
                                kitKey={key}
                                data={data}
                                isSelected={selectedKit === key}
                                onSelect={() => setSelectedKit(key)}
                            />
                        ))}
                    </Flex>

                    <Button
                        onClick={handleConfirm}
                        isDisabled={!selectedKit}
                        colorScheme="green"
                        w="200px"
                        mb={2}
                    >
                        Confirm
                    </Button>
                </Center>
            </ModalContent>
        </Modal>
    )
}
