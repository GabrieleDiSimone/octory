import url from 'url'
import querystring from 'querystring'
import server from 'lib/server/interfaces/http'

class ResponseHttp {
  constructor (res) {
    this.res = res
  }

  send (err = null, data = null) {
    this.res.writeHead(200)
    this.res.end(JSON.stringify({
      err: err,
      data: data
    }))
  }
}

export default class HttpServer {
  constructor (port, modulesHandler) {
    this.modulesHandler = modulesHandler
    this.port = port
  }

  start () {
    this.app = server.createServer(this.httpHandlerFunction(this.modulesHandler))
    this.app.listen(this.port)
  }

  httpHandlerFunction (modulesHandler) {
    return (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
      let request = url.parse(req.url) // TODO: implements methods GET, POST, ETC
      let path = request.pathname
      let query = request.query
      let params = querystring.parse(query)
      let connection = new ResponseHttp(res)
      let action = modulesHandler.mapActions[path]
      if (action && (!action.auth || params.auth === action.auth)) {
        action.handler(connection, params)
      } else {
        connection.send('notExists')
      }
    }
  }
}
