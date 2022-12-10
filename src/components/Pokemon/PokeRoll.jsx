import PokeModal from "./Modal/Modal";
import { FaDice } from "react-icons/fa";

export function PokeRoll({ rollNewPokemon, cleanPokemonRoll, children }) {
    return (
        <PokeModal 
            title={'A Wild Pokemon Appears!'} 
            button={<FaDice size="24px"/>} 
            rollNewPokemon={rollNewPokemon}
            cleanPokemonRoll={cleanPokemonRoll}
        >
            {children}
        </PokeModal>
    )
}