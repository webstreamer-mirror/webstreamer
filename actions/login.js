'use strict'
const ActionHero = require('actionhero')

module.exports = class MyAction extends ActionHero.Action {
  constructor () {
    super()
    this.name = 'login'
    this.description = 'an actionhero action'
    this.outputExample = {}
  }

  async run (data) {
	data.response.hello="hello world"
    // your logic here
  }
}
