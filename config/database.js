const host = 'localhost'

const port = 27017

const user = 'cakemania'
const password = 'cake'
const database = 'cakeBlog'

const options = {
  connectTimeoutMS: 2000,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE, 
  reconnectInterval: 100, 
  poolSize: 10, 
  bufferMaxEntries: 0
}

const uri = `mongodb://${user}:${password}@${host}:${port}/${database}?authMechanism=SCRAM-SHA-1`

module.exports = {
  uri: uri,
  options: options
}
