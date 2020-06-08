'use strict'
const config = require('../../config')

const mssql = require('mssql')

// Make sure this is private to this module
const dbConfig = {
  server: config.database.host,
  database: config.database.name,
  // Put login details in env. variables for security
  user: config.database.username,
  password: config.database.password,
  port: config.database.port,
  // Required for Azure
  options: {
    encrypt: true,
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
// Get a mssql connection instance
let isConnected = true
let connectionError = null
const pools = new mssql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
    console.log('Connected to DB')
    return pool
  })
  .catch(err => {
    // Handle errors
    isConnected = false
    connectionError = err
    console.log(err)
  })
module.exports = {
  sql: mssql,
  pools: pools,
  isConnected: isConnected,
  connectionError: connectionError
}
