import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import socket from "@client";

export default function GameJoin() {
    const [trainerName, setTrainerName] = useState('')
    const [sessionCode, setSessionCode] = useState('')
    const { t } = useTranslation()

    return (
        <>
            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    {t('menu.chooseName')} 
                </Text>
                <Input textAlign="center" maxLength={14} onChange={(e) => {setTrainerName(e.target.value)}} />
            </Flex>

            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    {t('menu.roomCode')} 
                </Text>
                <Input textAlign="center" maxLength={14} onChange={(e) => {setSessionCode(e.target.value)}} />
            </Flex>

            <Button w="100%" h={12} mt={4} mb={4} isDisabled={trainerName.length < 3} onClick={() => {

                socket.emit('session-join', {
                    trainerName,
                    sessionCode
                })

            }}>{t('menu.joinRoom')}</Button>
        </>
    )
}