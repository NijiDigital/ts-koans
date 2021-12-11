import { basename } from 'path'

/**
 * @level 1
 * @tags sync
 */

const modName = basename(__filename, '.test.ts')

describe('duplicate counter', () => {
  describe('countDuplicate', () => {
    let countDuplicate
    beforeAll(() => {
      countDuplicate = require(`../main/${modName}`).countDuplicate
    })
    test.each([
      { ar: [5, 3, 3, 5, 1, 4, 7], expectedResult: 2 },
      { ar: [5, 3, 3, 5, 1, 1, 1, 4, 7], expectedResult: 4 },
      { ar: [5, 5, 5, 5], expectedResult: 3 },
    ])(
      'should return $expectedResult as number of duplicates given an array of values of $ar',
      ({ ar, expectedResult }) => {
        // When
        const result = countDuplicate(ar)
        // Then
        expect(result).toBe(expectedResult)
      },
    )
  })
})
