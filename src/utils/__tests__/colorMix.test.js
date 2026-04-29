import { mixColors } from '../colorMix'

describe('mixColors', () => {
  it('returns a valid hex color', () => {
    const result = mixColors('#ff0000', '#0000ff')
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('returns approximately same color when mixing with itself', () => {
    const result = mixColors('#ff0000', '#ff0000')
    expect(result).toMatch(/^#f[ef]0[01]0[01]$/i)
  })

  it('mixes three colors', () => {
    const result = mixColors('#ff0000', '#00ff00', '#0000ff')
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
