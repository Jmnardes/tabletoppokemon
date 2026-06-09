import { taskTypeEnum } from '../enum'

describe('taskTypeEnum', () => {
  it('has all expected task types', () => {
    const expectedTypes = [
      'catch', 'defeatWild', 'useDust',
      'gainTokens', 'useBerry',
      'useGreatballs', 'useUltraballs',
      'farmHarvest', 'farmFertilize', 'trainPokemon', 'levelUp',
      'usePotion', 'defeatGym', 'finishTasks', 'winBattle',
    ]

    expectedTypes.forEach(type => {
      expect(taskTypeEnum).toHaveProperty(type)
    })
  })

  it('has values matching their keys', () => {
    Object.entries(taskTypeEnum).forEach(([key, value]) => {
      expect(value).toBe(key)
    })
  })

  it('has exactly 15 task types', () => {
    expect(Object.keys(taskTypeEnum)).toHaveLength(15)
  })
})
