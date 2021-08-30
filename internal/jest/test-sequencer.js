const Sequencer = require('@jest/test-sequencer').default
const { parseDecorators } = require('./koans-utils')

class CustomSequencer extends Sequencer {
  sort(tests) {
    return [...tests]
      .sort((item1, item2) => item1.path.localeCompare(item2.path))
      .sort((...items) => {
        const [level1, level2] = items.map((item) => parseDecorators(item.path).difficultyLevel)
        return level1 === undefined ? 1 : level2 === undefined ? -1 : level1 - level2
      })
  }
}

module.exports = CustomSequencer
