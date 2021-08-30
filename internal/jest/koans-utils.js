const { parse } = require('jest-docblock')
const { readFileSync } = require('fs')

const koansUtils = {
  parseDecorators: (testSourceFile) => {
    const { coefficient, difficultyLevel, tags } = parse(readFileSync(testSourceFile, 'utf8')) || {}
    return {
      coefficient: koansUtils.toNumber(coefficient, 1),
      difficultyLevel: koansUtils.toNumber(difficultyLevel),
      tags: (tags || '').split(/\s/),
    }
  },
  toNumber: (value, defaultValue = undefined) =>
    typeof value !== 'string' || Number.isNaN(value) ? defaultValue : Number(value),
}

module.exports = koansUtils
