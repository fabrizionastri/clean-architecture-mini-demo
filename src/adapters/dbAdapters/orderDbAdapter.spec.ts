import { inMemoryDb } from 'mock/inMemoryDb'

import { orderInMemoryDbAdapter1, orderInMemoryDbAdapter2 } from './inMemory/orderInMemoryDbAdapter'
import { orderJsonServerDbAdapter1, orderJsonServerDbAdapter2 } from './jsonServer/orderJsonServerDbAdapter'

const orderDbAdapters = [
  { adapterName: 'orderInMemoryDbAdapter1', orderDbAdapter: orderInMemoryDbAdapter1 },
  { adapterName: 'orderJsonServerDbAdapter1', orderDbAdapter: orderJsonServerDbAdapter1 },
  { adapterName: 'orderInMemoryDbAdapter2()', orderDbAdapter: orderInMemoryDbAdapter2() },
  { adapterName: 'orderJsonServerDbAdapter2()', orderDbAdapter: orderJsonServerDbAdapter2() },
]

const orders = inMemoryDb.orders

describe('Order adapters → for each orderDbAdapter', () => {
  orderDbAdapters.forEach(({ adapterName, orderDbAdapter }) => {
    describe(adapterName, () => {
      describe('getById', () => {
        it('should return an order for valid id', async () => {
          const result = await orderDbAdapter.getById('order1')
          expect(result).toEqual(orders[1])
        })
        it('should return undefined for inexistant id', async () => {
          const result = await orderDbAdapter.getById('inexistant')
          expect(result).toEqual(undefined)
        })
      })

      describe('getAll', () => {
        it('return all orders when orders are present', async () => {
          const result = await orderDbAdapter.getAll()
          expect(result).toEqual(orders)
        })
      })
    })
  })
})
