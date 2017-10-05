import HttpServer from './interfaces/http'
import SocketServer from './interfaces/websocket'

// TODO: add HTTP/2
// TODO: add HTTPS
export default class InterfaceHandler {
  constructor (modulesHandler, port = 8080, socketEnabled = true) {
    this.modulesHandler = modulesHandler
    this.port = port
    this.socketEnabled = socketEnabled
  }

  start () {
    this.httpServer = new HttpServer(this.port, this.modulesHandler)
    this.httpServer.start()

    if (this.socketEnabled) {
      this.socketServer = new SocketServer(this.httpServer, this.modulesHandler)
      this.socketServer.start()
    }
  }
}
