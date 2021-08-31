const chalk = require('chalk')
const { basename, dirname, join, relative, resolve } = require('path')
const { BaseReporter } = require('@jest/reporters')
const { testSrcFileExtension } = require('./koans-utils')

const baseDir = resolve(__dirname, '..', '..')
const testSrcDir = join(baseDir, 'src', 'test')

class KoansReporter extends BaseReporter {
  constructor() {
    super()
    this.score = 0
    this.maxScore = 0
    this.testsReportSummary = []
  }

  onTestCaseResult(test, testCaseResult) {
    if (testCaseResult.failureMessages?.length) {
      this.log(
        [
          chalk.bgRed.white.bold('Test case failure:'),
          ' ',
          chalk.bold(testCaseResult.ancestorTitles.join(' - ')),
        ].join(''),
      )
      testCaseResult.failureMessages.forEach((failureMessage) => {
        this.log(failureMessage)
      })
    }
    super.onTestCaseResult(test, testCaseResult)
  }

  onTestFileResult(test, testResult) {
    if (testResult.skipped) {
      return
    }
    process.stdout.clearLine(-1)
    process.stdout.cursorTo(0)
    const { factor, level } = test.koans
    const testRelativePath = join(
      relative(testSrcDir, dirname(test.path)),
      basename(test.path, testSrcFileExtension),
    )
    const testPathDesc = `${chalk.bgGray(' ⇒ ')} Test ${testRelativePath.padEnd(
      test.maxLengthTestName,
      ' ',
    )}`
    const testMetadata = chalk.gray(
      `[ level: ${chalk.bold(level)}, factor: ${chalk.bold(factor)} ]`,
    )
    const testMaxScore = testResult.testResults.length * test.koans.factor
    const testScore = testResult.numPassingTests * test.koans.factor
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
    this.testsReportSummary.push(
      `${pass} ${testPathDesc} : ${noTestsDesc}, ${score} ${testMetadata}`,
    )
    this.maxScore += testMaxScore
    this.score += testScore
  }

  onTestFileStart(test) {
    const testRelativePath = join(
      relative(testSrcDir, dirname(test.path)),
      basename(test.path, testSrcFileExtension),
    )
    const testPathDesc = `${chalk.bgGray(' ⇒ ')} Test ${testRelativePath.padEnd(
      test.maxLengthTestName,
      ' ',
    )}`
    process.stdout.write(`${chalk.bgGray(testPathDesc)} …`)
  }

  onRunComplete(contexts, aggregatedResults) {
    this.testsReportSummary.forEach((testReportLine) => {
      this.log(testReportLine)
    })
    this.log(
      chalk.keyword('orange')(
        `\nTotal score: ${chalk.bold(Math.round((this.score * 100) / this.maxScore))} %\n`,
      ),
    )
    return super.onRunComplete(contexts, aggregatedResults)
  }
}

module.exports = KoansReporter
