var Qs = require("querystring")
var assign = require("oolong").assign
var merge = require("oolong").merge

exports = module.exports = function(fetch) {
  return assign(exports.fetch.bind(null, fetch), fetch)
}

exports.fetch = function(fetch, url, opts) {
  if (opts != null && opts.form !== undefined) opts = merge({}, opts, {
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: Qs.stringify(opts.form)
  })

  return fetch(url, opts)
}
