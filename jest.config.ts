import { Config } from 'jest';

export default {
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
} as Config;