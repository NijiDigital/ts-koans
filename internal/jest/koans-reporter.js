const chalk = require('chalk')
const { basename, dirname, join, relative, resolve } = require('path')
const { BaseReporter } = require('@jest/reporters')

const baseDir = resolve(__dirname, '..', '..')
const testSrcDir = join(baseDir, 'src', 'test')

class KoansReporter extends BaseReporter {
  constructor() {
    super()
    this.score = 0
    this.maxScore = 0
  }

  onTestFileResult(test, testResult) {
    if (testResult.skipped) {
      return
    }
    const { coefficient, difficultyLevel } = test.koans
    const testRelativePath = join(
      relative(testSrcDir, dirname(test.path)),
      basename(test.path, '.test.ts'),
    )
    const testPathDesc = `${chalk.bgGray(' ⇒ ')} Test ${testRelativePath.padEnd(
      test.maxLengthTestName,
      ' ',
    )}`
    const testMetadata = chalk.gray(
      `[difficulty: ${chalk.bold(difficultyLevel)}, coefficient: ${chalk.bold(coefficient)}]`,
    )
    const testMaxScore = testResult.testResults.length * test.koans.coefficient
    const testScore = testResult.numPassingTests * test.koans.coefficient
    const pass =
      testResult.numPassingTests === testResult.testResults.length
        ? chalk.bgGreen.white.bold(' ✔ ')
        : chalk.bgRed.white.bold(' 𐄂 ')
    const score = chalk.keyword('orange')(
      `score: ${chalk.bold(
        Math.round((testScore * 100) / testMaxScore)
          .toString()
          .padStart(3, ' '),
      )} %`,
    )
    const noTestsDesc = `${testResult.numPassingTests
      .toString()
      .padStart(3, ' ')}/${testResult.testResults.length.toString().padStart(3, ' ')}`
    this.log(`${pass} ${testPathDesc} : ${noTestsDesc}, ${score} ${testMetadata}`)
    this.maxScore += testMaxScore
    this.score += testScore
  }

  onRunComplete(contexts, aggregatedResults) {
    this.log(
      chalk.keyword('orange')(
        `\nTotal score: ${chalk.bold(Math.round((this.score * 100) / this.maxScore))} %\n`,
      ),
    )
    return super.onRunComplete(contexts, aggregatedResults)
  }
}

module.exports = KoansReporter
