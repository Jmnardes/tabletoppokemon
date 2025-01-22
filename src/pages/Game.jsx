import React from "react"
import GameHeader from "../game/header/GameHeader";
import GameContent from "../game/body/GameContent";
import ModalController from "../game/modals/ModalController";
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

const GameComponents = () => (
    <>
        <GameHeader />
        <GameContent />
        <ModalController />
    </>
);

export default PokePage