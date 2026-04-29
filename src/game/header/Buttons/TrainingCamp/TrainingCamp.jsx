import { useContext, useState, useMemo } from "react";
import { Button, Text, Center, Box, Image, Flex } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import coinIcon from "@assets/images/game/coin.png";
import GenericModal from "@components/Modal/GenericModal";
import HorizontalArray from "@features/pokemon/HorizontalArray";

export default function TrainingCamp() {
    const {
        emit,
        player,
        boxIds,
        setBoxIds,
        setPokemonData,
        setLoading,
        trainingCamp,
        setTrainingCamp,
        updateGame,
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
                setBoxIds([...result.box]); // always new array
                setTrainingCamp([...result.trainingCamp]); // always new array
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

    // Always use up-to-date Pokémon objects for slots
    const slots = useMemo(() => {
        const pokes = typeof getTrainingCampPokemons === 'function' ? getTrainingCampPokemons() : trainingCamp;
        return Array.from({ length: 3 }, (_, i) => pokes[i] || null);
    }, [getTrainingCampPokemons, trainingCamp]);

    const renderSlots = () => (
        <Flex justify="center" align="center" gap={8}>
            {slots.map((poke, idx) => {
                let slotDesc = "";
                if (poke && idx >= tokens) {
                    slotDesc = "No token available: this Pokémon will not be trained.";
                }
                return (
                    <Box
                        key={poke?.id || idx}
                        p={4}
                        borderRadius={12}
                        minW={56}
                        minH={80}
                        backgroundColor={"gray.700"}
                        mx={2}
                        boxShadow="lg"
                        position="relative"
                    >
                        <Flex align="center" mb={2} gap={2}>
                            <Text fontWeight="bold" fontSize="lg">1x</Text>
                            <Image src={coinIcon} w={8} h={8} title="Daycare Token" />
                        </Flex>
                        {poke ? (
                            <Center flexDir="column" gap={2}>
                                <Image src={poke.sprites?.main} w={24} h={24} borderRadius={8} boxShadow="md" />
                                <Text fontWeight="bold" fontSize="md">{poke.name}</Text>
                                <Text fontSize="xs" color="gray.300">Lv.{poke.level}</Text>
                                {slotDesc && (
                                    <Text color="orange.300" fontSize="xs" textAlign="center">{slotDesc}</Text>
                                )}
                                <Button colorScheme="red" size="sm" mt={2} onClick={() => showRemoveModal(poke.id)}>Remove</Button>
                            </Center>
                        ) : (
                            <Center flexDir="column" gap={2} minH={32}>
                                <Text color="gray.400" fontSize="sm" textAlign="center">Empty slot. Select a Pokémon from the box above.</Text>
                            </Center>
                        )}
                    </Box>
                );
            })}
        </Flex>
    );

    return (
        <>
            <GenericModal
                title="Training Camp"
                closeButton={true}
                onModalClose={() => updateGame({ openTrainingCampModal: false })}
            >
                <Center mb={4} gap={2} justifyContent={"space-between"}>
                    <Box display="flex" flexDir={"row"} gap={2}>
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

                <Box w="100%" mb={8}>
                {getBoxPokemons && getBoxPokemons().length === 0 ? (
                    <Text color="gray.400" textAlign="center">
                        No Pokémon in box
                    </Text>
                ) : (
                    <HorizontalArray
                        box
                        size="md"
                        handler={handleSelectFromBox}
                        isDisabled={slotsFull || tokens === 0}
                    />
                )}
                </Box>

                <Center w="100%">{renderSlots()}</Center>
            </GenericModal>

            {confirmRemove.open && (
                <ConfirmationModal
                event={() => handleRemove(confirmRemove.index)}
                modalTitle="Remove from Training Camp?"
                modalText="Are you sure you want to remove this Pokémon from the camp?"
                isDisabled={false}
                borderRadius={8}
                flexDir={"column"}
                h={28}
                w={28}
                />
            )}
        </>
    );
}
