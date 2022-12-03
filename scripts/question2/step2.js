import * as R from 'ramda'
import * as fs from 'fs'

// To run, type in `node scripts/question2/step2` in the command line
const puzzleInput = fs.readFileSync('scripts/question2/listInput.txt', 'utf8')

const ROCK = 'Rock'
const PAPER = 'Paper'
const SCISSORS = 'Scissors'
const opponentMappings = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS
}

const myResultMappings = {
  X: 'Lose',
  Y: 'Draw',
  Z: 'Win'
}

const rockPointScore = 1
const paperPointScore = 2
const scissorsPointScore = 3

const winningPointScore = 6
const drawPointScore = 3
const losePointScore = 0

const getTournamentScore = (opponentResult, myResult) => {
  if (myResult === 'Win' && opponentResult === SCISSORS) {
    return rockPointScore + winningPointScore
  } else if (myResult === 'Lose' && opponentResult === ROCK) {
    return scissorsPointScore + losePointScore
  } else if (myResult === 'Win' && opponentResult === PAPER) {
    return scissorsPointScore + winningPointScore
  } else if (myResult === 'Lose' && opponentResult === SCISSORS) {
    return paperPointScore + losePointScore
  } else if (myResult === 'Win' && opponentResult === ROCK) {
    return paperPointScore + winningPointScore
  } else if (myResult === 'Lose' && opponentResult === PAPER) {
    return rockPointScore + losePointScore
  } else if (myResult === 'Draw' && opponentResult === SCISSORS) {
    return scissorsPointScore + drawPointScore
  } else if (myResult === 'Draw' && opponentResult === PAPER) {
    return paperPointScore + drawPointScore
  } else if (myResult === 'Draw' && opponentResult === ROCK) {
    return rockPointScore + drawPointScore
  } else {
    // Should not get here - for debugging purposes only
    return { opponentResult, myResult }
  }
}

const tournamentScore = R.pipe(
  R.split('\n'),
  R.map(R.split(' ')),
  R.map(([opponentResult, myResult]) => getTournamentScore(opponentMappings[opponentResult], myResultMappings[myResult])),
  R.sum
)(puzzleInput)

console.log('Updated tournament score following clarification of strategy guide: ' + tournamentScore)