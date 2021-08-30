import { basename } from 'path'

import { CounterFactory } from '../main/types/counter'

/**
 * @difficultyLevel 1
 * @tags sync
 */

const modName = basename(__filename, '.test.ts')

describe('counter', () => {
  describe('counter factory', () => {
    let counterFactory: CounterFactory
    beforeAll(() => {
      counterFactory = require(`../main/${modName}`).default
    })
    describe('increase counter', () => {
      let increaseCounter: () => number
      beforeAll(() => {
        increaseCounter = counterFactory()
      })
      test('should increase counter value 20 times', () => {
        Array.from(Array(20))
          .map((__, index) => index + 1)
          .forEach((expectedResult) => {
            // When
            const result = increaseCounter()
            // Then
            expect(result).toBe(expectedResult)
          })
      })
    })
  })
})
