import { catchDifficulty, endTurnExp, pokemonTypes, isTeamThisRank } from '../pokemonFunctions'

describe('catchDifficulty', () => {
  const baseSession = { gameDifficulty: 0, turns: 5 }
  const basePoke = { level: 5, rarity: 2, types: ['fire'] }
  const baseTeam = [
    { level: 5, rarity: { rarity: 2 } },
    { level: 5, rarity: { rarity: 2 } },
  ]
  const basePlayer = { catchBonus: { elements: [] } }

  it('returns 0 on turn 0 (starters)', () => {
    const session = { ...baseSession, turns: 0 }
    expect(catchDifficulty(session, basePoke, baseTeam, basePlayer)).toBe(0)
  })

  it('returns positive difficulty for normal encounter', () => {
    const result = catchDifficulty(baseSession, basePoke, baseTeam, basePlayer)
    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThanOrEqual(0)
  })

  it('increases difficulty with higher game difficulty', () => {
    const easySession = { ...baseSession, gameDifficulty: 0 }
    const hardSession = { ...baseSession, gameDifficulty: 3 }
    const easy = catchDifficulty(easySession, basePoke, baseTeam, basePlayer)
    const hard = catchDifficulty(hardSession, basePoke, baseTeam, basePlayer)
    expect(hard).toBeGreaterThan(easy)
  })

  it('increases difficulty with higher rarity', () => {
    const lowRarity = { ...basePoke, rarity: 1 }
    const highRarity = { ...basePoke, rarity: 5 }
    const low = catchDifficulty(baseSession, lowRarity, baseTeam, basePlayer)
    const high = catchDifficulty(baseSession, highRarity, baseTeam, basePlayer)
    expect(high).toBeGreaterThan(low)
  })

  it('reduces difficulty with element catch bonus', () => {
    const playerWithBonus = {
      catchBonus: { elements: [{ type: 'fire', bonus: 3 }] },
    }
    const withBonus = catchDifficulty(baseSession, basePoke, baseTeam, playerWithBonus)
    const without = catchDifficulty(baseSession, basePoke, baseTeam, basePlayer)
    expect(withBonus).toBeLessThan(without)
  })

  it('reduces difficulty with stronger team', () => {
    const strongTeam = [
      { level: 10, rarity: { rarity: 5 } },
      { level: 10, rarity: { rarity: 5 } },
    ]
    const strong = catchDifficulty(baseSession, basePoke, strongTeam, basePlayer)
    const weak = catchDifficulty(baseSession, basePoke, baseTeam, basePlayer)
    expect(strong).toBeLessThan(weak)
  })
})

describe('endTurnExp', () => {
  it('returns 1', () => {
    expect(endTurnExp()).toBe(1)
  })
})

describe('pokemonTypes', () => {
  it('formats single type', () => {
    expect(pokemonTypes(['fire'])).toBe('Fire')
  })

  it('formats dual types with separator', () => {
    expect(pokemonTypes(['fire', 'flying'])).toBe('Fire / Flying')
  })

  it('capitalizes type names', () => {
    expect(pokemonTypes(['grass', 'poison'])).toBe('Grass / Poison')
  })
})

describe('isTeamThisRank', () => {
  it('returns true when all pokemon have the same rank', () => {
    const team = [
      { rarity: { rarity: 3 } },
      { rarity: { rarity: 3 } },
      { rarity: { rarity: 3 } },
    ]
    expect(isTeamThisRank(team, 3)).toBe(true)
  })

  it('returns false when pokemon have different ranks', () => {
    const team = [
      { rarity: { rarity: 3 } },
      { rarity: { rarity: 2 } },
    ]
    expect(isTeamThisRank(team, 3)).toBe(false)
  })

  it('returns false when team is null/undefined', () => {
    expect(isTeamThisRank(null, 3)).toBe(false)
    expect(isTeamThisRank(undefined, 3)).toBe(false)
  })
})
