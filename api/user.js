'use strict'

var _USERs = {}

function add (token, info) {
  return new Promise((resolve, reject) => {
    if (_USERs[token]) {
      reject(Error('token already exists'))
    } else {
      _USERs[token] = info
      resolve()
    }
  })
}

function remove (token) {
  return new Promise((resolve, reject) => {
    if (_USERs[token]) {
      delete _USERs[token]
      resolve()
    } else {
      reject(Error('token not exists'))
    }
  })
}

function getUserInfo (token) {
  return new Promise((resolve, reject) => {
    if (_USERs[token]) {
      resolve(_USERs[token])
    } else {
      reject(Error('token not exists'))
    }
  })
}
module.exports = {
  add,
  remove,
  getUserInfo
}
