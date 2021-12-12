import { basename } from 'path'

/**
 * @level 2
 * @tags async
 */

const modName = basename(__filename, '.test.ts')

describe('each async', () => {
  describe('eachAsync', () => {
    let eachAsync
    beforeAll(() => {
      eachAsync = require(`../main/${modName}`).eachAsync
    })
    test('should iterate through loop and execute async function', async () => {
      // Given
      const list = Array.from({ length: 3 }, (__, index) => index + 1)
      const result: number[] = []
      const addLater = (value: number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            result.unshift(value)
            resolve(undefined)
          }, value * 1000)
        })
      }
      // When
      const promiseFactory = () => eachAsync(list, (value) => addLater(value))
      // Then
      await expect(promiseFactory).toFulfillAfter(1000 + 2000 + 3000)
      expect(result).toEqual([3, 2, 1])
    })
  })
})
