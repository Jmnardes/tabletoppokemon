import { useContext, useState, useMemo } from "react";
import { Button, Text, Center, Box, Image, Flex } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import coinIcon from "@assets/images/game/coin.png";
import PokeList from "@features/pokemon/PokeList";

export default function TrainingCampPanel() {
    const {
        emit,
        player,
        setBoxIds,
        setPokemonData,
        setLoading,
        trainingCamp,
        setTrainingCamp,
        getBoxPokemons,
        getTrainingCampPokemons,
    } = useContext(PlayerContext);

    const [confirmRemove, setConfirmRemove] = useState({ open: false, index: null });

    const tokens = player.daycare?.token || 0;
    const slotsFull = trainingCamp.filter(Boolean).length === 3;

    const handleSelectFromBox = (pokeId) => {
        if (slotsFull) return;
        handleSelect(pokeId);
    };

    const handleSelect = async (pokeId) => {
        setLoading({ loading: true, text: "Selecting for training..." });
        try {
            const result = await emit("player-training-select", { pokemonId: pokeId });
            if (result?.box && result?.trainingCamp) {
                setBoxIds([...result.box]);
                setTrainingCamp([...result.trainingCamp]);
                setPokemonData((prev) => {
                    const newData = { ...prev };
                    delete newData[pokeId];
                    return newData;
                });
            }
        } finally {
            setLoading({ loading: false });
        }
    };

    const handleRemove = async (pokeId) => {
        setLoading({ loading: true, text: "Removing from training..." });
        try {
            const result = await emit("player-training-remove", { pokemonId: pokeId });
            if (result?.box && result?.trainingCamp) {
                setBoxIds([...result.box]);
                setTrainingCamp([...result.trainingCamp]);
                setPokemonData((prev) => ({
                    ...prev,
                    [pokeId]: player.pokemons.find((p) => p.id === pokeId),
                }));
            }
        } finally {
            setLoading({ loading: false });
            setConfirmRemove({ open: false, index: null });
        }
    };

    const showRemoveModal = (pokeId) => setConfirmRemove({ open: true, index: pokeId });

    const slots = useMemo(() => {
        const pokes = typeof getTrainingCampPokemons === 'function' ? getTrainingCampPokemons() : trainingCamp;
        return Array.from({ length: 3 }, (_, i) => pokes[i] || null);
    }, [getTrainingCampPokemons, trainingCamp]);

    const renderSlots = () => (
        <Flex justify="center" align="stretch" gap={4} flexWrap="wrap">
            {slots.map((poke, idx) => {
                let slotDesc = "";
                if (poke && idx >= tokens) {
                    slotDesc = "No token available: this Pokémon will not be trained.";
                }
                return (
                    <Box
                        key={poke?.id || idx}
                        p={3}
                        borderRadius={12}
                        flex="1 1 0"
                        minW={40}
                        maxW={56}
                        backgroundColor={"gray.700"}
                        boxShadow="lg"
                    >
                        <Flex align="center" mb={1} gap={1}>
                            <Text fontWeight="bold" fontSize="sm">1x</Text>
                            <Image src={coinIcon} w={5} h={5} title="Daycare Token" />
                        </Flex>
                        {poke ? (
                            <Center flexDir="column" gap={1}>
                                <Image src={poke.sprites?.main} w={16} h={16} borderRadius={8} boxShadow="md" />
                                <Text fontWeight="bold" fontSize="sm">{poke.name}</Text>
                                <Text fontSize="xs" color="gray.300">Lv.{poke.level}</Text>
                                {slotDesc && (
                                    <Text color="orange.300" fontSize="2xs" textAlign="center">{slotDesc}</Text>
                                )}
                                <Button colorScheme="red" size="xs" mt={1} onClick={() => showRemoveModal(poke.id)}>Remove</Button>
                            </Center>
                        ) : (
                            <Center flexDir="column" gap={1} minH={20}>
                                <Text color="gray.400" fontSize="xs" textAlign="center">Empty slot. Select a Pokémon from the box above.</Text>
                            </Center>
                        )}
                    </Box>
                );
            })}
        </Flex>
    );

    return (
        <Flex flex="1" flexDir="column" p={4} overflow="hidden">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Training Camp</Text>
            <Center mb={2} gap={2} justifyContent="space-between">
                <Box display="flex" flexDir="row" gap={2}>
                    <Image src={coinIcon} w={6} h={6} title="Daycare Token" />
                    <Text fontWeight="bold" fontSize="md">
                        {tokens}
                    </Text>
                </Box>
                <Text fontSize="sm" textAlign="center">
                    Here you can level up your Pokémon
                </Text>
                <Box mr={8}></Box>
            </Center>

            <Box w="100%" mb={2}>
                {getBoxPokemons && getBoxPokemons().length === 0 ? (
                    <Text color="gray.400" textAlign="center">
                        No Pokémon in box
                    </Text>
                ) : (
                    <PokeList
                        pokemons={getBoxPokemons()}
                        onSelect={(pokemon) => handleSelectFromBox(pokemon.id)}
                        isDisabled={slotsFull || tokens === 0}
                    />
                )}
            </Box>

            <Flex flex="1" align="center" justify="center" w="100%">{renderSlots()}</Flex>

            {confirmRemove.open && (
                <ConfirmationModal
                    event={() => handleRemove(confirmRemove.index)}
                    modalTitle="Remove from Training Camp?"
                    modalText="Are you sure you want to remove this Pokémon from the camp?"
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
