const container = require('./moduleA')

container.whenSaved((value) => {
  console.log('1 ', value)
})

setTimeout(() => {
  container.whenSaved((value) => {
    console.log('2 ', value)
  })

}, 200)

// EVENT QUEUE
// [timeoutOf20, timeoutOf200]
// 20 msecs pass...
// 200 msecs pass
