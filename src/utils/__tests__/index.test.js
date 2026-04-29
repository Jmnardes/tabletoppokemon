import {
  stringToUpperCase,
  generationPokeNumbers,
  diceRoll,
  typeColor,
  parseNumberToNatural,
  parseNumberMultToNatural,
  rarityName,
  augmentColor,
  pokemonHasChallengeBerry,
  berryExistsInBerries,
  upgradePokemonLevelChance,
  joinArr,
  options,
  pokemonNature,
  baseHpArray,
  colorsByType,
} from '../index'

describe('stringToUpperCase', () => {
  it('capitalizes the first letter', () => {
    expect(stringToUpperCase('pikachu')).toBe('Pikachu')
  })

  it('keeps already capitalized strings', () => {
    expect(stringToUpperCase('Bulbasaur')).toBe('Bulbasaur')
  })

  it('handles single character', () => {
    expect(stringToUpperCase('a')).toBe('A')
  })
})

describe('generationPokeNumbers', () => {
  it('returns correct count for each generation', () => {
    expect(generationPokeNumbers(0)).toBe(897)
    expect(generationPokeNumbers(1)).toBe(151)
    expect(generationPokeNumbers(2)).toBe(252)
    expect(generationPokeNumbers(3)).toBe(386)
    expect(generationPokeNumbers(4)).toBe(493)
    expect(generationPokeNumbers(5)).toBe(649)
    expect(generationPokeNumbers(6)).toBe(719)
    expect(generationPokeNumbers(7)).toBe(809)
    expect(generationPokeNumbers(8)).toBe(897)
  })

  it('returns 897 for generations >= 8', () => {
    expect(generationPokeNumbers(9)).toBe(897)
    expect(generationPokeNumbers(10)).toBe(897)
  })

  it('converts string input to number', () => {
    expect(generationPokeNumbers('3')).toBe(386)
  })
})

describe('diceRoll', () => {
  it('returns a number within range [0, diceSize)', () => {
    for (let i = 0; i < 100; i++) {
      const result = diceRoll(20)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(20)
    }
  })

  it('defaults to d20', () => {
    for (let i = 0; i < 100; i++) {
      const result = diceRoll()
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(20)
    }
  })

  it('respects custom dice size', () => {
    for (let i = 0; i < 100; i++) {
      const result = diceRoll(6)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(6)
    }
  })
})

describe('typeColor', () => {
  it('returns correct color for single type', () => {
    expect(typeColor(['fire'])).toBe('#ee8f12')
    expect(typeColor(['water'])).toBe('#228fd8')
    expect(typeColor(['grass'])).toBe('#1d8b2f')
  })

  it('returns mixed color for dual type', () => {
    const result = typeColor(['fire', 'water'])
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
    expect(result).not.toBe('#ee8f12')
    expect(result).not.toBe('#228fd8')
  })
})

describe('parseNumberToNatural', () => {
  it('divides and rounds to natural number', () => {
    expect(parseNumberToNatural(100, 3)).toBe(33)
    expect(parseNumberToNatural(10, 2)).toBe(5)
    expect(parseNumberToNatural(7, 2)).toBe(4)
  })
})

describe('parseNumberMultToNatural', () => {
  it('multiplies and rounds to natural number', () => {
    expect(parseNumberMultToNatural(3, 2.5)).toBe(8)
    expect(parseNumberMultToNatural(10, 1.5)).toBe(15)
  })
})

describe('rarityName', () => {
  it('returns correct rarity names', () => {
    expect(rarityName(0)).toBe('Common')
    expect(rarityName(1)).toBe('Uncommon')
    expect(rarityName(2)).toBe('Rare')
    expect(rarityName(3)).toBe('Shiny')
  })

  it('returns undefined for unknown rarity', () => {
    expect(rarityName(4)).toBeUndefined()
  })
})

describe('augmentColor', () => {
  it('returns correct colors for difficulties', () => {
    expect(augmentColor('common')).toBe('#8a8a8a')
    expect(augmentColor('uncommon')).toBe('#6b91bf')
    expect(augmentColor('rare')).toBe('#ad900e')
  })

  it('returns default gray for unknown difficulty', () => {
    expect(augmentColor('unknown')).toBe('#8a8a8a')
  })
})

describe('pokemonHasChallengeBerry', () => {
  it('returns true when pokemon has boost_challenge effect', () => {
    const pokemon = { effects: ['boost_challenge', 'other'] }
    expect(pokemonHasChallengeBerry(pokemon)).toBe(true)
  })

  it('returns false when pokemon has no boost_challenge', () => {
    const pokemon = { effects: ['other_effect'] }
    expect(pokemonHasChallengeBerry(pokemon)).toBe(false)
  })

  it('returns false when effects is empty', () => {
    const pokemon = { effects: [] }
    expect(pokemonHasChallengeBerry(pokemon)).toBe(false)
  })
})

describe('berryExistsInBerries', () => {
  it('returns true when berry type exists', () => {
    const berries = [{ type: 'oran_berry' }, { type: 'sitrus_berry' }]
    expect(berryExistsInBerries({ berries, berryType: 'oran_berry' })).toBe(true)
  })

  it('returns false when berry type does not exist', () => {
    const berries = [{ type: 'oran_berry' }]
    expect(berryExistsInBerries({ berries, berryType: 'sitrus_berry' })).toBe(false)
  })

  it('returns falsy when berries is null/undefined', () => {
    expect(berryExistsInBerries({ berries: null, berryType: 'oran_berry' })).toBeFalsy()
    expect(berryExistsInBerries({ berries: undefined, berryType: 'oran_berry' })).toBeFalsy()
  })
})

describe('upgradePokemonLevelChance', () => {
  it('returns 90% when poke is 4+ levels below session', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 5, dusts: 0, berries: [] })).toBe(90)
  })

  it('returns 80% when poke is 3 levels below session', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 7, dusts: 0, berries: [] })).toBe(80)
  })

  it('returns 60% when poke is 2 levels below', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 8, dusts: 0, berries: [] })).toBe(60)
  })

  it('returns 40% when poke is 1 level below', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 9, dusts: 0, berries: [] })).toBe(40)
  })

  it('returns 20% when poke is same level', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 10, dusts: 0, berries: [] })).toBe(20)
  })

  it('returns 10% when poke is 1 level above', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 11, dusts: 0, berries: [] })).toBe(10)
  })

  it('returns 0% when poke is 2+ levels above', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 12, dusts: 0, berries: [] })).toBe(0)
  })

  it('adds 20% per dust', () => {
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 10, dusts: 2, berries: [] })).toBe(60)
  })

  it('adds 30% with belue_berry', () => {
    const berries = [{ type: 'belue_berry' }]
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 10, dusts: 0, berries })).toBe(50)
  })

  it('caps at 100%', () => {
    const berries = [{ type: 'belue_berry' }]
    expect(upgradePokemonLevelChance({ sessionLevel: 10, pokeLevel: 5, dusts: 3, berries })).toBe(100)
  })
})

describe('joinArr', () => {
  it('joins array elements with comma', () => {
    expect(joinArr(['fire', 'water'])).toBe('fire, water')
  })

  it('returns single element as-is', () => {
    expect(joinArr(['fire'])).toBe('fire')
  })

  it('returns undefined for falsy input', () => {
    expect(joinArr(undefined)).toBeUndefined()
    expect(joinArr(null)).toBeUndefined()
  })
})

describe('constants', () => {
  it('options has 11 tier entries (0-10)', () => {
    expect(options).toHaveLength(11)
    expect(options[0].value).toBe('0')
    expect(options[10].value).toBe('10')
  })

  it('baseHpArray has 12 entries', () => {
    expect(baseHpArray).toHaveLength(12)
    expect(baseHpArray[0]).toBe(5)
  })

  it('pokemonNature has expected natures', () => {
    expect(pokemonNature.adamant.increase).toBe('atk')
    expect(pokemonNature.adamant.decrease).toBe('crt')
    expect(pokemonNature.ordinary.increase).toBeNull()
    expect(pokemonNature.ordinary.decrease).toBeNull()
  })

  it('colorsByType has all 18 types plus none', () => {
    expect(colorsByType).toHaveLength(19)
    const types = colorsByType.map(c => c.label)
    expect(types).toContain('fire')
    expect(types).toContain('water')
    expect(types).toContain('grass')
    expect(types).toContain('none')
  })
})
