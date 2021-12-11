import { basename } from 'path'

/**
 * @level 1
 * @tags async
 */

const modName = basename(__filename, '.test.ts')

describe('delay', () => {
  let delay: <T>(ms: number, value: T) => Promise<T>
  beforeAll(() => {
    delay = require(`../main/${modName}`).default
    expect(typeof delay).toBe('function')
  })
  test('should wait for 2s and resolve to true', async () => {
    // Given
    const durationMs = 2000
    // When
    const promiseFactory = () => delay(durationMs, true)
    // Then
    await expect(promiseFactory).toFulfillAfter(durationMs)
  })
})
