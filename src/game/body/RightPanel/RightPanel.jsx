import { useContext, useState } from "react";
import { Flex, useColorMode } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import Opponents from "../Opponents/Opponents";
import ItemsPanel from "@game/header/Buttons/PokeBag/ItemsPanel";
import SelectPokemonModal from "@game/header/Buttons/PokeBag/SelectPokemonModal";

export default function RightPanel() {
    const { colorMode } = useColorMode();
    const { activeTab } = useContext(PlayerContext);
    const [selectedItem, setSelectedItem] = useState(null)
    const [isDust, setIsDust] = useState(false)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    const handleSelectItem = (item, dust) => {
        setSelectedItem(item)
        setIsDust(dust)
        setIsSelectOpen(true)
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

            {/* Opponents */}
            <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                backgroundColor={colorMode === 'light' ? "gray.400" : "gray.700"}
                py={2}
                px={1}
            >
                <Opponents />
            </Flex>

            {showItems && (
                <SelectPokemonModal
                    isOpen={isSelectOpen}
                    onClose={() => setIsSelectOpen(false)}
                    selectedItem={selectedItem}
                    isDust={isDust}
                />
            )}
        </Flex>
    );
}