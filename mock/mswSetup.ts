import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { orderDatas, orders } from './inMemory'

export const handlers = [
  rest.get('http://localhost:3057/order', (_req, res, ctx) => {
    //_req pour dire qu'on l'utilise pas
    return res(ctx.status(200), ctx.json({ prout: 'prout' }))
  }),
  rest.get('http://localhost:3000/account0', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ prout: 'prout' }))
  }),
  rest.get('http://localhost:3000/account99', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  }),
]

export const server = setupServer(...handlers)

beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
