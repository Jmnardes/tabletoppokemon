import { useContext, useEffect } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import Pokeballs from "./Pokeballs";

export default function PokeEnconter({
        children,
        handlePokemonEncounter,
        disableDiceRoll,
        handleCatchDiceRoll,
        disablePokeballs,
        setBonusOnCatch,
        setDisablePokeballs
    }) {
    const { game } = useContext(PlayerContext)

    useEffect(() => {
        handlePokemonEncounter()
    }, [game.turn])

    return (
        <>
            <Pokeballs
                disablePokeballs={disablePokeballs}
                setBonusOnCatch={setBonusOnCatch}
                setDisablePokeballs={setDisablePokeballs}
                handleCatchDiceRoll={handleCatchDiceRoll}
                disableDiceRoll={disableDiceRoll}
            />
            {children}
        </>
    )
}