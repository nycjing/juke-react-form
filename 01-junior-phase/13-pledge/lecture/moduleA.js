const container = {

  state: 'pending',
  save: function (value) {
    this.state = 'fulfilled'
    this.value = value
    this.callback(value)
  },

  whenSaved: function (callbackFn) {
    if (this.state === 'fulfilled') {
      callbackFn(this.value)
    } else {
      this.callback = callbackFn
    }
  }
}

setTimeout(() => {
  container.save('Cody')
}, 20)

module.exports = container
