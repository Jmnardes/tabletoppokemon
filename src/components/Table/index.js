import { TableRow } from "./TableRow";

import { pokemonBaseStat, pokemonTypes, whatPokemonTierIs } from "../pokemonFunctions";

export function Table({ data, pokeNature, isShiny }) {
    return (
        <div className="divTable">
            <div className="divTableBody">
                <TableRow 
                    tableTitle="Tier"
                    tableValue={whatPokemonTierIs(data.stats)}
                />
                <TableRow 
                    tableTitle="Type"
                    tableValue={pokemonTypes(data)}
                />
                <TableRow
                    tableTitle="Attack"
                    tableValue={pokemonBaseStat(data.stats, 'atk', pokeNature, isShiny)}
                />
                <TableRow
                    tableTitle="Hp"
                    tableValue={pokemonBaseStat(data.stats, 'hp', pokeNature, isShiny)}
                />
                <TableRow
                    tableTitle="CA"
                    tableValue={pokemonBaseStat(data.stats, 'ca', pokeNature, isShiny)}
                />
                <TableRow
                    tableTitle={data.stats[5].stat.name}
                    tableValue={data.stats[5].base_stat}
                />
                {pokeNature ? (
                    <TableRow
                        tableTitle="Nature"
                        tableValue={pokeNature.nature}
                    />
                ) : null}
            </div>
        </div>
    )
}