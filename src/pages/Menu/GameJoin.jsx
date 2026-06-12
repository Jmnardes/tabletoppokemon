import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import socket from "@client";
import { gameConfig, sanitizeInput, validateTrainerName, validateSessionCode } from "@utils/gameConfiguration";

export default function GameJoin() {
    const [trainerName, setTrainerName] = useState('')
    const [sessionCode, setSessionCode] = useState('')
    const { t } = useTranslation()

    const handleTrainerName = (e) => {
        setTrainerName(sanitizeInput(e.target.value))
    }

    const handleSessionCode = (e) => {
        setSessionCode(sanitizeInput(e.target.value).toUpperCase())
    }

    const isFormValid = validateTrainerName(trainerName) && validateSessionCode(sessionCode)

    return (
        <>
            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    {t('menu.chooseName')} 
                </Text>
                <Input textAlign="center" maxLength={gameConfig.trainerName.maxLength} value={trainerName} onChange={handleTrainerName} />
            </Flex>

            <Flex flexDirection="column" m={2} justifyContent="center" alignItems="center">
                <Text mb={2}>
                    {t('menu.roomCode')} 
                </Text>
                <Input textAlign="center" maxLength={gameConfig.trainerName.maxLength} value={sessionCode} onChange={handleSessionCode} />
            </Flex>

            <Button w="100%" h={12} mt={4} mb={4} isDisabled={!isFormValid} onClick={() => {

                socket.emit('session-join', {
                    trainerName,
                    sessionCode
                })

            }}>{t('menu.joinRoom')}</Button>
        </>
    )
}