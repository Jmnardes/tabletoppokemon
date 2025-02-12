import { Image } from "@chakra-ui/react"

import { getBerryIcon } from "@utils/berryIcon"
import starIcon from '@assets/images/game/star.png'
import dustIcon from '@assets/images/items/dust.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'

export default function PrizeIcon ({ type, size = '20px', ...props }) {
    console.log(type)
    switch (type) {
        case 'dust':
            return <Image src={dustIcon} w={size} title="Dusts" ml={2} {...props} />
        case 'stars':
            return <Image src={starIcon} w={size} title="Ranking Points" ml={2} {...props} />
        case 'ranking':
            return <Image src={starIcon} w={size} title="Ranking Points" ml={2} {...props} />
        case 'greatball':
            return <Image src={greatballIcon} w={size} title="Great Balls" ml={2} {...props} />
        case 'ultraball':
            return <Image src={ultraballIcon} w={size} title="Ultra Balls" ml={2} {...props} />
        case 'masterball':
            return <Image src={masterballIcon} w={size} title="Master Balls" ml={2} {...props} />
        default:
            return <Image src={getBerryIcon(type)} w={size} title={type} ml={2} {...props} />
    }
}