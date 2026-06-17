import { catchDifficulty, isTeamThisRank } from '../../utils/pokemonFunctions'

// ============================================================
// CONTRACT CONSTANTS — Must be identical in poketactics-server
// File: src/factories/__tests__/playerFactory.contract.test.js
// ============================================================

const PLAYER_CONTRACT_FIELDS = [
  'id',
  'pokeTeam',
  'pokeBox',
  'encounter',
  'status',
  'balls',
  'items',
  'catchBonus',
  'tasks',
  'augments',
  'capturedPoke',
  'defeatedGyms',
  'gymRoute',
  'currentGym',
  'nextGym',
  'lastGymDefeatedTurn',
  'currentJourney',
  'journeyLevel',
  'journeyProgress',
  'journeyWildTeamSaved',
  'potions',
  'boxes',
  'daycare',
  'farm',
  'craft',
  'token',
  'ready',
  'online',
  'turnReady',
  'challengeReady',
  'trainingCamp',
  'berries',
]

const PLAYER_STATUS_CONTRACT_FIELDS = [
  'trainerName',
  'level',
  'shinyChance',
  'encounterRarity',
  'encounterLevel',
  'levelBonus',
  'wins',
  'loses',
  'catches',
  'critics',
  'taskDone',
  'badges',
]

const PLAYER_BALLS_CONTRACT_FIELDS = [
  'pokeball',
  'greatball',
  'ultraball',
  'masterball',
]

const PLAYER_ITEMS_CONTRACT_FIELDS = [
  'steal',
  'pokemonEgg',
  'incense',
  'dust',
]

const PLAYER_POTIONS_CONTRACT_FIELDS = [
  'potion',
  'superPotion',
  'hyperPotion',
]

const PLAYER_BOXES_CONTRACT_FIELDS = [
  'pokebox',
  'greatbox',
  'ultrabox',
]

const PLAYER_CATCH_BONUS_CONTRACT_FIELDS = [
  'elements',
  'balls',
]

const PLAYER_DAYCARE_CONTRACT_FIELDS = [
  'pokes',
  'token',
]

const PLAYER_TRAINING_CAMP_CONTRACT_FIELDS = [
  'slots',
  'camp',
  'equipmentLevel',
]

// ============================================================

/**
 * Creates a mock player following the contract.
 * Used to verify that front-end functions work with
 * objects matching the server's playerFactory shape.
 */
const createMockPlayer = () => {
  const player = {}
  PLAYER_CONTRACT_FIELDS.forEach(field => {
    player[field] = null
  })

  player.status = {}
  PLAYER_STATUS_CONTRACT_FIELDS.forEach(field => {
    player.status[field] = field === 'trainerName' ? 'Test' : 0
  })

  player.balls = {}
  PLAYER_BALLS_CONTRACT_FIELDS.forEach(field => {
    player.balls[field] = 0
  })

  player.items = {}
  PLAYER_ITEMS_CONTRACT_FIELDS.forEach(field => {
    player.items[field] = 0
  })

  player.potions = {}
  PLAYER_POTIONS_CONTRACT_FIELDS.forEach(field => {
    player.potions[field] = 0
  })

  player.boxes = {}
  PLAYER_BOXES_CONTRACT_FIELDS.forEach(field => {
    player.boxes[field] = 0
  })

  player.catchBonus = {}
  PLAYER_CATCH_BONUS_CONTRACT_FIELDS.forEach(field => {
    player.catchBonus[field] = []
  })

  player.daycare = {}
  PLAYER_DAYCARE_CONTRACT_FIELDS.forEach(field => {
    player.daycare[field] = field === 'pokes' ? [] : 0
  })

  player.trainingCamp = {}
  PLAYER_TRAINING_CAMP_CONTRACT_FIELDS.forEach(field => {
    player.trainingCamp[field] = field === 'camp' ? [] : field === 'equipmentLevel' ? 1 : 0
  })

  player.pokeTeam = []
  player.pokeBox = []
  player.encounter = []
  player.tasks = []
  player.augments = []
  player.berries = []
  player.defeatedGyms = []
  player.gymRoute = []
  player.capturedPoke = {}

  return player
}

describe('player contract (front-side mirror)', () => {
  it('mock player built from contract fields has all required top-level fields', () => {
    const player = createMockPlayer()
    PLAYER_CONTRACT_FIELDS.forEach(field => {
      expect(player).toHaveProperty(field)
    })
  })

  it('mock player.status has all required sub-fields', () => {
    const player = createMockPlayer()
    PLAYER_STATUS_CONTRACT_FIELDS.forEach(field => {
      expect(player.status).toHaveProperty(field)
    })
  })

  it('catchDifficulty works with contract-shaped player', () => {
    const player = createMockPlayer()
    const session = { gameDifficulty: 0, turns: 5 }
    const poke = { level: 5, rarity: 2, types: ['fire'] }
    const team = [{ level: 5, rarity: { rarity: 2 } }]

    const result = catchDifficulty(session, poke, team, player)
    expect(typeof result).toBe('number')
  })

  it('isTeamThisRank works with contract-shaped team pokemon', () => {
    const team = [
      { rarity: { rarity: 2 } },
      { rarity: { rarity: 2 } },
    ]
    expect(isTeamThisRank(team, 2)).toBe(true)
    expect(isTeamThisRank(team, 3)).toBe(false)
  })
})
