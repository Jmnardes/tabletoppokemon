import { catchDifficulty, pokemonTypes, isTeamThisRank } from '../pokemonFunctions'
import {
  stringToUpperCase,
  typeColor,
  rarityName,
  pokemonHasShieldBerry,
  berryExistsInBerries,
  joinArr,
  fmt,
} from '../index'

/**
 * Null Safety Tests
 *
 * Documents which functions crash with null/undefined inputs and which handle them gracefully.
 * Functions that REQUIRE valid data (no null guard) are marked as such — the caller
 * is responsible for validation before invoking them.
 */

describe('null safety: catchDifficulty', () => {
  const validSession = { gameDifficulty: 0, turns: 5 }
  const validPoke = { level: 5, rarity: 2, types: ['fire'] }
  const validTeam = [{ level: 5, rarity: { rarity: 2 } }]
  const validPlayer = { catchBonus: { elements: [] } }

  it('REQUIRES player.catchBonus.elements — crashes without it', () => {
    expect(() => {
      catchDifficulty(validSession, validPoke, validTeam, { catchBonus: {} })
    }).toThrow()
  })

  it('REQUIRES player.catchBonus — crashes without it', () => {
    expect(() => {
      catchDifficulty(validSession, validPoke, validTeam, {})
    }).toThrow()
  })

  it('handles empty team by returning 0 (NaN falls through to default)', () => {
    const result = catchDifficulty(validSession, validPoke, [], validPlayer)
    // NaN from division by 0 is falsy, so ternary returns 0
    expect(result).toBe(0)
  })

  it('REQUIRES team to exist — crashes with null', () => {
    expect(() => {
      catchDifficulty(validSession, validPoke, null, validPlayer)
    }).toThrow()
  })

  it('REQUIRES poke.types to be an array — crashes with undefined', () => {
    expect(() => {
      catchDifficulty(validSession, { level: 5, rarity: 2, types: undefined }, validTeam, validPlayer)
    }).toThrow()
  })

  it('handles empty catchBonus.elements gracefully', () => {
    const result = catchDifficulty(validSession, validPoke, validTeam, validPlayer)
    expect(typeof result).toBe('number')
    expect(Number.isFinite(result)).toBe(true)
  })
})

describe('null safety: pokemonTypes', () => {
  it('REQUIRES types to be an array — crashes with undefined', () => {
    expect(() => pokemonTypes(undefined)).toThrow()
  })

  it('REQUIRES types to be an array — crashes with null', () => {
    expect(() => pokemonTypes(null)).toThrow()
  })

  it('handles empty array gracefully (returns empty string)', () => {
    expect(pokemonTypes([])).toBe('')
  })
})

describe('null safety: isTeamThisRank', () => {
  it('handles null team gracefully', () => {
    expect(isTeamThisRank(null, 2)).toBe(false)
  })

  it('handles undefined team gracefully', () => {
    expect(isTeamThisRank(undefined, 2)).toBe(false)
  })

  it('handles empty team gracefully (every returns true for empty)', () => {
    expect(isTeamThisRank([], 2)).toBe(true)
  })

  it('REQUIRES pokemon to have rarity.rarity — crashes if missing', () => {
    expect(() => {
      isTeamThisRank([{ rarity: null }], 2)
    }).toThrow()
  })
})

describe('null safety: stringToUpperCase', () => {
  it('REQUIRES string input — crashes with undefined', () => {
    expect(() => stringToUpperCase(undefined)).toThrow()
  })

  it('REQUIRES string input — crashes with null', () => {
    expect(() => stringToUpperCase(null)).toThrow()
  })

  it('handles empty string gracefully', () => {
    expect(stringToUpperCase('')).toBe('')
  })
})

describe('null safety: typeColor', () => {
  it('REQUIRES types to be an array — crashes with undefined', () => {
    expect(() => typeColor(undefined)).toThrow()
  })

  it('handles empty array gracefully (returns default color)', () => {
    const result = typeColor([])
    expect(result).toBe('#000000')
  })

  it('handles unknown type gracefully (returns default)', () => {
    const result = typeColor(['unknown_type'])
    expect(result).toBe('#000000')
  })
})

describe('null safety: rarityName', () => {
  it('returns undefined for out-of-range rarity', () => {
    expect(rarityName(4)).toBeUndefined()
    expect(rarityName(-1)).toBeUndefined()
  })

  it('returns undefined for null/undefined input', () => {
    expect(rarityName(undefined)).toBeUndefined()
    expect(rarityName(null)).toBeUndefined()
  })
})

describe('null safety: pokemonHasShieldBerry', () => {
  it('REQUIRES pokemon.effects to be an array — crashes with undefined', () => {
    expect(() => pokemonHasShieldBerry({ effects: undefined })).toThrow()
  })

  it('REQUIRES pokemon.effects to be an array — crashes with null', () => {
    expect(() => pokemonHasShieldBerry({ effects: null })).toThrow()
  })

  it('handles empty effects array gracefully', () => {
    expect(pokemonHasShieldBerry({ effects: [] })).toBe(false)
  })
})

describe('null safety: berryExistsInBerries', () => {
  it('handles null berries gracefully', () => {
    expect(berryExistsInBerries({ berries: null, berryType: 'oran_berry' })).toBeFalsy()
  })

  it('handles undefined berries gracefully', () => {
    expect(berryExistsInBerries({ berries: undefined, berryType: 'oran_berry' })).toBeFalsy()
  })

  it('handles empty berries array gracefully', () => {
    expect(berryExistsInBerries({ berries: [], berryType: 'oran_berry' })).toBe(false)
  })
})

describe('null safety: joinArr', () => {
  it('handles undefined gracefully', () => {
    expect(joinArr(undefined)).toBeUndefined()
  })

  it('handles null gracefully', () => {
    expect(joinArr(null)).toBeFalsy()
  })

  it('handles array with null elements', () => {
    expect(joinArr([null, 'fire'])).toBe(', fire')
  })

  it('handles empty array gracefully', () => {
    expect(joinArr([])).toBe('')
  })
})

describe('null safety: fmt', () => {
  it('handles null gracefully', () => {
    expect(fmt(null)).toBe('0')
  })

  it('handles undefined gracefully', () => {
    expect(fmt(undefined)).toBe('0')
  })

  it('handles 0 correctly', () => {
    expect(fmt(0)).toBe('0')
  })
})
