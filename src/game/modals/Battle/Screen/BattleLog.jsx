import React from 'react';
import { Box, Center, Divider, Text } from '@chakra-ui/react';
import { stringToUpperCase } from '@utils';
import { colorByHitType } from '@utils/battle';

const BattleLog = ({ logMessages }) => {
    return (
        <>
            {logMessages.length > 0 && (
                <Box w="100%" p={6} maxH="465px" overflow="hidden" overflowY="auto" backgroundColor="gray.600" borderRadius={6} style={{ scrollbarWidth: 'thin' }}>
                    <>
                        <Center flexDirection="column">
                            <Text>Battle Log</Text>
                            <Divider mt={4} mb={2} />
                        </Center>
                        {logMessages.map((log, index) => (
                            <Box key={index}>
                                <Box
                                    textAlign={log.myPoke ? 'left' : 'right'}
                                    pb={3}
                                >
                                    {(index === 0 || index === 1) && (
                                        <Text fontSize={'xs'} mb={2} textDecoration="underline" color={log.myPoke ? 'green.600' : 'yellow.600'}>
                                            {stringToUpperCase(log.attacker)}
                                        </Text>
                                    )}
                                    <Text fontSize={'2xs'} fontStyle="italic" color={colorByHitType(log.hitType)}>
                                        {log.message}
                                    </Text>
                                </Box>
                                {log.fainted && (
                                    <Box
                                        textAlign={log.myPoke ? 'right' : 'left'}
                                        py={2}
                                    >
                                        <Text fontSize={'xs'} color="red.500">
                                            {stringToUpperCase(log.defender)} has fainted!
                                        </Text>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </>
                </Box>
            )}
        </>
    );
};

export default BattleLog;