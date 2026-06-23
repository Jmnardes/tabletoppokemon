import { Badge, Center, Image, Text } from "@chakra-ui/react"

import BerriesMini from "@features/items/BerriesMini"
import AugmentElements from "./AugmentElements"
import AugmentBalls from "./AugmentBalls"

import dustIcon from '@assets/images/items/dust.png'
import potionIcon from '@assets/images/items/potion.png'
import tokenIcon from '@assets/images/game/coin.png'
import pokeballIcon from '@assets/images/pokeballs/pokeball.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import gymTicketIcon from '@assets/images/game/gym-ticket.png'

function IconBadge({ icon, title, label }) {
    return (
        <Center flex gap={2} alignItems={"center"}>
            <Image src={icon} title={title} w="20px" />
            <Badge p={2} borderRadius={6} fontSize={"small"}>{label}</Badge>
        </Center>
    )
}

export default function AugmentData({ augment }) {
    let jsx = <></>

    switch (augment.type) {
        case 'elementBonus':
            jsx = <AugmentElements augment={augment} />
            break
        case 'balls':
            jsx = <AugmentBalls balls={augment.data} />
            break
        case 'berry':
            jsx = (
                <Center flex gap={2}>
                    <BerriesMini berries={augment.data} isUsed={false} />
                </Center>
            )
            break
        case 'dustBonus':
            jsx = (
                <Center flex flexDir={"column"} gap={2} alignItems={"center"}>
                    <Center gap={1}>
                        <Text fontSize={"3xs"}>{augment.data?.dust}x</Text>
                        <Image src={dustIcon} title="Dust" w="16px" />
                    </Center>
                    <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} EXP/dust</Badge>
                </Center>
            )
            break
        case 'pokeballBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>{augment.amount * 5}%</Badge>
            break
        case 'potionMaster':
            jsx = <IconBadge icon={potionIcon} title="Potion" label={`+${augment.amount} HP`} />
            break
        case 'tokenEconomy':
            jsx = <IconBadge icon={tokenIcon} title="Token" label={`+${augment.amount}/turn`} />
            break
        case 'pokeballEconomy':
            jsx = <IconBadge icon={pokeballIcon} title="Pokeball" label={`+${augment.amount}/turn`} />
            break
        case 'greatballEconomy':
            jsx = <IconBadge icon={greatballIcon} title="Greatball" label={`+${augment.amount}/turn`} />
            break
        case 'ultraballEconomy':
            jsx = <IconBadge icon={ultraballIcon} title="Ultraball" label={`+${augment.amount}/turn`} />
            break
        case 'gymPass':
            jsx = <IconBadge icon={gymTicketIcon} title="Gym Ticket" label={`+${augment.amount}`} />
            break
        case 'battleRank':
        case 'onDuty':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount}</Badge>
            break
        case 'shinyCharm':
        case 'levelBonus':
        case 'encounterRarity':
        case 'encounterLevel':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>{augment.amount}%</Badge>
            break
        case 'trainerBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} EXP</Badge>
            break
        case 'trackerBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} charge</Badge>
            break
        case 'threatControl':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} decay</Badge>
            break
        case 'seedImprovement':
        case 'newPieces':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} quality</Badge>
            break
        case 'greenHouse':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} plot</Badge>
            break
        case 'oldJunk':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount} machine</Badge>
            break
        case 'greenThumb':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>-{augment.amount} turn</Badge>
            break
        case 'overgrow':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>2x berries</Badge>
            break
        case 'fireUp':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>2x balls</Badge>
            break
        case 'minigameBonus':
        case 'berryDuration':
        case 'tasking':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>+{augment.amount}</Badge>
            break
        default:
            break
    }

    return jsx
}