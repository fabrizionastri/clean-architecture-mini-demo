import {
  orderAdapter1 as orderInMemoryAdapter1,
  orderAdapter2 as orderInMemoryAdapter2,
} from 'adapters/inMemory/orderInMemoryAdapter'
import {
  orderAdapter1 as orderJsonServerAdapter1,
  orderAdapter2 as orderJsonServerAdapter2,
} from 'adapters/jsonServer/orderJsonServerAdapter'
import { inMemory } from 'mock/inMemory'

const scenarios = [
  { adapterName: 'orderInMemoryAdapter1', orderAdapter: orderInMemoryAdapter1 },
  { adapterName: 'orderJsonServerAdapter1', orderAdapter: orderJsonServerAdapter1 },
  { adapterName: 'orderInMemoryAdapter2()', orderAdapter: orderInMemoryAdapter2() },
  { adapterName: 'orderJsonServerAdapter2()', orderAdapter: orderJsonServerAdapter2() },
]

const orders = inMemory.orders

describe('Order adapters → for each orderAdapter', () => {
  scenarios.forEach(({ adapterName, orderAdapter }) => {
    describe(adapterName, () => {
      describe('getById', () => {
        it('should return an order for valid id', async () => {
          const result = await orderAdapter.getById('order1')
          expect(result).toEqual(orders[1])
        })
        it('should return undefined for inexistant id', async () => {
          const result = await orderAdapter.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orders when orders are present', async () => {
          const result = await orderAdapter.getAll()
          expect(result).toEqual(orders)
        })
      })
    })
  })
})
