import Capture from "./Capture"
import GenericModal from "@components/Modal/GenericModal"

export default function CaptureModal({ capturedPokemon, setCapturedPokemon }) {
    return (
        <GenericModal title={"New Pókemon"}>
            <Capture capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} />
        </GenericModal>
    )
}