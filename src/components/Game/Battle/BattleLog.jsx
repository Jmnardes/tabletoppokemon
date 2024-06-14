import React, { useEffect, useState } from 'react';
import { Box, Center, Divider, Text, keyframes } from '@chakra-ui/react';
import { diceRoll, stringToUpperCase } from '../../../util';


const BattleLog = ({ pokemon, battleLog, turnWinner }) => {
    const [logFadeAnimation, setLogFadeAnimation] = useState('')

    const hitMessages = [
        "The attack hit!",
        "The attack was effective!",
        "It's a direct hit!",
        "The attack landed!",
        "It's a clean strike!",
        "The attack connected!"
    ];

    const halfHitMessages = [
        "The attack was not effective...",
        "It's a glancing blow!",
        "The attack partially landed...",
        "It's not as effective as usual...",
        "The attack was weakened...",
        "The attack hit, but not fully..."
    ];
    
    const missMessages = [
        "The attack missed!",
        "The attack failed to connect...",
        "It's a swing and a miss!",
        "The attack went wide...",
        "The attack didn't land...",
        "The attack was dodged..."
    ];
    
    const criticalHitMessages = [
        "It's a critical hit!",
        "An amazing strike!",
        "A devastating hit!",
        "It's super effective!",
        "A powerful blow!",
        "An incredible hit!"
    ];

    const damageMessages = [
        "Dealing {damage} points of damage!",
        "{damage} points of damage dealt!",
        "It caused {damage} points of damage!",
        "The attack inflicted {damage} damage points!",
        "The foe took {damage} points of damage!",
        "It's a hit for {damage} points of damage!"
    ];

    const colorByHitType = (hitType) => {
        switch (hitType) {
            case 'half':
                return 'yellow.500';
            case'miss':
                return'red.500';
            case 'crit':
                return 'green.500';
            case 'hit':
            default:
                return '';
        }
    };

    const rollAttackMessage = (hitType) => {
        const messageRoll = diceRoll(5)

        switch (hitType) {
            case 'half':
                return halfHitMessages[messageRoll];
            case 'miss':
                return missMessages[messageRoll];
            case 'crit':
                return criticalHitMessages[messageRoll];
            case 'hit':
            default:
                return hitMessages[messageRoll];
        }
    }
    
    const rollDamageMessage = (damage) => {
        const damageRoll = diceRoll(5)
        const randomMessage = damageMessages[damageRoll]
        const messageWithDamage = randomMessage.replace('{damage}', damage);

        return messageWithDamage
    }
    
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
        <Box w="100%" p={6} maxH="465px" overflow="hidden" overflowY="auto" backgroundColor="gray.600" borderRadius={6} style={{ scrollbarWidth: 'thin' }}>
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
                                pb={3}
                                css={{ animation: `${logFadeAnimation} ${index + 1}s ease-in` }}
                            >
                                {(index === 0 || index === 1) && (
                                    <Text fontSize={'xs'} mb={2} textDecoration="underline" color={action.attacker.id === pokemon.id ? 'green.600' : 'yellow.600'}>
                                        {stringToUpperCase(action.attacker.name)}
                                    </Text>
                                )}
                                <Text fontSize={'3xs'} fontStyle="italic" color={action.hitType === 'miss' && 'red.500'}>
                                    {rollAttackMessage(action.hitType)}
                                </Text>
                                {action.damage !== 0 && 
                                    <Text fontSize={'3xs'} fontStyle="italic" color={colorByHitType(action.hitType)}>
                                        {rollDamageMessage(action.damage)}
                                    </Text>
                                }
                            </Box>
                            {action.fainted && (
                                <Box
                                    textAlign={action.attacker.id === pokemon.id ? 'right' : 'left'}
                                    py={2}
                                    css={{ animation: `${logFadeAnimation} ${index + 3}s` }}
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