var Qs = require("querystring")
var assign = require("oolong").assign
var defaults = require("oolong").defaults
var CONTENT_TYPE = "application/x-www-form-urlencoded"
var CONTENT_TYPE_HEADER = /^content-type$/i

exports = module.exports = function(fetch) {
  return assign(exports.fetch.bind(null, fetch), fetch)
}

exports.fetch = function(fetch, url, opts) {
  if (opts && opts.form !== undefined) opts = exports.stringify(url, opts)
  return fetch(url, opts)
}

exports.stringify = function(url, opts) {
  return defaults({
    headers: addContentType(opts.headers),
    body: Qs.stringify(opts.form)
  }, opts)
}

function addContentType(headers) {
  if (headers && hasContentType(headers)) return headers
  else return defaults({"Content-Type": CONTENT_TYPE}, headers)
}

function hasContentType(headers) {
  for (var name in headers) if (CONTENT_TYPE_HEADER.test(name)) return true
  return false
}
