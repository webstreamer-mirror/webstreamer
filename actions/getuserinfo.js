'use strict'
const ActionHero = require('actionhero')
// const user = require('../api/user')

module.exports = class GetUserInfo extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'getuserinfo'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
    try {
      // var token = data.token
      // data.response.info = await user.getUserInfo(token)
      data.response = {
        username: 'admin'
      }
    } catch (error) {
      data.response.error = error
    }
  }
}
