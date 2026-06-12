import Capture from "./Capture"
import GenericModal from "@components/Modal/GenericModal"
import { useTranslation } from "react-i18next"

export default function CaptureModal({ capturedPokemon, setCapturedPokemon, augments }) {
    const { t } = useTranslation()
    return (
        <GenericModal title={t('encounter.newPokemon')}>
            <Capture capturedPokemon={capturedPokemon} setCapturedPokemon={setCapturedPokemon} augments={augments} />
        </GenericModal>
    )
}