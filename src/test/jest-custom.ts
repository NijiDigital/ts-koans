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
  async toBeRejectedWith(promise: Promise<unknown>, opt?) {
    try {
      await promise
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err, opt)
      return { message: () => 'promise is rejected with expected error', pass: true }
    }
    return { message: () => 'promise is not rejected', pass: false }
  },
  toHaveFailedWith(fn: () => void, opt?) {
    try {
      fn()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleError(err, opt)
      return { message: () => 'function thrown expected error', pass: true }
    }
    return { message: () => 'function did not throw any error', pass: false }
  },
}

expect.extend(expectExtension)
