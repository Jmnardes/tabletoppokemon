import { TableRow } from "./TableRow";

import { highestPokemonStat, pokemonBaseStat, pokemonTypes, whatPokemonTierIs } from "../pokemonFunctions";

export function Table({ data, pokeNature, isShiny }) {
    return (
        <div className="divTable">
            <div className="divTableBody">
                <TableRow
                    tableTitle="Name"
                    tableValue={data.name + (isShiny ? '★' : '')} 
                />
                <TableRow 
                    tableTitle="Type"
                    tableValue={pokemonTypes(data)}
                />
                <TableRow
                    tableTitle="Tier"
                    tableValue={whatPokemonTierIs(data.stats)}
                />
                <TableRow
                    tableTitle="Attack"
                    tableValue={pokemonBaseStat(data.stats, 'atk', pokeNature)}
                />
                <TableRow
                    tableTitle="Hp"
                    tableValue={pokemonBaseStat(data.stats, 'hp', pokeNature)}
                />
                <TableRow
                    tableTitle="CA"
                    tableValue={pokemonBaseStat(data.stats, 'ca', pokeNature)}
                />
                <TableRow
                    tableTitle={data.stats[5].stat.name}
                    tableValue={data.stats[5].base_stat}
                />
                <TableRow
                    tableTitle="Highest Stat"
                    tableValue={highestPokemonStat(data.stats)}
                />
                <TableRow
                    tableTitle="Nature"
                    tableValue={pokeNature.nature}
                />
            </div>
        </div>
    )
}