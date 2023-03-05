import path from 'node:path';
import jest from 'jest';

const root: string = path.resolve(__dirname);

export default {
  rootDir: root,
  displayName: 'root-tests',
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
    '@/src/(.*)': '<rootDir>/src/$1',
    '@/test/(.*)': '<rootDir>/test/$1'
  }
} as jest.Config;