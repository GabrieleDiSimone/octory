import socketIo from 'socket.io'
// TODO: emit function
// TODO: create rooms and events for each module
class ResponseSocket {
  constructor (socket, socketCallback) {
    this.socket = socket
    this.send = socketCallback
  }

  static voidCallback () {}
}

// TODO: implements methods GET, POST, ETC
export default class SocketServer {
  constructor (httpServer, modulesHandler) {
    this.httpServer = httpServer
    this.modulesHandler = modulesHandler
  }

  start () {
    this.io = socketIo(this.httpServer.app)
    this.io.on('connect', this.socketHandlerFunction(this.modulesHandler))
  }

  socketHandlerFunction (modulesHandler) {
    return (socket) => {
      let mapActions = modulesHandler.mapActions
      if (mapActions['connect']) {
        mapActions['connect'](ResponseSocket.voidCallback, null)
      }
      Object.keys(mapActions).forEach(key => {
        let action = mapActions[key]
        socket.on(key, (params, socketCallbackParam) => {
          if (!action.auth || params.auth === action.auth) {
            let socketCallback = typeof socketCallbackParam === 'function' ? socketCallbackParam : ResponseSocket.voidCallback
            let connection = new ResponseSocket(socket, socketCallback)
            action.handler(connection, params)
          }
        })
      })
    }
  }
}
