const { parse } = require('jest-docblock')
const { readFileSync } = require('fs')

const koansUtils = {
  parseDecorators: (testSourceFile) => {
    const { factor, level, tags } = parse(readFileSync(testSourceFile, 'utf8')) || {}
    return {
      factor: koansUtils.toNumber(factor, 1),
      level: koansUtils.toNumber(level),
      tags: (tags || '').split(/\s/),
    }
  },
  testSrcFileExtension: '.test.ts',
  toNumber: (value, defaultValue = undefined) =>
    typeof value !== 'string' || Number.isNaN(value) ? defaultValue : Number(value),
}

module.exports = koansUtils
