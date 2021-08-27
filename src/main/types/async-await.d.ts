export type DoAsync = <T>(
  value: T,
  error?: Error,
  syncError?: boolean,
  log?: (s: string) => void,
) => Promise<T>
