import { Badge, Center } from "@chakra-ui/react"

import BerriesMini from "@features/items/BerriesMini"
import DustMini from "@features/items/DustMini"
import AugmentElements from "./AugmentElements"
import AugmentBalls from "./AugmentBalls"

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
        case 'bonusDust':
            jsx = <DustMini dusts={augment.amount} absolute={false} />
            break
        case 'pokeballBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>{augment.amount * 5}%</Badge>
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