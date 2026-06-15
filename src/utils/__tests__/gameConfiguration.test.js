import { gameConfig, getDefaultGameConfig, validateTrainerName } from '../gameConfiguration'

describe('gameConfig', () => {
  it('has valid trainerName config', () => {
    expect(gameConfig.trainerName.minLength).toBe(3)
    expect(gameConfig.trainerName.maxLength).toBe(14)
  })

  it('has valid badgesToWin range', () => {
    expect(gameConfig.badgesToWin.min).toBe(2)
    expect(gameConfig.badgesToWin.max).toBe(10)
    expect(gameConfig.badgesToWin.default).toBe(3)
  })

  it('has valid journeyTeamLength range', () => {
    expect(gameConfig.journeyTeamLength.min).toBe(2)
    expect(gameConfig.journeyTeamLength.max).toBe(6)
    expect(gameConfig.journeyTeamLength.default).toBe(3)
  })

  it('has 4 catch difficulty options', () => {
    expect(gameConfig.catchDifficulty.options).toHaveLength(4)
    expect(gameConfig.catchDifficulty.options[0].label).toBe('Trainer')
    expect(gameConfig.catchDifficulty.options[3].label).toBe('Elite')
  })

  it('has valid generation range', () => {
    expect(gameConfig.generation.min).toBe(1)
    expect(gameConfig.generation.max).toBe(8)
  })

  it('defaults have valid values within their ranges', () => {
    expect(gameConfig.badgesToWin.default).toBeGreaterThanOrEqual(gameConfig.badgesToWin.min)
    expect(gameConfig.badgesToWin.default).toBeLessThanOrEqual(gameConfig.badgesToWin.max)
    expect(gameConfig.journeyTeamLength.default).toBeGreaterThanOrEqual(gameConfig.journeyTeamLength.min)
    expect(gameConfig.journeyTeamLength.default).toBeLessThanOrEqual(gameConfig.journeyTeamLength.max)
    expect(gameConfig.gymStrengthBonus.default).toBeGreaterThanOrEqual(gameConfig.gymStrengthBonus.min)
    expect(gameConfig.gymStrengthBonus.default).toBeLessThanOrEqual(gameConfig.gymStrengthBonus.max)
  })
})

describe('getDefaultGameConfig', () => {
  it('returns an object with all default values', () => {
    const defaults = getDefaultGameConfig()
    expect(defaults.trainerName).toBe('')
    expect(defaults.badgesToWin).toBe(3)
    expect(defaults.stagesPerJourney).toBe(5)
    expect(defaults.battleFrequency).toBe(3)
    expect(defaults.gymStrengthBonus).toBe(0)
    expect(defaults.shinyChance).toBe(1)
    expect(defaults.catchDifficulty).toBe(0)
    expect(defaults.generation).toBe(8)
    expect(defaults.mixedGroups).toBe(true)
    expect(defaults.journeyTeamLength).toBe(3)
  })

  it('returns a new object each time', () => {
    const a = getDefaultGameConfig()
    const b = getDefaultGameConfig()
    expect(a).not.toBe(b)
    expect(a).toEqual(b)
  })
})

describe('validateTrainerName', () => {
  it('rejects names shorter than min length', () => {
    expect(validateTrainerName('ab')).toBe(false)
    expect(validateTrainerName('')).toBe(false)
  })

  it('accepts names within valid range', () => {
    expect(validateTrainerName('Ash')).toBe(true)
    expect(validateTrainerName('Ash Ketchum')).toBe(true)
  })

  it('accepts names at exact boundaries', () => {
    expect(validateTrainerName('Ash')).toBe(true)
    expect(validateTrainerName('A'.repeat(14))).toBe(true)
  })

  it('rejects names longer than max length', () => {
    expect(validateTrainerName('A'.repeat(15))).toBe(false)
  })
})
