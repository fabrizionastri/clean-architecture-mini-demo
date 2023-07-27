import express, { Express, Request, Response } from 'express'

import { OrderData, scenarios } from '../../../core/coreIndex'

// SERVER SET UP

const expressPort = 3001
const expressUrl = `http://localhost:${expressPort}`
const app: Express = express()

app.use(express.urlencoded({ extended: true })) // To parse incoming URL-encoded requests (form data in POST request body). Important : if you do not do this, you won't be able to get data from a POST request body
app.use(express.json()) // To parse incoming JSON requests. Important : if you do not do this, you won't be able to get data from a POST request body

// DATABASE SET UP

app.get('/', async (_req: Request, res: Response) => {
  interface Result {
    scenario: string
    order: OrderData
  }
  const results: Result[] = []
  for (const scenario of scenarios) {
    const order = await scenario.fetch(scenario.adapter)('order1')
    results.push({ scenario: scenario.scenario, order })
  }
  res.render('order-scenarios', { results })
})

// SERVER LISTENING

app.use((_req: Request, res: Response) => {
  res.status(404).send('Page not found')
})

app.listen(expressPort, () => {
  console.log(`⚡️Server is running at ${expressUrl}`)
})
