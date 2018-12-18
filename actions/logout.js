'use strict'
const ActionHero = require('actionhero')
// const user = require('../api/user')

module.exports = class Logout extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'logout'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    try {
      // var token = data.token
      // await user.remove(token)
    } catch (error) {
      data.response.error = error
    }
  }
}
