import { serve } from '@hono/node-server'
import { getAllOrdersForAccountId } from 'core/usecases/getAllOrdersForAccountId'
import { config } from 'dotenv'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
config() // load variables from .env into process.env

const app = new Hono()
app.use('/:accountId', cors())
app.use(
  '/:accountId',
  cors({
    origin: '*',
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Custom-Header',
      'Upgrade-Insecure-Requests',
    ],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

app.get('/', (c) => c.text('Hello Hono!'))

app.get('/fab', (c) => c.text('Hello Fabrizio!'))

app.get('/:accountId', async (c) => {
  const accountId = c.req.param('accountId')
  console.log('req header', c.req.header().origin)
  console.log('process.env.STORAGE_TYPE avant', process.env.STORAGE_TYPE)
  process.env.STORAGE_TYPE = 'inMemory'
  console.log('process.env.STORAGE_TYPE après', process.env.STORAGE_TYPE)
  const orders = await getAllOrdersForAccountId(accountId)
  console.log('orders', orders)
  return c.json(orders)
})

serve(app)
