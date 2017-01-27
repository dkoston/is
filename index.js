'use strict'

const tld = require('tldjs')
const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
const uuidRE = new RegExp('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]' +
  '{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$')
const dateRE = new RegExp('^[\\d]{4}-[\\d]{2}-[\\d]{2}T[\\d]{2}:[\\d]{2}:' +
  '[\\d]{2}.[\\d]{3}(Z|[\\+\\-][\\d]{2}:[\\d]{2})$')

exports.isDate = function isDate(d) {
  if (!d) return false
  if (typeof d === 'object' && d.toISOString) {
    return dateRE.test(d.toISOString())
  }
  return dateRE.test(d)
}

exports.isEmail = function isEmail(s) {
  return tld.tldExists(s) && emailRE.test(s) && s.length < 255
}

// TODO(evanlucas) benchmark the difference between the current implementation
// and using a a custom implementation.
exports.isUUID = function isUUID(s) {
  if (typeof s !== 'string') return false
  if (s.length !== 36) return false
  return uuidRE.test(s)
}
