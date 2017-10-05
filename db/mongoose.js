import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test', {useMongoClient: true})

export default class DbHandler {
  constructor (url) {
    this.url = url
    this.mongoose = mongoose.createConnection(this.url)
  }
}
