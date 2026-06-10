import { useContext, useState } from "react";
import { Button, Text, Image, Flex, Badge } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import coinIcon from "@assets/images/game/coin.png";
import PokeList from "@features/pokemon/PokeList";

const MAX_SLOTS = 3;
const getSlotCost = (currentSlots) => 3;

function ActiveSlot({ entry, onRemove }) {
    const { pokemon, status } = entry;
    const isSettling = status === "settling";

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
                src={pokemon.sprites?.main}
                w="100px"
                borderRadius={8}
                opacity={isSettling ? 0.6 : 1}
                filter={isSettling ? "grayscale(40%)" : "none"}
            />
            <Text fontWeight="bold" fontSize="sm">{pokemon.name}</Text>
            <Text fontSize="xs" color="gray.400">Lv.{pokemon.level} • {pokemon.exp ?? 0} exp</Text>
            {isSettling ? (
                <Badge colorScheme="orange" fontSize="2xs">Settling...</Badge>
            ) : (
                <>
                    <Badge colorScheme="green" fontSize="2xs">Training</Badge>
                    <Button colorScheme="red" size="xs" variant="ghost" mt={1} onClick={() => onRemove(pokemon.id)}>
                        Remove
                    </Button>
                </>
            )}
        </Flex>
    );
}

function EmptySlot() {
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
            <Text fontSize="xs" color="whiteAlpha.500">Select a Pokémon</Text>
        </Flex>
    );
}

function LockedSlot({ slotIndex, isNext, tokens, onBuy }) {
    const cost = getSlotCost(slotIndex);
    const canAfford = tokens >= cost;

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
            {isNext ? (
                <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={onBuy}
                    isDisabled={!canAfford}
                    title={canAfford ? `Buy for ${cost} tokens` : `Need ${cost} tokens`}
                >
                    <Image src={coinIcon} w="16px" mr={1} />
                    {cost}
                </Button>
            ) : (
                <Text fontSize="xs" color="whiteAlpha.400">Locked</Text>
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

    const [confirmRemove, setConfirmRemove] = useState({ open: false, id: null });

    const tokens = player.daycare?.token || 0;
    const camp = trainingCamp?.camp || [];
    const slots = trainingCamp?.slots || 1;
    const campFull = camp.length >= slots;

    const handleSelect = async (pokeId) => {
        setLoading({ loading: true, text: "Selecting for training..." });
        try {
            const result = await emit("player-training-select", { pokemonId: pokeId });
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.boxIds) setBoxIds([...result.boxIds]);
        } catch (error) {
            handleToast({ title: "Error", description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const handleRemove = async (pokeId) => {
        setLoading({ loading: true, text: "Removing from training..." });
        try {
            const result = await emit("player-training-remove", { pokemonId: pokeId });
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.boxIds) setBoxIds([...result.boxIds]);
        } catch (error) {
            handleToast({ title: "Error", description: error.message, status: "error" });
        }
        setLoading({ loading: false });
        setConfirmRemove({ open: false, id: null });
    };

    const handleBuySlot = async () => {
        setLoading({ loading: true, text: "Buying slot..." });
        try {
            const result = await emit("training-buy-slot", {});
            if (result?.trainingCamp) setTrainingCamp(result.trainingCamp);
            if (result?.daycare) setPlayer(prev => ({ ...prev, daycare: result.daycare }));
            handleToast({ title: "New Slot", description: "Training slot unlocked!", status: "success", duration: 3000 });
        } catch (error) {
            handleToast({ title: "Error", description: error.message, status: "error" });
        }
        setLoading({ loading: false });
    };

    const boxPokemons = getBoxPokemons ? getBoxPokemons() : [];

    return (
        <Flex flex="1" flexDir="column" overflowY="auto" p={4}>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Training Camp</Text>
            <Flex justify="center" align="center" gap={2} mb={1}>
                <Image src={coinIcon} w={5} />
                <Text fontWeight="bold" fontSize="sm">{tokens}</Text>
                <Text fontSize="xs" color="gray.400">• 1 token/turn per pokémon</Text>
            </Flex>
            <Text fontSize="small" textAlign="center" mb={3}>
                Place a Pokémon to train. After settling for 1 turn, it gains +2 EXP each turn.
            </Text>

            {boxPokemons.length > 0 && !campFull && (
                <PokeList
                    pokemons={boxPokemons}
                    onSelect={(pokemon) => handleSelect(pokemon.id)}
                    size="xs"
                />
            )}
            {boxPokemons.length === 0 && (
                <Text color="gray.400" textAlign="center" mb={2}>No Pokémon in box</Text>
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
                            />
                        );
                    }
                    // Unlocked empty slot
                    if (i < slots) {
                        return <EmptySlot key={`empty-${i}`} />;
                    }
                    // Locked slot
                    const isNext = i === slots;
                    return (
                        <LockedSlot
                            key={`locked-${i}`}
                            slotIndex={i}
                            isNext={isNext}
                            tokens={tokens}
                            onBuy={handleBuySlot}
                        />
                    );
                })}
            </Flex>

            {confirmRemove.open && (
                <ConfirmationModal
                    event={() => handleRemove(confirmRemove.id)}
                    modalTitle="Remove from Training Camp?"
                    modalText="This Pokémon will return to your box."
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
