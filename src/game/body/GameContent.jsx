import { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import PlayerContext from "@context/PlayerContext";
import ActionPanel from "./ActionPanel/ActionPanel";
import TeamContainer from "./Team/TeamContainer";
import RightPanel from "./RightPanel/RightPanel";
import PokeUpgradePanel from "@game/header/Buttons/PokeUpgrade/PokeUpgradePanel";
import DayCarePanel from "@game/header/Buttons/PokeDayCare/DayCarePanel";
import TrainingCampPanel from "@game/header/Buttons/TrainingCamp/TrainingCampPanel";
import PlayerAugmentsPanel from "@game/header/Buttons/Augments/PlayerAugmentsPanel";
import GymPanel from "@game/modals/Gym/GymPanel";
import FarmPanel from "@features/farm/FarmPanel";
import JourneyScreen from "@features/journey/JourneyScreen";
import JourneySelection from "@features/journey/JourneySelection";
import BattleScreen from "@game/modals/EventModals/BattleModal";

const panels = {
    bag: TeamContainer,
    upgrade: PokeUpgradePanel,
    daycare: DayCarePanel,
    training: TrainingCampPanel,
    augments: PlayerAugmentsPanel,
    gym: GymPanel,
    farm: FarmPanel,
}

export default function GameContent() {
    const { activeTab, game, getCurrentPhase } = useContext(PlayerContext)
    const ActivePanel = panels[activeTab] || TeamContainer
    const currentPhase = getCurrentPhase()

    // Phase-based routing
    if (currentPhase === 'battle') {
        return (
            <Flex flex="1">
                <BattleScreen />
            </Flex>
        )
    }

    if (currentPhase === 'journey' || game.openJourneySelection) {
        if (game.isInJourney) {
            return (
                <Flex flex="1">
                    <JourneyScreen />
                </Flex>
            )
        }
        return (
            <Flex flex="1">
                <JourneySelection />
            </Flex>
        )
    }

    if (game.isInJourney) {
        return (
            <Flex flex="1">
                <JourneyScreen />
            </Flex>
        )
    }

    // freeActions phase (default) — show main UI
    return (
        <Flex flex="1">
            <ActionPanel />
            <ActivePanel />
            <RightPanel />
        </Flex>
    )
}