/* eslint-disable array-callback-return */
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

import { stringToUpperCase, typeNegatives, typePositives } from "../../../util";
import { FaStar } from "react-icons/fa";

function Types({ types, shiny, tier, color, showingType }) {
    function elementTitle(type) {
        return (
            `${stringToUpperCase(type)}${'\n\n'}+${'\n'}`+
            `${positiveElements(type)}${'\n\n'}-${'\n'}`+
            `${negativeElements(type)}`
        )
    }

    function positiveElements(type) {
        let types = ''

        if(type) {
            type = typePositives(type)
            type.map((t, index, array) => {
                if(index === (array.length - 1)) {
                    types += `${t}`
                } else {
                    types += `${t} / `
                }
            })
        }

        return types
    }

    function negativeElements(type) {
        let types = ''

        if(type) {
            type = typeNegatives(type)
            type.map((t, index, array) => {
                if(index === (array.length - 1)) {
                    types += `${t}`
                } else {
                    types += `${t} / `
                }
            })
        }

        return types
    }

    return (
        <Box 
            display="flex" 
            flexDirection={showingType === 'Team' ? "row" : "column"} 
            w={showingType === 'Team' && "100%"} 
            justifyContent={showingType === 'Team' && "space-between"}
            mt={showingType === 'Team' && 2}
        >
            {(tier || tier === 0) && 
                <Box
                    mb={1}
                    backgroundColor={color}
                    fontWeight="bold"
                    borderRadius="100%"
                    textAlign="center"
                    ml={showingType === 'Team' ? 4 : 1}
                    w={6}
                >
                    { tier }
                </Box>
            }
            {shiny &&
                <Box ml={3/2} mb={1}>{<FaStar title="Shiny" size={20}/>}</Box>
            }
            {types.map(t => {
                if(t !== '') {
                    return <Image 
                        key={t} 
                        src={`../../../assets/images/elements/` + t + `.webp`}
                        title={elementTitle(t)} 
                        w={6} 
                        h={6} 
                        ml={1} 
                        mb={1}
                    />
                }
            })}
        </Box>
    )
}

export default Types



// if (t === 'bug') return <Image 
// key={'bug'} 
// src={bug} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'dark') return <Image 
// key={'dark'} 
// src={dark} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'dragon') return <Image 
// key={'dragon'} 
// src={dragon} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'electric') return <Image 
// key={'electric'} 
// src={electric} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'fairy') return <Image 
// key={'fairy'} 
// src={fairy} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'fighting') return <Image 
// key={'fighting'} 
// src={fighting} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'fire') return <Image 
// key={'fire'} 
// src={fire} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'flying') return <Image 
// key={'flying'} 
// src={flying} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'ghost') return <Image 
// key={'ghost'} 
// src={ghost} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'grass') return <Image 
// key={'grass'} 
// src={grass} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'ground') return <Image 
// key={'ground'} 
// src={ground} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'ice') return <Image 
// key={'ice'} 
// src={ice} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'normal') return <Image 
// key={'normal'} 
// src={normal} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'psychic') return <Image 
// key={'psychic'} 
// src={psychic} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'poison') return <Image 
// key={'poison'} 
// src={poison} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'rock') return <Image 
// key={'rock'} 
// src={rock} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'steel') return <Image 
// key={'steel'} 
// src={steel} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />
// if (t === 'water') return <Image 
// key={'water'} 
// src={water} 
// title={stringToUpperCase(t)} 
// w={6} 
// h={6} 
// ml={1} 
// mb={1}
// />