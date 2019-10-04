
const processStdoutWrite = process.stdout.write.bind(process.stdout)
const nock = require('nock')

nock.disableNetConnect()

process.stdout.write = (str, encoding, cb) => {
    if (!str.match(/^::debug::/)) {
        return processStdoutWrite(str, encoding, cb)
    }
    return false
}

module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    transformIgnorePatterns: ['^.+\\.js$'],
    verbose: true
}