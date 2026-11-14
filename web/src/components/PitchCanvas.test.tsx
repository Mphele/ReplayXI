import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PitchCanvas } from './PitchCanvas'

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('PitchCanvas', () => {
  it('renders an accessible Canvas for the football pitch', () => {
    render(<PitchCanvas width={1050} height={680} />)

    const canvas = screen.getByRole('img', { name: /football pitch/i })

    expect(canvas.tagName).toBe('CANVAS')
  })

  it('applies the supplied drawing-buffer dimensions', () => {
    render(<PitchCanvas width={1050} height={680} />)

    const canvas = screen.getByRole('img', { name: /football pitch/i })

    expect(canvas).toHaveAttribute('width', '1050')
    expect(canvas).toHaveAttribute('height', '680')
  })

  it('paints the complete Canvas with the pitch background colour', () => {
    const fillRect = vi.fn()
    const context = {
      fillStyle: '',
      fillRect,
    } as unknown as CanvasRenderingContext2D
    const getContext = vi.mocked(HTMLCanvasElement.prototype.getContext)
    getContext.mockReturnValue(context)

    render(<PitchCanvas width={1050} height={680} />)

    expect(getContext).toHaveBeenCalledWith('2d')
    expect(context.fillStyle).toBe('#2e7d32')
    expect(fillRect).toHaveBeenCalledWith(0, 0, 1050, 680)
  })
})
