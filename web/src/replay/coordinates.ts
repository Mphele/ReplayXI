export type Point = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export function pitchToCanvas(
  position: Point,
  pitch: Size,
  canvas: Size,
): Point {
  if (
    !Number.isFinite(pitch.width) ||
    !Number.isFinite(pitch.height) ||
    !Number.isFinite(canvas.width) ||
    !Number.isFinite(canvas.height)
  ) {
    throw new RangeError('Pitch and Canvas dimensions must be finite numbers')
  }

  if (
    pitch.width <= 0 ||
    pitch.height <= 0 ||
    canvas.width <= 0 ||
    canvas.height <= 0
  ) {
    throw new RangeError('Pitch and Canvas dimensions must be greater than zero')
  }

  if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) {
    throw new RangeError('Position coordinates must be finite numbers')
  }

  if (
    position.x < 0 ||
    position.x > pitch.width ||
    position.y < 0 ||
    position.y > pitch.height
  ) {
    throw new RangeError('Position must be inside the pitch')
  }

  const canvasHeightRatio = canvas.height / pitch.height
  const canvasWidthRatio = canvas.width / pitch.width
  const canvasX = position.x * canvasWidthRatio
  const canvasY = canvasHeightRatio * position.y

  return {
    x: canvasX,
    y: canvasY,
  }
}

