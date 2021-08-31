const JestRunner = require('jest-runner').default
const { parseDecorators, testSrcFileExtension } = require('./koans-utils')
const { resolve, join, relative, dirname, basename } = require('path')

const levelArgPrefix = '--level'
const tagsArgPrefix = '--tags'

const baseDir = resolve(__dirname, '..', '..')
const testSrcDir = join(baseDir, 'src', 'test')

class KoansRunner extends JestRunner {
  static filterTestsGivenCliArgs(tests) {
    const include = {}
    process.argv.forEach((arg) => {
      if (arg.startsWith(levelArgPrefix)) {
        include.levels = include.levels || []
        include.levels.push(Number(arg.substring(levelArgPrefix.length + 1)))
      }
      if (arg.startsWith(tagsArgPrefix)) {
        include.tags = arg.substring(tagsArgPrefix.length + 1).split(/\s/)
      }
    })
    return tests.filter((test) => {
      const { level, tags } = test.koans
      let result = !include.levels && !include.tags
      result = result || (include.levels?.length && include.levels.includes(level))
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
        basename(test.path, testSrcFileExtension),
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
