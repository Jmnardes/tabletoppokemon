import { taskTypeEnum, eventTypeEnum } from '../enum'

// ============================================================
// CONTRACT CONSTANTS — Must be identical in poketactics-server
// File: src/enums/__tests__/enums.contract.test.js
// ============================================================

const TASK_TYPE_CONTRACT_KEYS = [
  'catch',
  'defeatWild',
  'useDust',
  'gainTokens',
  'useBerry',
  'useGreatballs',
  'useUltraballs',
  'farmHarvest',
  'farmFertilize',
  'levelUp',
  'usePotion',
  'defeatGym',
  'finishTasks',
  'winBattle',
]

const ELEMENT_CONTRACT_VALUES = [
  'psychic',
  'fire',
  'water',
  'dragon',
  'bug',
  'dark',
  'electric',
  'fairy',
  'fighting',
  'flying',
  'ice',
  'ghost',
  'grass',
  'ground',
  'poison',
  'rock',
  'steel',
  'normal',
]

const BERRY_CONTRACT_KEYS = [
  'CHERI_BERRY',
  'CHESTO_BERRY',
  'PECHA_BERRY',
  'RAWST_BERRY',
  'ASPEAR_BERRY',
  'LEPPA_BERRY',
  'ORAN_BERRY',
  'OCCA_BERRY',
  'LUM_BERRY',
  'SITRUS_BERRY',
  'ROSELI_BERRY',
  'PERSIM_BERRY',
  'WACAN_BERRY',
  'YACHE_BERRY',
  'LIECHI_BERRY',
  'GANLON_BERRY',
  'SALAC_BERRY',
  'PETAYA_BERRY',
  'APICOT_BERRY',
  'KEBIA_BERRY',
  'SHUCA_BERRY',
  'COBA_BERRY',
  'PAYAPA_BERRY',
  'PASSHO_BERRY',
  'TANGA_BERRY',
  'CHARTI_BERRY',
  'KASIB_BERRY',
  'HABAN_BERRY',
  'COLBUR_BERRY',
  'BABIRI_BERRY',
  'CHILAN_BERRY',
  'MICLE_BERRY',
  'STARF_BERRY',
  'ENIGMA_BERRY',
  'JABOCA_BERRY',
  'ROWAP_BERRY',
  'MARANGA_BERRY',
  'KEE_BERRY',
  'LANSAT_BERRY',
  'CUSTAP_BERRY',
  'WATMEL_BERRY',
  'DURIN_BERRY',
  'BELUE_BERRY',
  'RINDO_BERRY',
  'CHOPLE_BERRY',
]

const STAT_CONTRACT_VALUES = [
  'hp',
  'atk',
  'def',
  'acc',
  'evs',
  'crt',
]

const DIFFICULTY_CONTRACT_KEYS = [
  'easy',
  'medium',
  'hard',
]

const AUGMENT_CONTRACT_VALUES = [
  'common',
  'uncommon',
  'rare',
]

// ============================================================

describe('enum contracts (front side)', () => {
  describe('taskTypeEnum', () => {
    it('has exactly the contract keys', () => {
      expect(Object.keys(taskTypeEnum).sort()).toEqual([...TASK_TYPE_CONTRACT_KEYS].sort())
    })

    it('each key maps to itself as value', () => {
      TASK_TYPE_CONTRACT_KEYS.forEach(key => {
        expect(taskTypeEnum[key]).toBe(key)
      })
    })

    it(`has exactly ${TASK_TYPE_CONTRACT_KEYS.length} entries`, () => {
      expect(Object.keys(taskTypeEnum)).toHaveLength(TASK_TYPE_CONTRACT_KEYS.length)
    })
  })

  describe('eventTypeEnum (front-only, no server mirror)', () => {
    it('has expected event types', () => {
      expect(eventTypeEnum).toEqual({
        battle: 'battle',
        journey: 'journey',
        freeActions: 'freeActions',
        gym: 'gym',
      })
    })
  })

  describe('contract constants consistency', () => {
    it('ELEMENT_CONTRACT_VALUES has 18 types', () => {
      expect(ELEMENT_CONTRACT_VALUES).toHaveLength(18)
    })

    it('BERRY_CONTRACT_KEYS has 45 entries', () => {
      expect(BERRY_CONTRACT_KEYS).toHaveLength(45)
    })

    it('STAT_CONTRACT_VALUES has 6 stats', () => {
      expect(STAT_CONTRACT_VALUES).toHaveLength(6)
    })

    it('DIFFICULTY_CONTRACT_KEYS has 3 difficulties', () => {
      expect(DIFFICULTY_CONTRACT_KEYS).toHaveLength(3)
    })

    it('AUGMENT_CONTRACT_VALUES has 3 rarities', () => {
      expect(AUGMENT_CONTRACT_VALUES).toHaveLength(3)
    })
  })
})
