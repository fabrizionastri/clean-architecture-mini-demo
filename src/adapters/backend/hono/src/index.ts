import { serve } from '@hono/node-server'
import { getAllOrdersForAccountId } from 'core/usecases/getAllOrdersForAccountId'
import { config } from 'dotenv'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
config() // load variables from .env into process.env
const DB_URL = process.env.DB_URL || 'http://localhost:8787'

import axios from 'axios'
const app = new Hono()

const API_PORT = process.env.PORT || 8787
app.use('/*', cors())
// app.use('/order/:accountId', cors())
// app.use('/db/:selectedDb', cors())
// app.use(
//   '/order/:accountId',
//   cors({
//     origin: '*',
//     allowHeaders: [
//       'Content-Type',
//       'Authorization',
//       'X-Custom-Header',
//       'Upgrade-Insecure-Requests',
//     ],
//     allowMethods: ['POST', 'GET', 'OPTIONS'],
//     exposeHeaders: ['Content-Length'],
//     maxAge: 600,
//     credentials: true,
//   })
// )

// ROUTES
app.post('/db/:selectedDb', async (c) => {
  const selectedDb: string = c.req.param('selectedDb')
  console.log('req path', c.req.path)
  console.log('Hono: POST Request → selectedDb', selectedDb)
  process.env.STORAGE_TYPE = selectedDb
  console.log('Hono: process.env.STORAGE_TYPE', process.env.STORAGE_TYPE)
  return c.text(selectedDb)
})

app.get('/order/:accountId', async (c) => {
  const accountId = c.req.param('accountId')
  console.log('req path', c.req.path)
  console.log('Hono: process.env.STORAGE_TYPE', process.env.STORAGE_TYPE)
  const orders = await getAllOrdersForAccountId(accountId)
  // console.log('orders', JSON.stringify(orders, null, 2))
  return c.json(orders)
})

app.get('/fab', (c) => c.text('Hello Fabrizio!'))
app.get('/', (c) => c.text('Hello Hono Fabrizio!'))
// serve(app)

// TEMPORARY - I'm cheating here and bypassing the adatpters and core
app.get('/:resource', async (c) => {
  const resource = c.req.param('resource')
  console.log('resource', resource)
  const url = `${DB_URL}/${resource}`
  console.log('url', url)
  return c.json((await axios.get(url)).data)
  // return c.text(`url = ${url}`)
})

console.log('Hono server listening on PORT ', API_PORT)
serve({
  fetch: app.fetch,
  port: API_PORT
})
// serve(app)
