const fileA = require('./fileA')
const fileAAgain = require('./fileA')
const fs = require('fs')
const express = require('express')

// console.log(fileA.clubhousePassword)
// console.log(fileA.clubhouseMembers)
const fileContents = fs.readFileSync('./README.md', 'utf-8')

fs.readFile('./README.md', 'utf-8', function (err, fileContents) {
  console.log(fileContents)
})

// sneak peek!
// const promiseForFile = fs.readFileAndReturnAPromise('./README.md', 'utf-8')
// promiseForFile.then(function (fileContents) {
//   console.log(fileContents)
// })

console.log('Welcome to the clubhouse!')

// console.log(fileContents)

// console.log(express)

// function maybeGetFileA () {
//   require('./fileA')
// }
//
// if (something) {
//   require('./fileA')
//
// }

// console.log(fileA.counter)
//
// setInterval(() => {
//   console.log('Club life')
// }, 2000)
