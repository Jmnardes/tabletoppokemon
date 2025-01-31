import { Image } from "@chakra-ui/react"

import starIcon from '@assets/images/game/star.png'
import dustIcon from '@assets/images/items/dust.png'

export default function PrizeIcon ({ type, size = '20px' }) {
    switch (type) {
        case 'dust':
            return <Image src={dustIcon} w={size} title="Dusts" ml={2} />
        case 'stars':
            return <Image src={starIcon} w={size} title="Ranking Points" ml={2} />
        default:
            return <Image src={starIcon} w={size} title="Ranking Points" ml={2} />
    }
}