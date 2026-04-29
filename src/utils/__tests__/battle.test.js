import { battleLogMessage, colorByHitType } from '../battle'
import * as utils from '..'

beforeEach(() => {
  jest.spyOn(utils, 'diceRoll').mockReturnValue(0)
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('battleLogMessage', () => {
  it('returns a hit message with name and damage', () => {
    const msg = battleLogMessage('hit', 'Pikachu', 45)
    expect(msg).toContain('Pikachu')
    expect(msg).toContain('45')
  })

  it('returns a half message with name and damage', () => {
    const msg = battleLogMessage('half', 'Charmander', 20)
    expect(msg).toContain('Charmander')
    expect(msg).toContain('20')
  })

  it('returns a miss message with name only', () => {
    const msg = battleLogMessage('miss', 'Bulbasaur')
    expect(msg).toContain('Bulbasaur')
    expect(msg).not.toContain('undefined')
  })

  it('returns a crit message with name and damage', () => {
    const msg = battleLogMessage('crit', 'Mewtwo', 100)
    expect(msg).toContain('Mewtwo')
    expect(msg).toContain('100')
  })

  it('returns a default message for unknown types', () => {
    const msg = battleLogMessage('idle', 'Eevee')
    expect(msg).toContain('Eevee')
  })

  it('returns a string for all types', () => {
    const types = ['hit', 'half', 'miss', 'crit', 'unknown']
    types.forEach(type => {
      expect(typeof battleLogMessage(type, 'Test', 10)).toBe('string')
    })
  })
})

describe('colorByHitType', () => {
  it('returns yellow for half hits', () => {
    expect(colorByHitType('half')).toBe('yellow.500')
  })

  it('returns red for misses', () => {
    expect(colorByHitType('miss')).toBe('red.500')
  })

  it('returns green for crits', () => {
    expect(colorByHitType('crit')).toBe('green.500')
  })

  it('returns white for normal hits', () => {
    expect(colorByHitType('hit')).toBe('white')
  })

  it('returns white as default', () => {
    expect(colorByHitType('unknown')).toBe('white')
  })
})
