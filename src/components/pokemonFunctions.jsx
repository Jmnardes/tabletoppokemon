import { pokemonNature, baseHpArray, diceRoll } from "../util"

export function highestPokemonStat (stats) {
    let array = [ stats[0].stat, stats[1].stat, stats[2].stat, stats[3].stat, stats[4].stat, stats[5].stat ]
    let higher = Math.max(...array)
    
    higher = array.indexOf(higher)

    if(higher === 3) {
      higher = 1
    } else if(higher === 4){
      higher = 2
    }

    return stats[higher].name
}

export function lowestPokemonStat (stats) {
  let array = [ stats[0].stat, stats[1].stat, stats[2].stat, stats[3].stat, stats[4].stat, stats[5].stat ]
  let lower = Math.min(...array)

  lower = array.indexOf(lower)

  if(lower === 3) {
    lower = 1
  } else if(lower === 4){
    lower = 2
  }

  return stats[lower].name
}

export function whatNaturePokemonIs() {
  let roll = diceRoll(pokemonNature.length)
  return pokemonNature[roll]
}

function hpPerTier(tier) {
  let basePerLvl = [2, 3, 4, 5, 6]
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
    // if(!stats || !whichStat || !nature || !shiny) return 0
    let tier = whatPokemonTierIs(stats)
    let baseAtk = 3
    let baseHp = 5
    let baseDef = 5
    let baseSpd = 5
    let highestStat = highestPokemonStat(stats)
    let lowestStat = lowestPokemonStat(stats)
    let defTierUp = Number(Math.floor(tier/2).toFixed(0))
    
    // leveling up stats based on tier
    baseAtk += tier
    baseDef += defTierUp
    baseHp = baseHpArray[tier]
    baseSpd += tier

    // conditions to upgrade stat based on highest pokemon stats
    if (highestStat === 'attack' || highestStat === 'special-attack') {
      baseAtk += 1
    } else if (highestStat === 'hp') {
      baseHp += hpPerTier(tier)
    } else if (highestStat === 'defense' || highestStat === 'special-defense') {
      baseDef += 1
    } else if (highestStat === 'speed') {
      baseSpd += 1
    }

    // conditions to downgrade stat based on highest pokemon stats
    if (lowestStat === 'attack' || lowestStat === 'special-attack') {
      baseAtk -= 1
    } else if (lowestStat === 'hp') {
      baseHp -= hpPerTier(tier)
    } else if (lowestStat === 'defense' || lowestStat === 'special-defense') {
      baseDef -= 1
    } else if (lowestStat === 'speed') {
      baseSpd -= 1
    }

    // up nature status
    if (nature?.statUp === 'atk') {baseAtk += 1}
    if (nature?.statDown === 'atk') {baseAtk -= 1} 
    if (nature?.statUp === 'hp') {baseHp += hpPerTier(tier)}
    if (nature?.statDown === 'hp') {baseHp -= hpPerTier(tier)} 
    if (nature?.statUp === 'def') {baseDef += 1}
    if (nature?.statDown === 'def') {baseDef -= 1}
    if (nature?.statUp === 'spd') {baseSpd += 1}
    if (nature?.statDown === 'spd') {baseSpd -= 1}

    // up shiny status
    if (shiny?.shiny) {
      if (shiny.stat[0] === 'atk' || shiny.stat[1] === 'atk') {baseAtk += 1}
      if (shiny.stat[0] === 'hp' || shiny.stat[1] === 'hp') {baseHp += hpPerTier(tier)}
      if (shiny.stat[0] === 'def' || shiny.stat[1] === 'def') {baseDef += 1}
      if (shiny.stat[0] === 'spd' || shiny.stat[1] === 'spd') {baseSpd += 1}
    }

    if (whichStat === 'atk') {
      return baseAtk < 1 ? 1 : baseAtk
    } else if (whichStat === 'hp') {
      return baseHp < 1 ? 1 : baseHp
    } else if (whichStat === 'def') {
      return baseDef < 1 ? 1 : baseDef
    } else if (whichStat === 'spd') {
      return baseSpd <= -1 ? 0 : baseSpd
    }
}

export function whatPokemonTierIs (stats) {
  let tier = ((stats[0].stat + 
  stats[1].stat + 
  stats[2].stat + 
  stats[3].stat + 
  stats[4].stat + 
  stats[5].stat) / 6)

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

// roll shiny pokemon
export function shinyRoll(number){
  let shinyRoll = diceRoll(100)
  let shinyStatusRoll = diceRoll(6)

  if (shinyRoll < number) {
    shinyRoll = true
  } else {
    shinyRoll = false
  }

  return {shiny: shinyRoll, stat: shinyStatusUp[shinyStatusRoll]}
}

// shiny status
const shinyStatusUp = [
  ['atk', 'def'],
  ['atk', 'hp'],
  ['atk', 'spd'],
  ['def', 'hp'],
  ['def', 'spd'],
  ['hp', 'spd'],
]

export const catchDifficulty = (tier, difficulty = 0) => {
  switch (tier) {
    case 0:
      return tier = 2 + difficulty
    case 1:
      return tier = 3 + difficulty
    case 2:
      return tier = 4 + difficulty
    case 3:
      return tier = 5 + difficulty
    case 4:
      return tier = 6 + difficulty
    case 5:
      return tier = 7 + difficulty
    case 6:
      return tier = 9 + difficulty
    case 7:
      return tier = 11 + difficulty
    case 8:
      return tier = 13 + difficulty
    case 9:
      return tier = 15 + difficulty
    case 10:
      return tier = 17 + difficulty
    default:
      return tier = 19 + difficulty
  }
}

export const endTurnExp = () => {
  return 1
}

export const catchExp = (tier) => {
  if(tier === 0 || tier === 1) return 1
  if(tier === 2 || tier === 3) return 2
  if(tier === 4 || tier === 5) return 3
  if(tier === 6) return 4
  if(tier === 7) return 5
  if(tier === 8) return 6
  if(tier === 9) return 7
  if(tier === 10) return 10
  if(tier === 11) return 15
}

export const experiencePerLevel = (exp) => {
  if(exp < expToNextLevel(1)) return 0
  if(exp < expToNextLevel(2)) return 1
  if(exp < expToNextLevel(3)) return 2
  if(exp < expToNextLevel(4)) return 3
  if(exp < expToNextLevel(5)) return 4
  if(exp < expToNextLevel(6)) return 5
  if(exp < expToNextLevel(7)) return 6
  if(exp < expToNextLevel(8)) return 7
  if(exp < expToNextLevel(9)) return 8
  if(exp < expToNextLevel(10)) return 9
  if(exp >= expToNextLevel(10)) return 10
}

export const expToNextLevel = (level) => {
  switch(level) {
    case 0:
      return 0
    case 1:
      return 9
    case 2:
      return 18
    case 3:
      return 30
    case 4:
      return 42
    case 5:
      return 57
    case 6:
      return 73
    case 7:
      return 105
    case 8:
      return 148
    case 9:
      return 225
    case 10:
      return 300
    default:
      return 1000
  }
}

// export function pokemonTypes(types) {
//     let pokemonTypes = ''
//     types.forEach((type, index) => {
//       if ( index === 0 ) {
//         pokemonTypes = stringToUpperCase(type)
//       } else {
//         pokemonTypes = pokemonTypes + ' / ' + stringToUpperCase(type)
//       }
//     })
//     return pokemonTypes
// }
