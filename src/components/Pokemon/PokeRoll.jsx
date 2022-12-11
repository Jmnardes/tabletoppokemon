import PokeModal from "./Modal/Modal";
import { FaPlay } from "react-icons/fa";

export function PokeRoll({ children }) {

    return (
        <PokeModal 
            title={'Pokemon encounter'} 
            button={<FaPlay size="24px"/>}
        >
            {children}
        </PokeModal>
    )
}