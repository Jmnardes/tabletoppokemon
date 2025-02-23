import { Badge, Center } from "@chakra-ui/react"

import BerriesMini from "@components/Items/BerriesMini"
import DustMini from "@components/Items/DustMini"
import AugmentElements from "./AugmentElements"
import AugmentBalls from "./AugmentBalls"

export default function AugmentData({ augment }) {
    let jsx = <></>

    switch (augment.type) {
        case 'elementBonus':
            jsx = <AugmentElements augment={augment} />
            break
        case 'pokeballBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus +{augment.amount}</Badge>
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
        case 'challengeRank':
        case 'battleRank':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus {augment.amount}%</Badge>
            break
        case 'bonusDust':
            jsx = <DustMini dusts={augment.amount} absolute={false} />
            break
        case 'onDuty':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus Rank +{augment.amount}</Badge>
            break
        case 'shinyCharm':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus {augment.amount}%</Badge>
            break
        case 'challengeBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus +{augment.amount}</Badge>
            break
        case 'levelBonus':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus {augment.amount}%</Badge>
            break
        case 'encounterRarity':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus {augment.amount}%</Badge>
            break
        case 'encounterLevel':
            jsx = <Badge p={2} borderRadius={6} fontSize={"small"}>Bonus {augment.amount}%</Badge>
            break
        default:
            break
    }

    return jsx
}