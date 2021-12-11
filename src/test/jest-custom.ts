import { ExpectExtensionable } from './types/jest-custom'

const handleError = (err: Error, opt?: ErrorMatcherOptions) => {
  if (typeof opt === 'function') {
    opt(err)
    return
  }
  if (opt?.type) {
    expect(err).toBeInstanceOf(opt.type)
  }
  if (opt?.message) {
    expect(err).toHaveProperty('message', opt.message)
  }
  if (opt?.handler) {
    opt.handler(err)
  }
}

const expectExtension: ExpectExtensionable = {
  toBeRejectedWith: async (promise: Promise<unknown>, opt?) => {
    try {
      await promise
    } catch (err) {
      handleError(err as Error, opt)
      return { message: () => 'promise is rejected with expected error', pass: true }
    }
    return { message: () => 'promise is not rejected', pass: false }
  },
  toFulfillAfter: async (
    promiseFactory: () => Promise<unknown>,
    durationMs: number,
    resultExpectations?: (promise: Promise<unknown>) => Promise<void>,
  ) => {
    jest.useFakeTimers('legacy')
    const waitNextTick = async () =>
      new Promise((resolve) => {
        process.nextTick(() => {
          resolve(undefined)
        })
      })
    try {
      const next = jest.fn()
      const promise = promiseFactory()
      promise.then(next).catch(next)
      let elapsedMs = 0
      const tickMs = 10
      do {
        if (next.mock.calls.length > 0) {
          return { message: () => 'function called too soon', pass: false }
        }
        jest.advanceTimersByTime(tickMs)
        await waitNextTick()
        elapsedMs += tickMs
      } while (elapsedMs < durationMs)
      jest.advanceTimersByTime(tickMs)
      await waitNextTick()
      if (next.mock.calls.length < 1) {
        return { message: () => 'promise fulfilled too late', pass: false }
      }
      if (resultExpectations) {
        await resultExpectations(promise)
      }
      return {
        message: () => `promise is successfully fulfilled after ${durationMs}ms`,
        pass: true,
      }
    } finally {
      jest.useRealTimers()
    }
  },
  toHaveFailedWith: (fn, opt) => {
    try {
      fn()
    } catch (err) {
      handleError(err as Error, opt)
      return { message: () => 'function thrown expected error', pass: true }
    }
    return { message: () => 'function did not throw any error', pass: false }
  },
}

expect.extend(expectExtension)
