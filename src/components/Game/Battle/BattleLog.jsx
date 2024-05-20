import React, { useEffect, useState } from 'react';
import { Box, Text, keyframes } from '@chakra-ui/react';
import { stringToUpperCase } from '../../../util';


const BattleLog = ({ log, pokemon }) => {
    const [logFadeAnimation, setLogFadeAnimation] = useState('')

    const hitType = {
        hit: {
            text: 'hit',
            color: '',
        },
        half: {
            text: 'has been halved',
            color: 'yellow.500',
        },
        miss: {
            text: 'missed',
            color: 'red.500',
        },
        crit: {
            text: 'critically hit',
            color: 'green.500',
        },
    };
    //{ hitType: 'hit', attacker: '' , defender: '' },
    
    const fadeIn = keyframes`
        0% { opacity: 0; }
        100% { opacity: 1; }
    `;

    const handleLogFadeAnimation = () => {
        setLogFadeAnimation(fadeIn);
    };

    useEffect(() => {
        handleLogFadeAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box w="100%" p={4}>
            {pokemon && log.map((action, index) => (
                <>
                    <Box
                        key={index}
                        textAlign={action.attacker === pokemon.name ? 'left' : 'right'}
                        bgColor={action.attacker === pokemon.name ? 'gray.700' : 'gray.600'}
                        rounded={action.attacker === pokemon.name && 'md'}
                        p={2}
                        overflow={'auto'}
                        css={{ animation: `${logFadeAnimation} 1s` }}
                    >
                        <Text fontSize={'2xs'} color={hitType[action.hitType]?.color}>
                            {action.attacker === pokemon.name ? 
                                stringToUpperCase(pokemon.name) : 
                                stringToUpperCase(action.defender)
                            }'s attack {hitType[action.hitType]?.text}!
                        </Text>
                    </Box>
                </>
            ))}
        </Box>
    );
};

export default BattleLog;