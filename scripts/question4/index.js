import * as R from 'ramda'
import * as fs from 'fs'

// To run, type in `node scripts/question4` in the command line
const puzzleInput = fs.readFileSync('scripts/question4/listInput.txt', 'utf8')

const convertPairToNumbers = (pair) => {
  return [Number(pair[0]), Number(pair[1])]
}

const convertPairToRange = (pair) => {
  return R.range(pair[0], pair[1] + 1)
}

const numberIsIncludedInRange = (numberToCompare, range) => {
  return R.findIndex(R.equals(numberToCompare), range)
}

const pairHasMatch = (firstPair, secondPair) => {
  const range = convertPairToRange(secondPair)
  const firstNumberIndex = numberIsIncludedInRange(firstPair[0], range)
  const secondNumberIndex = numberIsIncludedInRange(firstPair[1], range)
  return firstNumberIndex >= 0 && secondNumberIndex >= 0
}

const convertPuzzleInputToNumberPairs = R.pipe(
  R.split('\n'),
  R.map(R.split(',')),
  R.map(R.map(R.split('-'))),
  R.map(([firstPair, secondPair]) => {
    return [convertPairToNumbers(firstPair), convertPairToNumbers(secondPair)]
  })
)

const numberOfOverlappingRange = R.pipe(
  convertPuzzleInputToNumberPairs,
  R.map(([firstPair, secondPair]) => {
    const firstPairMatch = pairHasMatch(firstPair, secondPair)
    const secondPairMatch = pairHasMatch(secondPair, firstPair)
    return firstPairMatch || secondPairMatch
  }),
  R.filter(R.equals(true)),
  R.length
)(puzzleInput)

console.log('Step 1: Number of overlapping number ranges that are a subset of the other pair: ' + numberOfOverlappingRange)

const numberOfTasksWithOverlappingNumbers = R.pipe(
  convertPuzzleInputToNumberPairs,
  R.map(([firstPair, secondPair]) => {
    const firstPairRange = convertPairToRange(firstPair)
    const secondPairRange = convertPairToRange(secondPair)
    return R.intersection(firstPairRange, secondPairRange)
  }),
  R.reject(R.isEmpty),
  R.length
)(puzzleInput)

console.log('Step 2: Number of pairs that have any overlapping numbers at all: ' + numberOfTasksWithOverlappingNumbers)