import Card from "../../Pokemon/Card"

export default function SelectedPokemon({ selectedPokemon }) {
    return (
        <>
            {selectedPokemon && (
                <Card poke={selectedPokemon} />
            )}
        </>
    )
}