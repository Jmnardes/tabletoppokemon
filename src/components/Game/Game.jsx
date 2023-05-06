import React from "react"
import GameHeader from "./GameHeader";
import GameContent from "./GameContent";
import ModalController from "../Controllers/ModalController";

function PokePage() {

    return (
        <>
            <GameHeader />

            <GameContent />

            <ModalController />
        </>
    )
}

export default PokePage