var Sinon = require("sinon")
var Fetch = require("./fetch")
var fetch = require("..")(Fetch)
var URL = "https://example.com/models"

// Sinon appends charset to Content-Type:
// https://github.com/sinonjs/sinon/issues/607:
var FORM_TYPE = /^application\/x-www-form-urlencoded\b/

describe("FetchForm", function() {
  beforeEach(function() {
    var xhr = global.XMLHttpRequest = Sinon.FakeXMLHttpRequest
    xhr.onCreate = Array.prototype.push.bind(this.requests = [])
  })

  it("must return fetch with Headers, Request and Response", function() {
    fetch.Headers.must.equal(Fetch.Headers)
    fetch.Request.must.equal(Fetch.Request)
    fetch.Response.must.equal(Fetch.Response)
  })

  it("must request with form", function() {
    fetch(URL, {method: "POST", form: {name: "Patrick Jane"}})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(FORM_TYPE)
    this.requests[0].requestBody.must.equal("name=Patrick%20Jane")
  })

  it("must request with given Content-Type", function() {
    var body = {name: "Patrick Jane"}
    var type = "application/vnd.foo"
    fetch(URL, {method: "POST", headers: {"Content-Type": type}, form: body})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.include(type)
    this.requests[0].requestBody.must.equal("name=Patrick%20Jane")
  })

  // Even though it works right now, it depends on key insertion ordering.
  // Not a particularly robust approach.
  it("must request with given Content-Type if not capitalized", function() {
    var body = {name: "Patrick Jane"}
    var type = "application/vnd.foo"
    fetch(URL, {method: "POST", headers: {"content-type": type}, form: body})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.include(type)
    this.requests[0].requestBody.must.equal("name=Patrick%20Jane")
  })

  it("must request with form if body given", function() {
    fetch(URL, {method: "POST", form: {name: "Patrick Jane"}, body: "Nope"})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(FORM_TYPE)
    this.requests[0].requestBody.must.equal("name=Patrick%20Jane")
  })

  it("must request with form if null", function() {
    fetch(URL, {method: "POST", form: null})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders["content-type"].must.match(FORM_TYPE)
    this.requests[0].requestBody.must.equal("")
  })

  it("must not request with form if undefined", function() {
    fetch(URL, {method: "POST", form: undefined})

    this.requests[0].method.must.equal("POST")
    this.requests[0].url.must.equal(URL)
    this.requests[0].requestHeaders.must.be.empty()
    this.requests[0].must.have.property("requestBody", null)
  })

  it("must respond", function*() {
    var res = fetch(URL, {method: "POST", form: {name: "John"}})

    this.requests[0].respond(200, {}, "Hello")
    res = yield res
    res.status.must.equal(200)
    ;(yield res.text()).must.equal("Hello")
  })
})
