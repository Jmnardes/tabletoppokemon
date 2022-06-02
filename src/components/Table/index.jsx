import { TableRow } from "./TableRow";
import { Sword, Shield, Heart } from "phosphor-react";
import { pokemonBaseStat, whatPokemonTierIs } from "../pokemonFunctions";

export function Table({ data, pokeNature, isShiny, pokemonType }) {
    return (
        <div className="divTable">
            <div className="stats">
                <div>
                    <Heart size={24} color="#d81313" weight="fill" />
                    {pokemonBaseStat(data.stats, 'hp', pokeNature, isShiny)}
                </div>
                <div>
                    <Sword size={24} color="#2b2ebb" weight="fill" />
                    {pokemonBaseStat(data.stats, 'atk', pokeNature, isShiny)}
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
                    tableValue={pokemonType}
                />
                <TableRow
                    tableTitle="Speed"
                    tableValue={data.stats[5].stat}
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
