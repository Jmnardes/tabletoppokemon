import React from "react"
import { useContext } from "react";
import PlayerContext from "../Contexts/PlayerContext"
import ChallengeModal from "./Pokemon/Modal/EventModals/ChallengeModal"
import WalkModal from "./Pokemon/Modal/EventModals/WalkModal"
import GymModal from "./Pokemon/Modal/EventModals/GymModal"
import EncounterModal from "./Pokemon/Modal/EventModals/EncounterModal"
import PokeShopModal from "./Pokemon/Modal/PokeShopModal";
import GameHeader from "./GameHeader";
import GameContent from "./GameContent";

function PokePage() {
    const { game } = useContext(PlayerContext)

    return (
        <>
            <GameHeader />

            <GameContent />

            {game.openPokeShop && <PokeShopModal />}
            {game.openChallengeModal && <ChallengeModal />}
            {game.openWalkModal && <WalkModal />}
            {game.openGymModal && <GymModal />}
            {game.openEncounterModal && <EncounterModal />}
        </>
    )
}

export default PokePage