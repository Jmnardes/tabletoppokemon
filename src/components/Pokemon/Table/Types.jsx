import { Box } from "@chakra-ui/react";
import { AiFillEye as Psychic } from "react-icons/ai";
import { 
    GiSmallFire as Fire,
    GiDrop as Water,
    GiSpikedDragonHead as Dragon, 
    GiSpottedBug as Bug,
    GiMoon as Dark,
    GiElectric as Electric,
    GiFallingStar as Fairy,
    GiFist as Fighter,
    GiFluffyWing as Flying,
    GiSnowflake1 as Ice,
    GiGhost as Ghost,
    GiLindenLeaf as Grass,
    GiGroundbreaker as Ground,
    GiPoisonGas as Poison,
    GiStonePile as Rock,
    GiMetalBar as Steel,
    GiConcentricCrescents as Normal
} from "react-icons/gi";

function Types({ types }) {
    return (
        <Box display="flex" justifyContent="center">
            {types.map(t => {
                if (t === 'psychic') return <Psychic title={t} key={t} color="#b43fe7" size={28} style={{marginLeft: 4}}/>
                if (t === 'fire') return <Fire title={t} key={t} color="#CD5C5C" size={28} style={{marginLeft: 4}}/>
                if (t === 'water') return <Water title={t} key={t} color=" #3498db" size={28} style={{marginLeft: 4}}/>
                if (t === 'dragon') return <Dragon title={t} key={t} color="#e5c67e" size={28} style={{marginLeft: 4}}/>
                if (t === 'bug') return <Bug title={t} key={t} color="#69ca47" size={28} style={{marginLeft: 4}}/>
                if (t === 'dark') return <Dark title={t} key={t} color="#170223" size={28} style={{marginLeft: 4}}/>
                if (t === 'electric') return <Electric title={t} key={t} color="#d5d20c" size={28} style={{marginLeft: 4}}/>
                if (t === 'fairy') return <Fairy title={t} key={t} color="#e390d8" size={28} style={{marginLeft: 4}}/>
                if (t === 'fighting') return <Fighter title={t} key={t} color="#f1883b" size={28} style={{marginLeft: 4}}/>
                if (t === 'flying') return <Flying title={t} key={t} color="#93d4d6" size={28} style={{marginLeft: 4}}/>
                if (t === 'ice') return <Ice title={t} key={t} color="#00f7ff" size={28} style={{marginLeft: 4}}/>
                if (t === 'ghost') return <Ghost title={t} key={t} color="#600e92" size={28} style={{marginLeft: 4}}/>
                if (t === 'grass') return <Grass title={t} key={t} color="#195827" size={28} style={{marginLeft: 4}}/>
                if (t === 'ground') return <Ground title={t} key={t} color="#854e08" size={28} style={{marginLeft: 4}}/>
                if (t === 'poison') return <Poison title={t} key={t} color="#b362bb" size={28} style={{marginLeft: 4}}/>
                if (t === 'rock') return <Rock title={t} key={t} color="#474747" size={28} style={{marginLeft: 4}}/>
                if (t === 'steel') return <Steel title={t} key={t} color="#a3a3a3" size={28} style={{marginLeft: 4}}/>
                if (t === 'normal') return <Normal title={t} key={t} color="#f7ddba" size={28} style={{marginLeft: 4}}/>
            })}
        </Box>
    )
}

export default Types
