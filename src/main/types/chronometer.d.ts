export interface Chronometerable {
  hrstart?: [number, number]
  elapsedMs?: number

  start(): void

  stop(): void
}
