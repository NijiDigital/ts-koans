import { basename } from 'path'

import { DoAsync } from '../main/types/async-await'

/**
 * @difficultyLevel 2
 * @tags async
 */

const modName = basename(__filename, '.test.ts')

describe('async await', () => {
  let doAsync: DoAsync
  beforeAll(() => {
    doAsync = require(`../main/${modName}`).doAsync
    expect(typeof doAsync).toBe('function')
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.clearAllTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  test('should resolve after 1s with given value', async () => {
    // When
    const promise = doAsync('hello')
    jest.advanceTimersByTime(1000)
    const result = await promise
    jest.runOnlyPendingTimers()
    // Then
    expect(result).toBe('hello')
  })
  test('should reject after 1s with given error', async () => {
    // When
    const error = new Error('oops')
    const promise = doAsync(undefined, error)
    jest.advanceTimersByTime(1000)
    // Then
    await expect(promise).toBeRejectedWith(error)
    jest.runOnlyPendingTimers()
  })
  test('should throw an error synchronously and log it', async () => {
    // When
    const error = new Error('oops')
    const log = jest.fn()
    const promise = doAsync(undefined, error, true, log)
    // Then
    expect(log).toHaveBeenNthCalledWith(1, error.message)
    await expect(promise).toBeRejectedWith(error)
  })
  test('should reject after 1s and log the given error', async () => {
    // When
    const error = new Error('oops')
    const log = jest.fn()
    const promise = doAsync(undefined, error, false, log)
    jest.advanceTimersByTime(1000)
    // Then
    await expect(promise).toBeRejectedWith(error)
    jest.runOnlyPendingTimers()
    expect(log).toHaveBeenNthCalledWith(1, error.message)
  })
})
