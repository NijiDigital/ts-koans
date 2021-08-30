import { basename } from 'path'

import { IsAnagram } from '../main/types/anagram'

/**
 * @difficultyLevel 2
 * @tags sync
 */

const modName = basename(__filename, '.test.ts')

describe('anagram', () => {
  describe('isAnagram', () => {
    let isAnagram: IsAnagram
    beforeAll(() => {
      isAnagram = require(`../main/${modName}`).isAnagram
    })
    type UseCase = [boolean, string, string]
    const useCases: UseCase[] = [
      [true, 'énergie noire', 'reine ignorée'],
      [false, 'énergie noire', 'reine ignoré'],
      [false, 'énergie noire', 'reine ignoréz'],
      [true, 'énergie  noire', 'reine ignorée  '],
      [true, 'Albert Einstein', "rien n'est établi"],
      [true, 'Entreprise Monsanto', 'poison très rémanent'],
      [true, 'Laurent Fabius', 'Naturel abusif'],
    ]
    test.each(useCases)('should return %p given %p and %p', (anagram, s1, s2) => {
      // When
      const result = isAnagram(s1, s2)
      // Then
      expect(result).toEqual(anagram)
    })
  })
})
