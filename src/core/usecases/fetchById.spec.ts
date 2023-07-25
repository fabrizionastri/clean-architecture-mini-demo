import { inMemory } from 'mock/inMemory'

import { scenarios } from './scenarios'

const orders = inMemory.orderDatas

describe('Usecase: fetchOrderById  → for each order gateway & adapter 1', () => {
  scenarios.forEach(({ scenario, fetch, adapter }) => {
    describe(scenario, () => {
      it('should return the order with the specified ID from the db', async () => {
        const result = await fetch(adapter)('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', async () => {
        const result = await fetch(adapter)('inexistant')
        expect(result).toEqual(undefined)
      })
    })
  })
})
