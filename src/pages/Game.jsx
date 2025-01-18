import React from "react"
import GameHeader from "../game/GameHeader";
import GameContent from "../game/GameContent";
import ModalController from "../game/ModalController";
import GameEnd from "../game/GameEnd";

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

const GameComponents = () => (
    <>
        <GameHeader />
        <GameContent />
        <ModalController />
    </>
);

export default PokePage