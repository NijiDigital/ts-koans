const Sequencer = require('@jest/test-sequencer').default
const { basename } = require('path')
const sequence = require('./test-sequence')

const testName = (test) => basename(test.path, '.test.ts')

const nameComparatorFactory = (name) => (candidate) => name === candidate

class CustomSequencer extends Sequencer {
  sort(tests) {
    return tests.sort((...items) => {
      const namesComparators = items.map((item) => nameComparatorFactory(testName(item)))
      return sequence.findIndex(namesComparators[0]) - sequence.findIndex(namesComparators[1])
    })
  }
}

module.exports = CustomSequencer
