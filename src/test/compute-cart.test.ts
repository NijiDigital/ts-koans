import { basename } from 'path'

/**
 * @level 2
 * @tags sync
 */

const modName = basename(__filename, '.test.ts')

// noinspection PointlessArithmeticExpressionJS
const usecases = [
  {
    // cart content : 3 lines and 2 lines, each line is : qty * unit price
    cartContent: `3
3 47
6 78
1 123
2
6 33
3 78
`,
    expectedResult: 3 * 47 + 6 * 78 + 123 + 6 * 33 + 3 * 78,
  },
  {
    cartContent: `1
4 8
5
1 45
3 12
2 9
3 24
11 3
2
10 4
3 120
`,
    expectedResult: 4 * 8 + 1 * 45 + 3 * 12 + 2 * 9 + 3 * 24 + 11 * 3 + +10 * 4 + 3 * 120,
  },
]

describe('compute cart', () => {
  describe('computeCart', () => {
    let computeCart
    beforeAll(() => {
      computeCart = require(`../main/${modName}`).computeCart
    })
    test.each(usecases)(
      'should return $expectedResult as the total price given cart items $cartContent',
      ({ cartContent, expectedResult }) => {
        // When
        const result = computeCart(cartContent)
        // Then
        expect(result).toBe(expectedResult)
      },
    )
  })
})
