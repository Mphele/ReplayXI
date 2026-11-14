import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders the football pitch Canvas', () => {
    render(<App />)

    expect(
      screen.getByRole('img', { name: /football pitch/i }),
    ).toBeInTheDocument()
  })
})
