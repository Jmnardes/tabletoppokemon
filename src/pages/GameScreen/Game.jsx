import { useContext } from "react";
import PlayerContext from "@context/PlayerContext";
import GameHeader from "@game/header/GameHeader";
import GameContent from "@game/body/GameContent";
import ModalController from "@game/modals/ModalController";
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
    const { getCurrentPhase } = useContext(PlayerContext)
    const currentPhase = getCurrentPhase()
    const hideHeader = currentPhase === 'battle' || currentPhase === 'journey'

    return (
        <>
            {!hideHeader && <GameHeader />}
            <GameContent />
            <ModalController />
        </>
    )
};

export default PokePage