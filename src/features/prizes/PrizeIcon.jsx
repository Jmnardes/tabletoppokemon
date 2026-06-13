import { Image } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { getBerryIcon } from "@utils/berryIcon"
import dustIcon from '@assets/images/items/dust.png'
import greatballIcon from '@assets/images/pokeballs/greatball.png'
import ultraballIcon from '@assets/images/pokeballs/ultraball.png'
import masterballIcon from '@assets/images/pokeballs/masterball.png'
import pokeboxIcon from '@assets/images/box/pokebox-closed.png'
import greatboxIcon from '@assets/images/box/greatbox-closed.png'
import ultraboxIcon from '@assets/images/box/ultrabox-closed.png'

const BOX_ICONS = { pokebox: pokeboxIcon, greatbox: greatboxIcon, ultrabox: ultraboxIcon }

export default function PrizeIcon ({ type, size = '20px', ...props }) {
    const { t } = useTranslation()
    switch (type) {
        case 'dust':
            return <Image src={dustIcon} w={size} title={t('items.dusts')} ml={2} {...props} />
        case 'pokebox':
        case 'greatbox':
        case 'ultrabox':
            return <Image src={BOX_ICONS[type]} w={size} title={t(`box.${type}`)} ml={2} {...props} />
        case 'greatball':
            return <Image src={greatballIcon} w={size} title={t('items.greatBalls')} ml={2} {...props} />
        case 'ultraball':
            return <Image src={ultraballIcon} w={size} title={t('items.ultraBalls')} ml={2} {...props} />
        case 'masterball':
            return <Image src={masterballIcon} w={size} title={t('items.masterBalls')} ml={2} {...props} />
        default:
            return <Image src={getBerryIcon(type)} w={size} title={type} ml={2} {...props} />
    }
}