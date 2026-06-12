import bugImg from '@assets/images/attacks/bug.png'
import darkImg from '@assets/images/attacks/dark.png'
import dragonImg from '@assets/images/attacks/dragon.png'
import electricImg from '@assets/images/attacks/electric.png'
import fairyImg from '@assets/images/attacks/fairy.png'
import fightingImg from '@assets/images/attacks/fighting.png'
import fireImg from '@assets/images/attacks/fire.png'
import flyingImg from '@assets/images/attacks/flying.png'
import ghostImg from '@assets/images/attacks/ghost.png'
import groundImg from '@assets/images/attacks/ground.png'
import iceImg from '@assets/images/attacks/ice.png'
import leafImg from '@assets/images/attacks/leaf.png'
import normalImg from '@assets/images/attacks/normal.png'
import poisonImg from '@assets/images/attacks/poison.png'
import psychicImg from '@assets/images/attacks/psychic.png'
import rockImg from '@assets/images/attacks/rock.png'
import steelImg from '@assets/images/attacks/steel.png'
import waterImg from '@assets/images/attacks/water.png'

const attackSpriteMap = {
    bug: bugImg,
    dark: darkImg,
    dragon: dragonImg,
    electric: electricImg,
    fairy: fairyImg,
    fighting: fightingImg,
    fire: fireImg,
    flying: flyingImg,
    ghost: ghostImg,
    ground: groundImg,
    ice: iceImg,
    grass: leafImg,
    leaf: leafImg,
    normal: normalImg,
    poison: poisonImg,
    psychic: psychicImg,
    rock: rockImg,
    steel: steelImg,
    water: waterImg,
}

export const getAttackSprite = (type) => {
    if (!type) return normalImg
    return attackSpriteMap[type.toLowerCase()] || normalImg
}
