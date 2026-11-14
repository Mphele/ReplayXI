import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PitchCanvas } from './PitchCanvas'

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
})
