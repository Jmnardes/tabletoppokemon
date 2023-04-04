import { useContext, useEffect } from "react";
import PlayerContext from "../../../Contexts/PlayerContext";
import Pokeballs from "./Pokeballs";
import RollController from "./RollController";

export default function PokeRoll({
        children,
        pokemonArrayLength,
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
            <RollController
                pokemonArrayLength={pokemonArrayLength}
            >
                <Pokeballs
                    disablePokeballs={disablePokeballs}
                    setBonusOnCatch={setBonusOnCatch}
                    setDisablePokeballs={setDisablePokeballs}
                    handleCatchDiceRoll={handleCatchDiceRoll}
                    disableDiceRoll={disableDiceRoll}
                />
            </RollController>
            {children}
        </>
    )
}