import express, { Express, Request, Response } from 'express'
import expressEjsLayouts from 'express-ejs-layouts'

import { orderGateway2 } from '../../../core/gateways/orderGateway'
import { fetchOrderById1, fetchOrderById2 } from '../../../core/usecases/fetchById'
import { orderAdapterInMemory1, orderAdapterInMemory2 } from '../../database/inMemory/orderAdapterInMemory'
import { orderAdapterJsonServer1, orderAdapterJsonServer2 } from '../../database/jsonServer/orderAdapterJsonServer'

// SERVER SET UP

const expressPort = 3001
const expressUrl = `http://localhost:${expressPort}`
const app: Express = express()

app.set('view engine', 'ejs') // sets the default engine for EJS files, meaning that you can use res.render('fileName') instead of res.render('fileName', {extension: 'ejs'}).
app.use(expressEjsLayouts) // use express-ejs-layouts as the layout engine
// app.set('views', new URL('./views', import.meta.url).pathname)
// app.set('views', path.join(__dirname, '/views')) // set the default folder for ejs files. use the path.join to merge the path of the current direct(__dirname property) and 'views' folder into an absolute path
app.set('views', './src/adapters/front/express/views')

app.use(express.urlencoded({ extended: true })) // To parse incoming URL-encoded requests (form data in POST request body). Important : if you do not do this, you won't be able to get data from a POST request body
app.use(express.json()) // To parse incoming JSON requests. Important : if you do not do this, you won't be able to get data from a POST request body

// DATABASE SET UPù

app.get('/', (_req: Request, res: Response) => {
  res.render('index', { expressUrl })
})

// app.get('/order', async (_req: Request, res: Response) => {
//   const orders = await orderStore.getAll()
//   // res.send(JSON.stringify(orders))
//   res.render('order-all', { orders })
// })

const createOrderRoute = (fetchOrderById: any, orderAdapter: any) => {
  return async (req: Request, res: Response) => {
    const id = req.params.id
    const order = await fetchOrderById(orderAdapter)(id)
    if (order) {
      res.render('order-detail', { order })
    } else {
      res.send('Order not found')
    }
  }
}

app.get('/orderAdapterInMemory1/:id', createOrderRoute(fetchOrderById1, orderAdapterInMemory1))

app.get('/orderAdapterInMemory2/:id', createOrderRoute(fetchOrderById2, orderGateway2(orderAdapterInMemory2())))

app.get('/orderAdapterJsonServer1/:id', createOrderRoute(fetchOrderById1, orderAdapterJsonServer1))

app.get('/orderAdapterJsonServer2/:id', createOrderRoute(fetchOrderById2, orderGateway2(orderAdapterJsonServer2())))

// SERVER LISTENING

app.use((_req: Request, res: Response) => {
  res.status(404).send('Page not found')
})

app.listen(expressPort, () => {
  console.log(`⚡️Server is running at ${expressUrl}`)
})
