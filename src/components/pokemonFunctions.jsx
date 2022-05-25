import { pokemonNature, baseHpArray } from "../util"

export function highestPokemonStat (stats) {
    let array = [
        stats[0].base_stat,
        stats[1].base_stat,
        stats[2].base_stat,
        stats[3].base_stat,
        stats[4].base_stat,
        stats[5].base_stat,
      ]

    let higher = Math.max(...array)
    higher = array.indexOf(higher)

    if(higher === 3) {
      higher = 1
    } else if(higher === 4){
      higher = 2
    }

    return stats[higher].stat.name
}

export function whatNaturePokemonIs() {
  return pokemonNature[Math.floor(Math.random() * pokemonNature.length)]
}

function hpPerTier(tier) {
  let basePerLvl = [2, 3, 4, 5, 10]
  if (tier <= 2) {
    return basePerLvl[0]
  } else if (tier <= 5) {
    return basePerLvl[1]
  } else if (tier <= 9) {
    return basePerLvl[2]
  } else if (tier <= 10) {
    return basePerLvl[3]
  } else if (tier > 10) {
    return basePerLvl[4]
  }
}

export function pokemonBaseStat (stats, whichStat, nature, shiny) {
    let tier = whatPokemonTierIs(stats)
    let baseAtk = 1
    let baseHp = 3
    let baseCa = 5
    let highestStat = highestPokemonStat(stats)
    let caTierUp = Number(Math.floor(tier/2).toFixed(0))
    
    // leveling up stats based on tier
    baseAtk += tier
    baseCa += caTierUp
    baseHp = baseHpArray[tier]

    // conditions to upgrade stat based on highest pokemon stats
    if (highestStat === 'attack' || highestStat === 'special-attack') {
      baseAtk += 1
    } else if (highestStat === 'hp') {
      baseHp += hpPerTier(tier)
    } else if (highestStat === 'defense' || highestStat === 'special-defense' || highestStat === 'speed') {
      baseCa += 1
    }

    // up nature status
    if (nature.statUp === 'atk') {baseAtk += 1}
    if (nature.statDown === 'atk') {baseAtk -= 1} 
    if (nature.statUp === 'hp') {baseHp += hpPerTier(tier)}
    if (nature.statDown === 'hp') {baseHp -= hpPerTier(tier)} 
    if (nature.statUp === 'ca') {baseCa += 1}
    if (nature.statDown === 'ca') {baseCa -= 1}

    // up shiny status
    if (shiny) {
      let shinySort = Math.floor((Math.random() * 3) + 1)
      if (shinySort === 1) {baseAtk += 1}
      if (shinySort === 2) {baseHp += hpPerTier(tier)}
      if (shinySort === 3) {baseCa += 1}
    }

    if (whichStat === 'atk') {
      return baseAtk < 1 ? 1 : baseAtk
    } else if (whichStat === 'hp') {
      return baseHp < 1 ? 1 : baseHp
    } else if (whichStat === 'ca') {
      return baseCa < 1 ? 1 : baseCa
    }
}

export function whatPokemonTierIs (stats) {
    let tier = ((stats[0].base_stat + 
      stats[1].base_stat + 
      stats[2].base_stat + 
      stats[3].base_stat + 
      stats[4].base_stat + 
      stats[5].base_stat) / 6)

      tier = Math.abs(((tier/4).toFixed(0))-9)
    
      switch (tier) {
        case 0:
        case 1:
          return tier = 0
        case 2:
        case 3:
          return tier = 1
        case 4:
        case 5:
          return tier = 2
        case 6:
        case 7:
          return tier = 3
        case 8:
          return tier = 4
        case 9:
          return tier = 5
        case 10:
          return tier = 6
        case 11:
          return tier = 7
        case 12:
          return tier = 8
        case 13:
          return tier = 9
        case 14:
          return tier = 10
        default:
          return tier = 11
    }
}

export function pokemonTypes(data) {
    let pokemonTypes = ''
    data.types.forEach((types) => {
        if (types.type.name) {
            types.slot === 1 ? (
                pokemonTypes = `${types.type.name}`
            ) : (
                pokemonTypes += ` / ${types.type.name}`
            )
        }
    })
    return pokemonTypes
}
