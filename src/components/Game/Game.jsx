import React from "react"
import GameHeader from "./GameHeader";
import GameContent from "./GameContent";
import ModalController from "./ModalController";
import GameEnd from "./GameEnd";

function PokePage({ game }) {
    return (
        <>
            {game.gameEnded ? (
                <GameEnd />
            ) : (
                <>
                    <GameHeader />
        
                    <GameContent />
        
                    <ModalController />
                </>
            )}
        </>
    )
}

export default PokePage