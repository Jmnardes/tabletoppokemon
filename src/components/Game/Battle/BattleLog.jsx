import React, { useEffect, useState } from 'react';
import { Box, Center, Divider, Text, keyframes } from '@chakra-ui/react';
import { stringToUpperCase } from '../../../util';


const BattleLog = ({ pokemon, battleLog, turnWinner }) => {
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
            {battleLog && pokemon && (
                <>
                    <Center flexDirection="column">
                        <Text>Battle Log</Text>
                        <Divider mt={4} mb={2} />
                    </Center>
                    {battleLog.map((action, index) => (
                        <Box key={index + pokemon.id}>
                            <Box
                                textAlign={action.attacker.id === pokemon.id ? 'left' : 'right'}
                                py={2}
                                css={{ animation: `${logFadeAnimation} 1s` }}
                            >
                                <Text fontSize={'xs'} fontWeight="bold" color={action.attacker.id === pokemon.id ? 'green.600' : 'yellow.600'}>
                                {/* [ {stringToUpperCase(action.attacker.name)} ] */}
                                {action.attacker.id === pokemon.id ? '>' : ''} {stringToUpperCase(action.attacker.name)} {action.attacker.id === pokemon.id ? '' : '<'}
                                </Text>
                                <Text fontSize={'xs'} color={action.hitType === 'miss' && 'red.500'}>
                                    Attack {hitType[action.hitType]?.text}! 
                                </Text>
                                {action.damage !== 0 && <Text fontSize={'2xs'} color={hitType[action.hitType]?.color}>
                                    {action.damage} damage dealt
                                </Text>}
                                
                            </Box>
                            {action.fainted && (
                                <Box
                                    textAlign={action.attacker.id === pokemon.id ? 'right' : 'left'}
                                    py={2}
                                    css={{ animation: `${logFadeAnimation} 1s` }}
                                >
                                    <Text fontSize={'2xs'} color="red.500">
                                        {stringToUpperCase(action.defender.name)} has fainted!
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
};

export default BattleLog;