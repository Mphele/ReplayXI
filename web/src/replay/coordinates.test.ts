import { describe, expect, it } from 'vitest'

import { pitchToCanvas, type Point, type Size } from './coordinates'

const STANDARD_PITCH: Size = { width: 105, height: 68 }
const TEST_CANVAS: Size = { width: 1050, height: 680 }

describe('pitchToCanvas', () => {
  it.each([
    {
      description: 'the origin',
      position: { x: 0, y: 0 },
      expected: { x: 0, y: 0 },
    },
    {
      description: 'the pitch centre',
      position: { x: 52.5, y: 34 },
      expected: { x: 525, y: 340 },
    },
    {
      description: 'the far corner',
      position: { x: 105, y: 68 },
      expected: { x: 1050, y: 680 },
    },
    {
      description: 'another proportional position',
      position: { x: 21, y: 17 },
      expected: { x: 210, y: 170 },
    },
  ])('maps $description to Canvas pixels', ({ position, expected }) => {
    expect(pitchToCanvas(position, STANDARD_PITCH, TEST_CANVAS)).toEqual(
      expected,
    )
  })

  it('does not round fractional pixel positions', () => {
    const result = pitchToCanvas(
      { x: 1, y: 2 },
      { width: 3, height: 3 },
      { width: 10, height: 10 },
    )

    expect(result.x).toBeCloseTo(10 / 3)
    expect(result.y).toBeCloseTo(20 / 3)
  })

  it('does not mutate its inputs', () => {
    const position = Object.freeze<Point>({ x: 21, y: 17 })
    const pitch = Object.freeze<Size>({ width: 105, height: 68 })
    const canvas = Object.freeze<Size>({ width: 1050, height: 680 })

    expect(pitchToCanvas(position, pitch, canvas)).toEqual({ x: 210, y: 170 })
  })

  it('rejects invalid pitch or Canvas dimensions', () => {
    expect(() =>
      pitchToCanvas({ x: 0, y: 0 }, { width: 0, height: 68 }, TEST_CANVAS),
    ).toThrow(RangeError)

    expect(() =>
      pitchToCanvas(
        { x: 0, y: 0 },
        STANDARD_PITCH,
        { width: 1050, height: -1 },
      ),
    ).toThrow(RangeError)

    expect(() =>
      pitchToCanvas(
        { x: 0, y: 0 },
        { width: Number.POSITIVE_INFINITY, height: 68 },
        TEST_CANVAS,
      ),
    ).toThrow(RangeError)
  })

  it('rejects coordinates outside the pitch or coordinates that are not finite', () => {
    expect(() =>
      pitchToCanvas({ x: -1, y: 0 }, STANDARD_PITCH, TEST_CANVAS),
    ).toThrow(RangeError)

    expect(() =>
      pitchToCanvas({ x: 106, y: 0 }, STANDARD_PITCH, TEST_CANVAS),
    ).toThrow(RangeError)

    expect(() =>
      pitchToCanvas({ x: 0, y: 69 }, STANDARD_PITCH, TEST_CANVAS),
    ).toThrow(RangeError)

    expect(() =>
      pitchToCanvas({ x: Number.NaN, y: 0 }, STANDARD_PITCH, TEST_CANVAS),
    ).toThrow(RangeError)
  })
})
