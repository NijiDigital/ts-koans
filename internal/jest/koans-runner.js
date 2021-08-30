const JestRunner = require('jest-runner').default
const { parseDecorators } = require('./koans-utils')
const { resolve, join, relative, dirname, basename } = require('path')

const difficultyLevelArgPrefix = '--difficultyLevel'
const tagsArgPrefix = '--tags'

const baseDir = resolve(__dirname, '..', '..')
const testSrcDir = join(baseDir, 'src', 'test')

class KoansRunner extends JestRunner {
  static filterTestsGivenCliArgs(tests) {
    const include = {}
    process.argv.forEach((arg) => {
      if (arg.startsWith(difficultyLevelArgPrefix)) {
        include.difficultyLevels = include.difficultyLevels || []
        include.difficultyLevels.push(Number(arg.substring(difficultyLevelArgPrefix.length + 1)))
      }
      if (arg.startsWith(tagsArgPrefix)) {
        include.tags = arg.substring(tagsArgPrefix.length + 1).split(/\s/)
      }
    })
    return tests.filter((test) => {
      const { difficultyLevel, tags } = test.koans
      let result = !include.difficultyLevels && !include.tags
      result =
        result ||
        (include.difficultyLevels?.length && include.difficultyLevels.includes(difficultyLevel))
      if (include.tags?.length) {
        tags.forEach((tag) => {
          result = result || include.tags.includes(tag)
        })
      }
      return result
    })
  }

  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    const maxLengthTestName = tests.reduce((max, test) => {
      const testRelativePath = join(
        relative(testSrcDir, dirname(test.path)),
        basename(test.path, '.test.ts'),
      )
      return Math.max(max, testRelativePath.length)
    }, 0)
    tests.forEach((test) => {
      test.koans = parseDecorators(test.path)
      test.maxLengthTestName = maxLengthTestName
    })
    return super.runTests(
      KoansRunner.filterTestsGivenCliArgs(tests),
      watcher,
      onStart,
      onResult,
      onFailure,
      options,
    )
  }
}

module.exports = KoansRunner
