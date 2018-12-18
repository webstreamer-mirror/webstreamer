'use strict'
const ActionHero = require('actionhero')
// const user = require('../api/user')

module.exports = class Login extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'login'
    this.description = 'Webstreamer login action'
    this.outputExample = {}
  }

  async run (data) {
    try {
      // var info = await user.add(_TokenCount, data.param)
      data.response.token = 'admin'
      // data.response.info = info
    } catch (error) {
      data.response.error = error
    }
  }
}
