import { TableRow } from "./TableRow";
import { Sword, Shield, Heart } from "phosphor-react";

import { pokemonBaseStat, pokemonTypes, whatPokemonTierIs } from "../pokemonFunctions";

export function Table({ data, pokeNature, isShiny }) {
    return (
        <div className="divTable">
            <div className="stats">
                <div>
                    <Sword size={24} color="#1c1669" weight="fill" />
                    {pokemonBaseStat(data.stats, 'atk', pokeNature, isShiny)}
                </div>
                <div>
                    <Heart size={24} color="#d81313" weight="fill" />
                    {pokemonBaseStat(data.stats, 'hp', pokeNature, isShiny)}
                </div>
                <div>
                    <Shield size={24} color="#02690e" weight="fill" />
                    {pokemonBaseStat(data.stats, 'ca', pokeNature, isShiny)}
                </div>
            </div>
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
                    tableTitle="Speed"
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