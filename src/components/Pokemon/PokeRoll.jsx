import PokeModal from "./Modal/Modal";
import { FaDice } from "react-icons/fa";

export function PokeRoll({ children }) {
    return (
        <PokeModal title={'roll'} button={<FaDice size="24px"/>}>
            {children}
        </PokeModal>
    )
}