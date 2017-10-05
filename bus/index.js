import io from 'socket.io-client'

export default class BusHandler {
  constructor (url, modulesHandler) {
    this.url = url
    this.actions = {}
    this.modulesHandler = modulesHandler
  }

  start () {
    this.socket = io.connect(this.url)
    this.socket.on('connect', () => {
      this.actionsHandler()
      this.registerModules()
    })
  }

  actionsHandler () {
    this.socket.on('actions', (action) => {
      this.actions[action.name] = action
    })
  }

  registerModules () {
    if (this.modulesHandler) {
      let modules = this.modulesHandler.modules
      this.socket.emit('register', modules)
    }
  }
}
