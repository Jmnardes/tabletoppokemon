import { pokemonTypes, isTeamThisRank } from '../../utils/pokemonFunctions'
import { pokemonHasShieldBerry } from '../../utils'

// ============================================================
// CONTRACT CONSTANTS — Must be identical in poketactics-server
// File: src/factories/__tests__/pokemonFactory.contract.test.js
// ============================================================

const POKEMON_CONTRACT_FIELDS = [
  'id',
  'entry',
  'name',
  'tier',
  'level',
  'nature',
  'shiny',
  'sprites',
  'stats',
  'baseStats',
  'types',
  'moves',
  'dust',
  'exp',
  'lastTierStats',
  'berries',
  'effects',
  'resistences',
  'rarity',
]

const POKEMON_STATS_CONTRACT_FIELDS = [
  'hp',
  'atk',
  'def',
  'acc',
]

const POKEMON_RARITY_CONTRACT_FIELDS = [
  'rarity',
  'stats',
]

const POKEMON_SPRITES_CONTRACT_FIELDS = [
  'front',
  'back',
  'main',
  'mini',
]

// ============================================================
// CONTRACT CONSTANTS — Must be identical in poketactics-server
// File: src/factories/__tests__/simplifiedPokemonFactory.contract.test.js
// ============================================================

const SIMPLIFIED_POKEMON_CONTRACT_FIELDS = [
  'id',
  'entry',
  'name',
  'types',
  'rarity',
  'sprite',
  'tier',
  'level',
]

// ============================================================

/**
 * Creates a mock full pokemon following the contract.
 */
const createMockPokemon = (overrides = {}) => {
  return {
    id: 'poke-1',
    entry: 25,
    name: 'pikachu',
    tier: 1,
    level: 1,
    nature: 'hardy',
    shiny: false,
    sprites: { front: 'f.png', back: 'b.png', main: 'm.png', mini: 'mini.png' },
    stats: { hp: 12, atk: 3, def: 2, acc: 2 },
    baseStats: { hp: 2, atk: 3, def: 2, acc: 2, evs: 0, crt: 0 },
    types: ['electric'],
    moves: [],
    dust: 0,
    exp: 0,
    lastTierStats: null,
    berries: [],
    effects: [],
    resistences: [],
    rarity: { rarity: 0, stats: [] },
    ...overrides,
  }
}

describe('pokemon contract (front-side mirror)', () => {
  it('mock pokemon has all contract fields', () => {
    const pokemon = createMockPokemon()
    POKEMON_CONTRACT_FIELDS.forEach(field => {
      expect(pokemon).toHaveProperty(field)
    })
  })

  it('mock pokemon.stats has all contract fields', () => {
    const pokemon = createMockPokemon()
    POKEMON_STATS_CONTRACT_FIELDS.forEach(field => {
      expect(pokemon.stats).toHaveProperty(field)
    })
  })

  it('mock pokemon.rarity has all contract fields', () => {
    const pokemon = createMockPokemon()
    POKEMON_RARITY_CONTRACT_FIELDS.forEach(field => {
      expect(pokemon.rarity).toHaveProperty(field)
    })
  })

  it('mock pokemon.sprites has all contract fields', () => {
    const pokemon = createMockPokemon()
    POKEMON_SPRITES_CONTRACT_FIELDS.forEach(field => {
      expect(pokemon.sprites).toHaveProperty(field)
    })
  })

  it('pokemonTypes works with contract-shaped types', () => {
    const pokemon = createMockPokemon({ types: ['fire', 'flying'] })
    expect(pokemonTypes(pokemon.types)).toBe('Fire / Flying')
  })

  it('isTeamThisRank works with contract-shaped rarity', () => {
    const team = [
      createMockPokemon({ rarity: { rarity: 2, stats: [] } }),
      createMockPokemon({ rarity: { rarity: 2, stats: [] } }),
    ]
    expect(isTeamThisRank(team, 2)).toBe(true)
  })

  it('pokemonHasShieldBerry works with contract-shaped effects', () => {
    const pokemon = createMockPokemon({ effects: ['boost_shield'] })
    expect(pokemonHasShieldBerry(pokemon)).toBe(true)

    const pokemon2 = createMockPokemon({ effects: [] })
    expect(pokemonHasShieldBerry(pokemon2)).toBe(false)
  })
})

describe('simplified pokemon contract (front-side mirror)', () => {
  const mockSimplified = {
    id: 'poke-1',
    entry: 25,
    name: 'pikachu',
    types: ['electric'],
    rarity: 0,
    sprite: 'front.png',
    tier: 1,
    level: 1,
  }

  it('simplified pokemon has all contract fields', () => {
    SIMPLIFIED_POKEMON_CONTRACT_FIELDS.forEach(field => {
      expect(mockSimplified).toHaveProperty(field)
    })
  })
})
