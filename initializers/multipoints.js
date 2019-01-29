'use strict'
const ActionHero = require('actionhero')

module.exports = class MyInitializer extends ActionHero.Initializer {
  constructor () {
    super()
    this.name = 'multipoints'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    ActionHero.api['multipoints'] = {}
  }

  async start () {}
  async stop () {}
}
