import { useEffect, useState } from "react";
import { Box, Flex, Image, Text, Tooltip } from "@chakra-ui/react";

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
import { FaStar, FaInfoCircle, FaCaretUp, FaCaretDown } from "react-icons/fa";

function Types({ types, inventaryPoke, shiny, tier, nature, showingType }) {
    const [formatedNature, setFormatedNature] = useState('')

    const natureFormater = (data) => {
        setFormatedNature(() => {
            return (
                <>
                    <Text fontSize='sm' textAlign="center">{tier} - {data.nature}</Text>
                    <Flex alignItems="center" justifyContent="center">
                        <Text color="green">{data.statUp ? data.statUp : ''}</Text>
                        {data.statUp && (
                            <>
                                <FaCaretUp/>
                                {data.statDown ? ' | ' : ''}
                            </>
                        )}
                        {data.statDown && <FaCaretDown/>}
                        <Text color="red">{data.statDown ? data.statDown : ''}</Text>
                    </Flex>
                </>
            )
        })
    }

    /* eslint-disable */
    useEffect(() => {
        natureFormater(nature)
    }, [])

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
            {showingType !== 'inventary' &&
                <Tooltip 
                label={ nature ? formatedNature : null } 
                fontSize='md'
                >
                    <Text ml={3/2} mb={1}><FaInfoCircle size={20}/></Text>
                </Tooltip>
            }
            <Box ml={3/2}>{ shiny && <FaStar title="Shiny" color='#F3F313' size={20}/>}</Box>
        </Box>
    )
}

export default Types
