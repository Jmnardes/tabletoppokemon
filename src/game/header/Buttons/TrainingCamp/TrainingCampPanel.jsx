import { useContext, useState } from "react";
import { Badge, Box, Button, Divider, Flex, HStack, Image, Text, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PlayerContext from "@context/PlayerContext";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import coinIcon from "@assets/images/game/coin.png";
import dummyIcon from "@assets/images/training/dummy.png";
import dummyBrokenIcon from "@assets/images/training/dummy-broken.png";
import PokeList from "@features/pokemon/PokeList";

const MAX_SLOTS = 3;
const SLOT_COST = 5;
const UPGRADE_COST = 5;
const MAX_EQUIPMENT_LEVEL = 3;

const EQUIPMENT_LEVELS = {
    1: { break: 8, skip: 14, exp1: 50, exp2: 24, exp3: 4 },
    2: { break: 6, skip: 11, exp1: 48, exp2: 29, exp3: 6 },
    3: { break: 5, skip: 8, exp1: 49, exp2: 30, exp3: 8 },
};

function ActiveSlot({ entry, onRemove, onRepair, tokens }) {
    const { pokemon, status, broken } = entry;
    const isSettling = status === "settling";
    const { t } = useTranslation();

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            textAlign="center"
            gap={1}
            flex="1"
            minW="120px"
            maxW="160px"
        >
            <Image
                src={broken ? dummyBrokenIcon : dummyIcon}
                w="48px" h="48px"
                objectFit="contain"
                mb={1}
            />
            <Image
                src={pokemon.sprites?.main}
                w="64px"
                borderRadius={8}
                opacity={isSettling || broken ? 0.6 : 1}
                filter={broken ? "grayscale(80%)" : isSettling ? "grayscale(40%)" : "none"}
            />
            <Text fontWeight="bold" fontSize="sm">{pokemon.name}</Text>
            <Text fontSize="xs" color="gray.400">Lv.{pokemon.level} • {pokemon.exp ?? 0} exp</Text>
            {broken ? (
                <>
                    <Badge colorScheme="red" fontSize="2xs">{t('training.broken')}</Badge>
                    <Tooltip label={tokens < 1 ? t('training.notEnoughTokens') : t('training.repairFor')} hasArrow>
                        <Button colorScheme="red" size="xs" mt={1}
                            onClick={() => onRepair(pokemon.id)} isDisabled={tokens < 1}>
                            <Image src={coinIcon} w="14px" mr={1} /> {t('training.repair')}
                        </Button>
                    </Tooltip>
                </>
            ) : isSettling ? (
                <Badge colorScheme="orange" fontSize="2xs">{t('training.settling')}</Badge>
            ) : (
                <>
                    <Badge colorScheme="green" fontSize="2xs">{t('training.title')}</Badge>
                    <Button colorScheme="red" size="xs" variant="ghost" mt={1} onClick={() => onRemove(pokemon.id)}>
                        {t('training.remove')}
                    </Button>
                </>
            )}
        </Flex>
    );
}

function EmptySlot() {
    const { t } = useTranslation();
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minH="140px"
            flex="1"
            minW="120px"
            maxW="160px"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor="whiteAlpha.300"
            borderRadius="lg"
        >
            <Image src={dummyIcon} w="48px" h="48px" objectFit="contain" opacity={0.3} mb={1} />
            <Text fontSize="xs" color="whiteAlpha.500">{t('training.selectPokemon')}</Text>
        </Flex>
    );
}

function LockedSlot({ isNext, tokens, onBuy }) {
    const canAfford = tokens >= SLOT_COST;
    const { t } = useTranslation();

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minH="140px"
            flex="1"
            minW="120px"
            maxW="160px"
            borderWidth="2px"
            borderStyle="dashed"
            borderColor={isNext ? "blue.400" : "whiteAlpha.200"}
            borderRadius="lg"
            opacity={isNext ? 1 : 0.3}
        >
            <Image src={dummyIcon} w="48px" h="48px" objectFit="contain" opacity={isNext ? 0.5 : 0.2} mb={1} />
            {isNext ? (
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={onBuy}
                    isDisabled={!canAfford}
                    title={t('training.buySlot', { cost: SLOT_COST })}
                >
                    <Image src={coinIcon} w="16px" mr={1} />
                    {SLOT_COST}
                </Button>
            ) : (
                <Text fontSize="xs" color="whiteAlpha.400">{t('training.locked')}</Text>
            )}
        </Flex>
    );
}

export default function TrainingCampPanel() {
    const {
        emit,
        player,
        setPlayer,
        setBoxIds,
        setLoading,
        trainingCamp,
        setTrainingCamp,
        getBoxPokemons,
        handleToast,
    } = useContext(PlayerContext);
    const { t } = useTranslation();

    const [confirmRemove, setConfirmRemove] = useState({ open: false, id: null });
    const [showNextLevel, setShowNextLevel] = useState(false);

    const tokens = player.daycare?.token || 0;
    const camp = trainingCamp?.camp || [];
    const slots = trainingCamp?.slots ?? 0;
    const campFull = camp.length >= slots;
    const equipmentLevel = trainingCamp?.equipmentLevel || 1;
    const rates = EQUIPMENT_LEVELS[equipmentLevel];
    const nextRates = EQUIPMENT_LEVELS[equipmentLevel + 1];
    const isMaxLevel = equipmentLevel >= MAX_EQUIPMENT_LEVEL;

    const handleSelect = async (pokeId) => {
        setLoading({ loading: true, text: t('training.selecting') });
        try {
            const result = await emit("player-training-select", { pokemonId: pokeId });
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.boxIds) setBoxIds([...result.boxIds]);
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const handleRemove = async (pokeId) => {
        setLoading({ loading: true, text: t('training.removing') });
        try {
            const result = await emit("player-training-remove", { pokemonId: pokeId });
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.boxIds) setBoxIds([...result.boxIds]);
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: "error" });
        }
        setLoading({ loading: false });
        setConfirmRemove({ open: false, id: null });
    };

    const handleBuySlot = async () => {
        setLoading({ loading: true, text: t('training.buying') });
        try {
            const result = await emit("training-buy-slot", {});
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }));
            handleToast({ title: t('training.newSlot'), description: t('training.slotUnlocked'), status: "success", duration: 3000 });
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const handleRepair = async (pokemonId) => {
        setLoading({ loading: true, text: t('training.repairing') });
        try {
            const result = await emit("training-repair", { pokemonId });
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }));
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const handleUpgrade = async () => {
        setLoading({ loading: true, text: t('training.upgrading') });
        try {
            const result = await emit("training-upgrade", {});
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }));
            handleToast({ title: t('training.upgraded'), description: t('training.upgradedDesc', { level: equipmentLevel + 1 }), status: "success", duration: 4000 });
        } catch (error) {
            handleToast({ title: t('common.error'), description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const boxPokemons = getBoxPokemons ? getBoxPokemons() : [];

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">{t('training.title')}</Text>
            <Text fontSize="small" textAlign="center" mt={1} mb={2}>
                {t('training.subtitle')}
            </Text>

            {/* Equipment Level Badge */}
            <Flex justify="center" mb={4}>
                <Badge
                    colorScheme={isMaxLevel ? 'yellow' : 'blue'}
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {t('training.equipmentLevel', { level: equipmentLevel })}
                </Badge>
            </Flex>

            {boxPokemons.length > 0 && !campFull && (
                <PokeList
                    pokemons={boxPokemons}
                    onSelect={(pokemon) => handleSelect(pokemon.id)}
                    size="xs"
                />
            )}
            {boxPokemons.length === 0 && (
                <Text color="gray.400" textAlign="center" mb={2}>{t('training.noBoxPokemon')}</Text>
            )}

            <Flex justify="center" gap={4} flexWrap="wrap" mt={3}>
                {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                    const entry = camp[i];
                    if (entry) {
                        return (
                            <ActiveSlot
                                key={entry.pokemon.id}
                                entry={entry}
                                onRemove={(id) => setConfirmRemove({ open: true, id })}
                                onRepair={handleRepair}
                                tokens={tokens}
                            />
                        );
                    }
                    if (i < slots) {
                        return <EmptySlot key={`empty-${i}`} />;
                    }
                    const isNext = i === slots;
                    return (
                        <LockedSlot
                            key={`locked-${i}`}
                            isNext={isNext}
                            tokens={tokens}
                            onBuy={handleBuySlot}
                        />
                    );
                })}
            </Flex>

            {/* Equipment Info Block */}
            <Box
                border="1px solid"
                borderColor="whiteAlpha.300"
                borderRadius="lg"
                bg="gray.800"
                p={4}
                mt={4}
                mb={4}
            >
                <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800" mb={1}>
                    ⚙ {t('training.equipmentGuide')}
                </Text>
                <Text fontSize="2xs" color="whiteAlpha.600" mb={3}>
                    {t('training.guideDesc')}
                </Text>

                <Divider borderColor="whiteAlpha.200" mb={3} />

                <Text fontSize="2xs" fontWeight="bold" color="whiteAlpha.700" mb={2}>
                    {t('training.trainingRates', { level: equipmentLevel })}
                </Text>
                <Flex flexDir="column" gap={1}>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="cyan.300">+1 EXP</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="cyan.300" fontWeight="bold">{rates.exp1}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.exp1}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="blue.300">+2 EXP</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="blue.300" fontWeight="bold">{rates.exp2}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.exp2}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="purple.300">+3 EXP</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="purple.300" fontWeight="bold">{rates.exp3}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.exp3}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <Divider borderColor="whiteAlpha.100" my={1} />
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="whiteAlpha.500">{t('training.skip')}</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="whiteAlpha.500">{rates.skip}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.skip}%</Text>
                            )}
                        </HStack>
                    </HStack>
                    <HStack justify="space-between">
                        <Text fontSize="2xs" color="red.400">{t('training.break')}</Text>
                        <HStack spacing={1}>
                            <Text fontSize="2xs" color="red.400">{rates.break}%</Text>
                            {showNextLevel && nextRates && (
                                <Text fontSize="2xs" color="green.300" fontWeight="bold">→ {nextRates.break}%</Text>
                            )}
                        </HStack>
                    </HStack>
                </Flex>
            </Box>

            {/* Upgrade Button */}
            {!isMaxLevel && (
                <Flex justify="center" mb={4}>
                    <Box
                        onMouseEnter={() => setShowNextLevel(true)}
                        onMouseLeave={() => setShowNextLevel(false)}
                    >
                        <Tooltip
                            label={tokens < UPGRADE_COST
                                ? t('training.needTokens', { cost: UPGRADE_COST, current: tokens })
                                : t('training.upgradeTooltip', { level: equipmentLevel + 1 })
                            }
                            hasArrow
                        >
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={handleUpgrade}
                                isDisabled={tokens < UPGRADE_COST}
                            >
                                {t('training.upgradeEquipment')} {UPGRADE_COST}
                                <Image src={coinIcon} w="16px" ml={1} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Flex>
            )}
            {isMaxLevel && (
                <Text fontSize="xs" color="yellow.400" textAlign="center" fontWeight="bold" mb={4}>
                    {t('training.maxLevel')}
                </Text>
            )}

            {confirmRemove.open && (
                <ConfirmationModal
                    event={() => handleRemove(confirmRemove.id)}
                    modalTitle={t('training.removeTitle')}
                    modalText={t('training.removeDesc')}
                    isDisabled={false}
                    borderRadius={8}
                    flexDir="column"
                    h={28}
                    w={28}
                />
            )}
        </Flex>
    );
}
