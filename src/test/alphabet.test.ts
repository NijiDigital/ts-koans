import { basename } from 'path'

import { BuildLetters } from '../main/types/alphabet'

/**
 * @group sync
 * @group easy
 */

const modName = basename(__filename, '.test.ts')

describe('alphabet', () => {
  describe('buildLetters', () => {
    let buildLetters: BuildLetters
    beforeAll(() => {
      buildLetters = require(`../main/${modName}`).buildLetters
    })
    test('should return a string with all letters of alphabet', () => {
      // When
      const result = buildLetters()
      // Then
      expect(result).toEqual('abcdefghijklmnopqrstuvwxyz')
    })
    test("should return a string with letters from 'c' to 'x'", () => {
      // When
      const result = buildLetters('c', 'x')
      // Then
      expect(result).toEqual('cdefghijklmnopqrstuvwx')
    })
    test("should return a string with letters from 'g' to 'm'", () => {
      // When
      const result = buildLetters('g', 'm')
      // Then
      expect(result).toEqual('ghijklm')
    })
    test("should return a string with letters from 'o' to 'z'", () => {
      // When
      const result = buildLetters('o')
      // Then
      expect(result).toEqual('opqrstuvwxyz')
    })
  })
})
