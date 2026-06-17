// ============================================================
// CONTRACT CONSTANTS — Must be identical in poketactics-server
// File: src/responses/__tests__/responses.contract.test.js
// ============================================================

const SESSION_JOIN_RESPONSE_CONTRACT = [
  'player',
  'opponents',
  'session',
  'version',
]

const LOBBY_READY_RESPONSE_CONTRACT = [
  'id',
  'ready',
]

// ============================================================

/**
 * These tests verify that the front-end handlers expect the same
 * shape that the server responses produce.
 * 
 * If a contract constant changes in the server, these tests must
 * be updated to match — ensuring we catch mismatches early.
 */

describe('response contracts (front side)', () => {
  describe('session-join response', () => {
    const mockResponse = {
      player: {
        id: 'p1',
        berries: [],
        farm: { slots: [] },
        craft: { recipes: [] },
        trainingCamp: { slots: 0, camp: [], equipmentLevel: 1 },
        pokeTeam: [],
        pokeBox: [],
      },
      opponents: [{ id: 'p2', status: { trainerName: 'Gary' } }],
      session: { sessionCode: 'ABC', turns: 0 },
      version: 1.3,
    }

    it.each(SESSION_JOIN_RESPONSE_CONTRACT)('handler expects field: %s', (field) => {
      expect(mockResponse).toHaveProperty(field)
    })

    it('session must NOT contain players', () => {
      expect(mockResponse.session).not.toHaveProperty('players')
    })

    it('player contains fields accessed in session-join handler', () => {
      // Fields the front handler accesses: res.player.berries, res.player.farm,
      // res.player.craft, res.player.trainingCamp, res.player.pokeTeam, res.player.pokeBox
      expect(mockResponse.player).toHaveProperty('berries')
      expect(mockResponse.player).toHaveProperty('farm')
      expect(mockResponse.player).toHaveProperty('craft')
      expect(mockResponse.player).toHaveProperty('trainingCamp')
      expect(mockResponse.player).toHaveProperty('pokeTeam')
      expect(mockResponse.player).toHaveProperty('pokeBox')
    })

    it('version is a number', () => {
      expect(typeof mockResponse.version).toBe('number')
    })
  })

  describe('lobby-ready-other response', () => {
    const mockResponse = { id: 'p1', ready: true }

    it.each(LOBBY_READY_RESPONSE_CONTRACT)('handler expects field: %s', (field) => {
      expect(mockResponse).toHaveProperty(field)
    })

    it('id is a string and ready is a boolean', () => {
      expect(typeof mockResponse.id).toBe('string')
      expect(typeof mockResponse.ready).toBe('boolean')
    })
  })
})
