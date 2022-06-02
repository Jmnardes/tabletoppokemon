import { TableRow } from "../../Table/TableRow";
import { Sword, Shield, Heart } from "phosphor-react";

function PokemonTable({ health, attack, defense, tier, type, speed, nature }) {
    return (
        <div className="divTable">
            <div className="stats">
                <div>
                    <Heart size={24} color="#d81313" weight="fill" />
                    {health}
                </div>
                <div>
                    <Sword size={24} color="#2b2ebb" weight="fill" />
                    {attack}
                </div>
                <div>
                    <Shield size={24} color="#02690e" weight="fill" />
                    {defense}
                </div>
            </div>
            <div className="divTableBody">
                <TableRow 
                    tableTitle="Tier"
                    tableValue={tier}
                />
                <TableRow 
                    tableTitle="Type"
                    tableValue={type}
                />
                <TableRow
                    tableTitle="Speed"
                    tableValue={speed}
                />
                {nature ? (
                    <TableRow
                        tableTitle="Nature"
                        tableValue={nature}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default PokemonTable