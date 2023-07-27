import express, { Express, Request, Response } from 'express'

// import { getAllOrdersForAccountId } from '../../../core/usecases/getAllOrdersForAccountId'

// SERVER SET UP

const expressPort = 3001
const expressUrl = `http://localhost:${expressPort}`
const app: Express = express()

app.use(express.urlencoded({ extended: true })) // To parse incoming URL-encoded requests (form data in POST request body). Important : if you do not do this, you won't be able to get data from a POST request body
app.use(express.json()) // To parse incoming JSON requests. Important : if you do not do this, you won't be able to get data from a POST request body

// DATABASE SET UP

// app.get('/orders/:accountId', async (req: Request, res: Response) => {
//   try {
//     const orders = await getAllOrdersForAccountId(req.params.accountId)
//     res.json(orders)
//   } catch (error: any) {
//     res.status(500).json({ message: error.message })
//   }
// })

app.get('/', async (_req: Request, res: Response) => {
  res.send('Hello Express!')
})

// SERVER LISTENING

app.use((_req: Request, res: Response) => {
  res.status(404).send('Page not found')
})

app.listen(expressPort, () => {
  console.log(`⚡️Server is running at ${expressUrl}`)
})
