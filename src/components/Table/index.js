import { TableRow } from "./TableRow";

import { highestPokemonStat, pokemonBaseStat, pokemonTypes, whatPokemonTierIs } from "../pokemonFunctions";

export function Table({ data }) {
    return (
        <div className="divTable">
            <div className="divTableBody">
                <TableRow
                    tableTitle="Name"
                    tableValue={data.name} 
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
                    tableValue={pokemonBaseStat(data.stats, 'atk')}
                />
                <TableRow
                    tableTitle="Hp"
                    tableValue={pokemonBaseStat(data.stats, 'hp')}
                />
                <TableRow
                    tableTitle="CA"
                    tableValue={pokemonBaseStat(data.stats, 'ca')}
                />
                <TableRow
                    tableTitle={data.stats[5].stat.name}
                    tableValue={data.stats[5].base_stat}
                />
                <TableRow
                    tableTitle="Highest Stat"
                    tableValue={highestPokemonStat(data.stats)}
                />
            </div>
        </div>
    )
}