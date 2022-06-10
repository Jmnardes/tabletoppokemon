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

function PokemonTable({ health, attack, defense, speed, nature, name, tier }) {
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

    useEffect(() => {
        natureFormater(nature)
    }, [])

    return (
        <>
            <Box textAlign="center" display="flex" alignItems="center" mt={2}>
                <Text mr={2} fontSize='xl' fontWeight="bold">{stringToUpperCase(name)}</Text>
                <Tooltip 
                    label={ nature ? formatedNature : null } 
                    fontSize='md'
                >
                    <Text mt={1}><FaInfoCircle size={14}/></Text>
                </Tooltip>
            </Box>
            <Flex mt={2}>
                <Box display="flex" alignItems="center" p={1}>
                    <GiHearts title="Health" color="#d61717" size={24} style={{marginRight: 1}}/>
                    <Text fontWeight="bold">{health}</Text>
                </Box>
                <Box display="flex" alignItems="center" p={1}>
                    <GiBroadsword title="Attack" color="#4b4b4b" size={24} style={{marginRight: 1}}/>
                    <Text fontWeight="bold">{attack}</Text>
                </Box>
                <Box display="flex" alignItems="center" p={1}>
                    <GiShield title="Defense" color="#c8c815" size={24} style={{marginRight: 1}}/>
                    <Text fontWeight="bold">{defense}</Text>
                </Box>
                <Box display="flex" alignItems="center" p={1}>
                    <GiWingfoot title="Speed" color="#874B0F" size={24} style={{marginRight: 1}}/>
                    <Text fontWeight="bold">{speed}</Text>
                </Box>
            </Flex>
        </>
    )
}

export default PokemonTable