'use strict'
const ActionHero = require('actionhero')

module.exports = class LoginAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'login'
    this.description = 'Webstreamer login action'
    this.outputExample = {}
  }

  async run (data) {
    data.response.token = 'webstreamer'
    // your logic here
  }
}
