'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:'"http://192.168.0.143:8013"'
  // API_HOST: '"http://localhost:4002"'
})
