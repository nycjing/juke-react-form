'use strict';

// new $Promise(function (resolve, reject) {
//   fs.readFile('asdf', function (err,data) {
//     resolve(data)
//   })
// })

// function isFn (thing) {
//   return typeof thing === 'function'
// }
const isFn = (thing) => typeof thing === 'function'


function $Promise (executor) {

  if (!isFn(executor)) {
    throw new TypeError('Need an executor function, my friend...')
  }

  this._state = 'pending'
  this._handlerGroups = []

  this._internalResolve = this._internalResolve.bind(this)
  this._internalReject = this._internalReject.bind(this)

  executor(this._internalResolve, this._internalReject)
}

Object.assign($Promise.prototype, {

  _internalResolve (data) {
    if (this._state !== 'pending') return

    this._state = 'fulfilled'
    this._value = data
    this._callHandlers()
  },

  _internalReject (reason) {
    if (this._state !== 'pending') return

    this._state = 'rejected'
    this._value = reason
    this._callHandlers()
  },

  then (successCb, errorCb) {

    // noop or no-op
    const downstreamPromise = new $Promise(() => {})

    this._handlerGroups.push({
      successCb: isFn(successCb) ? successCb : null,
      errorCb: isFn(errorCb) ? errorCb : null,
      downstreamPromise
    })

    this._callHandlers()
    return downstreamPromise
  },

  catch (errorCb) {
    return this.then(null, errorCb)
  },

  _callHandlers () {

    if (this._state === 'pending') return

    this._handlerGroups.forEach(handler => {

      const {successCb, errorCb, downstreamPromise} = handler

      if (this._state === 'fulfilled') {

        // 1. Fulfilled, no success handler
        if (!isFn(successCb)) {
          downstreamPromise._internalResolve(this._value)
        } else {
          try {
            const thingThatSuccessCbReturns = successCb(this._value)
            if (thingThatSuccessCbReturns instanceof $Promise) {
              // 7. Fulfilled, has a success handler that returns a promise
              const promiseZ = thingThatSuccessCbReturns
              const promiseB = downstreamPromise
              promiseZ.then(promiseB._internalResolve, promiseB._internalReject)
            } else {
              // 3. Fulfilled, has a success handler that returns x
              downstreamPromise._internalResolve(thingThatSuccessCbReturns)
            }
          } catch (err) {
            // 5. Fulfilled, has a success handler that throws an error
            downstreamPromise._internalReject(err)
          }
        }

      } else if (this._state === 'rejected') {

        // 2. Rejected, no error handler
        if (!isFn(errorCb)) {
          downstreamPromise._internalReject(this._value)
        } else {
          try {
            const thingThatErrorHandlerReturns = errorCb(this._value)
            if (thingThatErrorHandlerReturns instanceof $Promise) {
              // 8. Rejected, has an error handler that returns a promise
              thingThatErrorHandlerReturns.then(
                downstreamPromise._internalResolve,
                downstreamPromise._internalReject
              )
            } else {
              // 4. Rejected, has an error handler that returns x
              downstreamPromise._internalResolve(thingThatErrorHandlerReturns)
            }
          } catch (err) {
            // 6. Rejected, has an error handler that throws an error
            downstreamPromise._internalReject(err)
          }
        }

      }
    })

    this._handlerGroups = []
  }

})
