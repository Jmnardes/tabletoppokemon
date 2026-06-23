import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";
import GameHeader from "@game/header/GameHeader";
import GameContent from "@game/body/GameContent";
import ModalController from "@game/modals/ModalController";
import TutorialOverlay from "@components/Tutorial/TutorialOverlay";
import PauseOverlay from "@components/PauseOverlay";
import GameEnd from "./GameEnd";

function PokePage({ game }) {
    return (
        <>
            {game.gameEnded ? (
                <GameEnd />
            ) : (
                <GameComponents />
            )}
        </>
    )
}

const GameComponents = () => {
    const { getCurrentPhase, game } = useContext(PlayerContext)
    const currentPhase = getCurrentPhase()
    const hideHeader = currentPhase === 'battle' || currentPhase === 'journey' || currentPhase === 'gym'

    return (
        <>
            {!hideHeader && <GameHeader />}
            <GameContent />
            <ModalController />
            {game.tutorialStep != null && <TutorialOverlay />}
            <PauseOverlay />
        </>
    )
};

export default PokePage