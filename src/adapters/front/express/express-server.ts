import express, { Express, Request, Response } from 'express'
import expressEjsLayouts from 'express-ejs-layouts'

import { Order, scenarios } from '../../../core/coreIndex'

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

app.get('/', async (_req: Request, res: Response) => {
  interface Result {
    scenario: string
    order: Order
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
