var Sinon = require("sinon")
var next = require("..")

describe("next", function() {
  it("must return a function", function() {
    next(function*(req, res, next) { yield }).must.be.a.function()
  })

  it("must call generator function", function() {
    var gen = Sinon.spy(function*(req, res, done) { yield [] })
    function done() {}
    next(gen).call(0, 1, 2, done)
    gen.callCount.must.equal(1)
    gen.firstCall.thisValue.must.equal(0)
    gen.firstCall.args.must.eql([1, 2, done])
  })

  it("must not call next function if all passes", function*() {
    var done = Sinon.spy()
    var fn = next(function*(req, res, done) { yield [] })
    yield fn(null, null, done)
    done.callCount.must.equal(0)
  })

  it("must call next function if an error is thrown", function*() {
    var done = Sinon.spy()
    var error = new Error
    var fn = next(function*(req, res, done) { yield []; throw error })

    yield fn(null, null, done)
    done.callCount.must.equal(1)
    done.firstCall.args[0].must.equal(error)
  })

  describe("given a generator function with 4 arguments", function() {
    it("must return a function", function() {
      var fn = next(function*(err, req, res, next) { yield [] })
      fn.must.be.a.function()
      fn.length.must.equal(4)
    })

    it("must call generator function", function() {
      var gen = Sinon.spy(function*(err, req, res, done) { yield [] })
      function done() {}
      next(gen).call(0, 1, 2, 3, done)
      gen.callCount.must.equal(1)
      gen.firstCall.thisValue.must.equal(0)
      gen.firstCall.args.must.eql([1, 2, 3, done])
    })

    it("must not call next function if all passes", function*() {
      var done = Sinon.spy()
      var fn = next(function*(err, req, res, done) { yield [] })
      yield fn(null, null, done)
      done.callCount.must.equal(0)
    })

    it("must call next function if an error is thrown", function*() {
      var done = Sinon.spy()
      var error = new Error
      var fn = next(function*(err, req, res, done) { yield []; throw error })

      yield fn(null, null, null, done)
      done.callCount.must.equal(1)
      done.firstCall.args[0].must.equal(error)
    })
  })
})
