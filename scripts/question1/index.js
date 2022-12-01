import * as R from 'ramda'
import * as fs from 'fs'

// To run, type in `node scripts/question1` in the command line
const list = fs.readFileSync('scripts/question1/listInput.txt', 'utf8')

const topElvesByCaloriesGroupedAndSorted = R.pipe(
  R.split('\n'),
  R.splitWhenever(R.equals('')),
  R.map(R.filter((val) => val !== '')),
  R.map(R.sum),
  R.sort((a, b) => b - a)
)(list)

const elfCarryingMostCalories = R.head(topElvesByCaloriesGroupedAndSorted)

console.log('Elf carrying most calories: ' + elfCarryingMostCalories)

const top3ElvesTotalCalories = R.pipe(
  R.take(3),
  R.sum
)(topElvesByCaloriesGroupedAndSorted)

console.log('Total calories of top 3 elves: ' + top3ElvesTotalCalories)