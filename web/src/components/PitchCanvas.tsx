export type PitchCanvasProps = {
  width: number
  height: number
}

export function PitchCanvas({ width, height }: PitchCanvasProps) {
  void width
  void height

  return (
  <canvas
    width={width}
    height={height}
    role="img"
    aria-label="Football pitch"
  />
);

}
