import PokeModal from "./Modal/Modal";
import { FaPlay } from "react-icons/fa";

export function PokeRoll({ rollNewPokemon, cleanPokemonRoll, children }) {
    return (
        <PokeModal 
            title={'Wild Pokemon Appeared!'} 
            button={<FaPlay size="24px"/>} 
            rollNewPokemon={rollNewPokemon}
            cleanPokemonRoll={cleanPokemonRoll}
        >
            {children}
        </PokeModal>
    )
}