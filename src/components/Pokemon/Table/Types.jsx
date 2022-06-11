import { Box, Image } from "@chakra-ui/react";

import bug from '../../../assets/images/elements/bug.webp'
import dark from '../../../assets/images/elements/dark.webp'
import dragon from '../../../assets/images/elements/dragon.webp'
import electric from '../../../assets/images/elements/electric.webp'
import fairy from '../../../assets/images/elements/fairy.webp'
import fighting from '../../../assets/images/elements/fighting.webp'
import fire from '../../../assets/images/elements/fire.webp'
import flying from '../../../assets/images/elements/flying.webp'
import ghost from '../../../assets/images/elements/ghost.png'
import grass from '../../../assets/images/elements/grass.png'
import ground from '../../../assets/images/elements/ground.webp'
import ice from '../../../assets/images/elements/ice.webp'
import normal from '../../../assets/images/elements/normal.webp'
import psychic from '../../../assets/images/elements/psychic.webp'
import poison from '../../../assets/images/elements/poison.webp'
import rock from '../../../assets/images/elements/rock.webp'
import steel from '../../../assets/images/elements/steel.webp'
import water from '../../../assets/images/elements/water.webp'
import { stringToUpperCase } from "../../../util";

function Types({ types, inventaryPoke }) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="start">
            {types.map(t => {
                if (t === 'bug') return <Image src={bug} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'dark') return <Image src={dark} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'dragon') return <Image src={dragon} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'electric') return <Image src={electric} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'fairy') return <Image src={fairy} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'fighting') return <Image src={fighting} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'fire') return <Image src={fire} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'flying') return <Image src={flying} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'ghost') return <Image src={ghost} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'grass') return <Image src={grass} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'ground') return <Image src={ground} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'ice') return <Image src={ice} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'normal') return <Image src={normal} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'psychic') return <Image src={psychic} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'poison') return <Image src={poison} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'rock') return <Image src={rock} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'steel') return <Image src={steel} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
                if (t === 'water') return <Image src={water} title={stringToUpperCase(t)} w={inventaryPoke ? 5 : 6} h={inventaryPoke ? 5 : 6} ml={1} mb={1}/>
            })}
        </Box>
    )
}

export default Types
