import { useContext } from "react"
import { Button, Image, Badge, Center, Text, useColorMode } from "@chakra-ui/react"
import PlayerContext from "@Contexts/PlayerContext"
import Element from "@components/Elements/Element"

import gymIcon from '@assets/images/game/battle.png'

// Helper para converter "Fog Badge" -> "fog_badge"
const getBadgeIcon = (badgeName) => {
    if (!badgeName) return gymIcon
    const iconName = badgeName.toLowerCase().replace(/\s+/g, '_')
    try {
        return require(`@assets/images/badges/${iconName}.png`)
    } catch (e) {
        console.warn(`Badge icon not found: ${iconName}.png, using default gym icon`)
        return gymIcon
    }
}

export default function PokeGym() {
    const { gym, nextGym, player, updateGame } = useContext(PlayerContext)
    const { colorMode } = useColorMode()

    const currentTurn = player?.status?.turn || 0

    // Se não tem gym nem nextGym, não mostra o botão
    if (!gym && !nextGym) {
        return null
    }

    // Determina qual gym mostrar e o estado
    const getGymDisplay = () => {
        // Se tem gym (independente do turnStart, se existe é porque está disponível ou ativo)
        if (gym) {
            return {
                isAvailable: true,
                text: `Gym: ${gym.name}`,
                element: gym.element,
                badge: gym.badge,
                leader: gym.leader,
                attempts: gym.attempts
            }
        }

        // Se não tem gym atual mas tem próximo gym
        if (nextGym) {
            const turnsUntil = nextGym.turnStart - currentTurn
            return {
                isAvailable: false,
                text: `Next Gym`,
                subtext: `Turn ${nextGym.turnStart}`,
                element: nextGym.element,
                badge: nextGym.badge,
                turnsUntil
            }
        }

        return null
    }

    const gymDisplay = getGymDisplay()

    if (!gymDisplay) {
        return null
    }

    const handleClick = () => {
        updateGame({ openGymModal: true })
    }

    const badgeIcon = getBadgeIcon(gymDisplay.badge)

    return (
        <Button
            mx={1}
            onClick={handleClick}
            cursor="pointer"
            position="relative"
        >
            <Image
                src={badgeIcon}
                title={gymDisplay.text}
                w="28px"
            />

            {/* Badge com informações adicionais */}
            {gymDisplay.attempts > 0 && gymDisplay.isAvailable && (
                <Badge
                    position="absolute"
                    top="-6px"
                    right="-6px"
                    borderRadius="full"
                    px={2}
                    py={0}
                    fontSize="xx-small"
                    colorScheme="red"
                >
                    {gymDisplay.attempts}
                </Badge>
            )}
        </Button>
    )
}
