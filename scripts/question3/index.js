import * as R from 'ramda'
import * as fs from 'fs'

// To run, type in `node scripts/question3` in the command line
const puzzleInput = fs.readFileSync('scripts/question3/listInput.txt', 'utf8')

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26
}

const numberOfLettersInAlphabet = 26

const mapLetterToNumber = (letter) => {
  if (letterToNumber[letter]) {
    return letterToNumber[letter]
  }
  // uppercase letters
  return letterToNumber[letter.toLowerCase()] + numberOfLettersInAlphabet
}

const sumOfPriorities = R.pipe(
  R.split('\n'),
  R.map((val) => R.splitAt(R.length(val) / 2)(val)),
  R.map(([firstCompartment, secondCompartment]) => R.intersection(firstCompartment, secondCompartment)),
  R.flatten,
  R.map(mapLetterToNumber),
  R.sum
)(puzzleInput)

console.log('Step 1: Sum of priorities of items in both compartments: ' + sumOfPriorities)

const sumOfPriorityOfBadges = R.pipe(
  R.split('\n'),
  R.splitEvery(3),
  R.map(([rucksack1, rucksack2, rucksack3]) => {
    const inFirstTwoRucksacks = R.intersection(rucksack1, rucksack2)
    return R.intersection(inFirstTwoRucksacks, rucksack3)
  }),
  R.flatten,
  R.map(mapLetterToNumber),
  R.sum
)(puzzleInput)

console.log('Step 2: Sum of priorities of badges found: ' + sumOfPriorityOfBadges)