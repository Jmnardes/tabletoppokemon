import { stringToUpperCase } from "."

export const catchDifficulty = (session, poke, team) => {
  const { gameDifficulty, turns } = session
  const { level, rarity } = poke

  if (turns === 1) {
    return 0
  }

  const initialDifficulty = 4
  const turnVarianceDifficulty = Math.floor((level - 1) / 10)

  const teamPokemonStrength = team.reduce((acc, curr) => acc + curr.level + curr.rarity.rarity, 0)
  const teamPokemonStrengthMean = Math.ceil(teamPokemonStrength / team.length)
  const wildPokemonStrength = gameDifficulty + (rarity * 2) + level
  const battleDifficulty = wildPokemonStrength - teamPokemonStrengthMean

  return initialDifficulty + battleDifficulty + turnVarianceDifficulty
}

export const endTurnExp = () => {
  return 1
}

// export const catchExp = (tier) => {
//   if(tier === 0 || tier === 1) return 1
//   if(tier === 2 || tier === 3) return 2
//   if(tier === 4 || tier === 5) return 3
//   if(tier === 6) return 4
//   if(tier === 7) return 5
//   if(tier === 8) return 6
//   if(tier === 9) return 7
//   if(tier === 10) return 10
//   if(tier === 11) return 15
// }

// export const experiencePerLevel = (exp) => {
//   if(exp < expToNextLevel(1)) return 0
//   if(exp < expToNextLevel(2)) return 1
//   if(exp < expToNextLevel(3)) return 2
//   if(exp < expToNextLevel(4)) return 3
//   if(exp < expToNextLevel(5)) return 4
//   if(exp < expToNextLevel(6)) return 5
//   if(exp < expToNextLevel(7)) return 6
//   if(exp < expToNextLevel(8)) return 7
//   if(exp < expToNextLevel(9)) return 8
//   if(exp < expToNextLevel(10)) return 9
//   if(exp >= expToNextLevel(10)) return 10
// }

// export const expToNextLevel = (level) => {
//   switch(level) {
//     case 0:
//       return 0
//     case 1:
//       return 9
//     case 2:
//       return 18
//     case 3:
//       return 30
//     case 4:
//       return 42
//     case 5:
//       return 57
//     case 6:
//       return 73
//     case 7:
//       return 105
//     case 8:
//       return 148
//     case 9:
//       return 225
//     case 10:
//       return 300
//     default:
//       return 1000
//   }
// }

export function pokemonTypes(types) {
    let pokemonTypes = ''
    types.forEach((type, index) => {
      if ( index === 0 ) {
        pokemonTypes = stringToUpperCase(type)
      } else {
        pokemonTypes = pokemonTypes + ' / ' + stringToUpperCase(type)
      }
    })
    return pokemonTypes
}

export function isTeamThisRank(team, rank) {
  if (team) {
    return team.every(poke => poke.rarity.rarity === rank);
  }

  return false
}