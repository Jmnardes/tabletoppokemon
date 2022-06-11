import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";

import { 
    GiWingfoot,
    GiBroadsword,
    GiHearts,
    GiShield
} from "react-icons/gi";
import { FaCaretUp, FaCaretDown, FaInfoCircle } from "react-icons/fa";
import { stringToUpperCase } from "../../../util";
import { useEffect, useState } from "react";

function PokemonTable({ health, attack, defense, speed, nature, name, tier, showingType }) {
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
        <>
            {showingType !== 'roll' &&
                <>
                    <Box textAlign="center" display="flex" alignItems="center">
                        <Text fontSize={showingType === 'inventary' ? "sm" : 'xl'} fontWeight="bold">{stringToUpperCase(name)}</Text>
                        {showingType === 'inventary' &&
                            <Tooltip 
                                label={ nature ? formatedNature : null } 
                                fontSize='md'
                            >
                                <Text ml={1}><FaInfoCircle size={showingType === 'inventary' ? 10 : 20}/></Text>
                            </Tooltip>
                        }
                    </Box>
                    <Flex mt={showingType === 'inventary' ? 0 : 2}>
                        <Box display="flex" alignItems="center" p={1}>
                            <GiHearts title="Health" color="#d61717" size={showingType === 'inventary' ? 14 : 24} style={{marginRight: 1}}/>
                            <Text fontSize={showingType === 'inventary' && "sm"} fontWeight="bold">{health}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" p={1}>
                            <GiBroadsword title="Attack" color="#4b4b4b" size={showingType === 'inventary' ? 14 : 24} style={{marginRight: 1}}/>
                            <Text fontSize={showingType === 'inventary' && "sm"} fontWeight="bold">{attack}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" p={1}>
                            <GiShield title="Defense" color="#c8c815" size={showingType === 'inventary' ? 14 : 24} style={{marginRight: 1}}/>
                            <Text fontSize={showingType === 'inventary' && "sm"} fontWeight="bold">{defense}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" p={1}>
                            <GiWingfoot title="Speed" color="#874B0F" size={showingType === 'inventary' ? 14 : 24} style={{marginRight: 1}}/>
                            <Text fontSize={showingType === 'inventary' && "sm"} fontWeight="bold">{speed}</Text>
                        </Box>
                    </Flex>
                </>
            }
        </>
    )
}

export default PokemonTable