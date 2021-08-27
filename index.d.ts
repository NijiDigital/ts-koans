// @ts-ignore
// noinspection JSUnusedGlobalSymbols

declare global {
  type ErrorHandler = (err: Error) => void
  type ErrorMatcherOptions =
    | {
        handler?: ErrorHandler
        type?: unknown
        message?: string
      }
    | ErrorHandler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  namespace jest {
    interface Matchers<R> {
      toBeRejectedWith: (opt?: ErrorMatcherOptions) => Promise<R>
      toHaveFailedWith: (opt?: ErrorMatcherOptions) => R
    }
    interface Expect {
      // @ts-ignore
      toBeRejectedWith: (opt?: ErrorMatcherOptions) => Promise<jest.CustomMatcherResult>
      // @ts-ignore
      toHaveFailedWith: (opt?: ErrorMatcherOptions) => jest.CustomMatcherResult
    }
  }
}
