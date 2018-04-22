'use strict'

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./data/schema')
// const jwt = require('express-jwt')
require('dotenv').config()

const PORT = 4000

const app = express()
app.use('*', cors({ origin: ['http://localhost:3000', '189.13.255.152:3000'] }))
// app.use('/api', bodyParser.json(), graphqlExpress(req => ({
// schema // ,
// context: {
// authUser: req.user
// }
// })))

app.use('/api', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: 'api' }))

app.listen(process.env.PORT || PORT, () => {
  console.log(`GraphiQL is running on http://localhost:${PORT}/graphiql`)
})
