import { useEffect, useRef } from 'react'

export type PitchCanvasProps = {
  width: number
  height: number
}

export function PitchCanvas({ width, height }: PitchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas === null) {
      return
    }

    const context = canvas.getContext('2d')

    if (context === null) {
      return
    }

    context.fillStyle = '#2e7d32'
    context.fillRect(0, 0, width, height)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      role="img"
      aria-label="Football pitch"
    />
  )
}
