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
      toFulfillAfter: (
        durationMs: number,
        resultExpectations?: (promise: Promise<unknown>) => Promise<void>,
      ) => Promise<R>
      toHaveFailedWith: (opt?: ErrorMatcherOptions) => R
    }
    interface Expect {
      toBeRejectedWith: (opt?: ErrorMatcherOptions) => Promise<jest.CustomMatcherResult>
      toFulfillAfter: (
        durationMs: number,
        resultExpectations?: (promise: Promise<unknown>) => Promise<void>,
      ) => Promise<jest.CustomMatcherResult>
      toHaveFailedWith: (opt?: ErrorMatcherOptions) => jest.CustomMatcherResult
    }
  }
}

export interface ExpectExtensionable extends jest.ExpectExtendMap {
  toBeRejectedWith: (
    promise: Promise<unknown>,
    opt?: ErrorMatcherOptions,
  ) => Promise<jest.CustomMatcherResult>
  toFulfillAfter: (
    promiseFactory: () => Promise<unknown>,
    durationMs: number,
    resultExpectations?: (promise: Promise<unknown>) => Promise<void>,
  ) => Promise<jest.CustomMatcherResult>
  toHaveFailedWith: (fn: () => void, opt?: ErrorMatcherOptions) => jest.CustomMatcherResult
}
