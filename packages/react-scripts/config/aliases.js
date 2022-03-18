'use strict';

const path = require('path')
const jsConfig = require(path.join(path.relative(__dirname, process.cwd()), 'jsconfig'))

const aliases = {}
const rawPaths = jsConfig.compilerOptions.paths

// remap paths from the jsconfig path which is the single source of truth
for (const [key, value] of Object.entries(rawPaths)) {
  const cleanKey = key.replace('/*', '').replace('./', '')

  if (!Array.isArray(value) && value.length !== 1) {
    throw new Error(
      'Unable to handle alias paths with multiple options. Please update "config/aliases.js" to handle this'
    )
  }

  const cleanValue = value[0].replace('/*', '').replace('./', '')

  const appRoot = process.cwd()

  aliases[cleanKey] = `${appRoot}/${cleanValue}`
}

module.exports = {
  ...aliases
}