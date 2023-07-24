import { inMemory } from '../../../mock/inMemory'
import {
  orderAdapterInMemory1,
  orderAdapterInMemory2,
} from './inMemory/orderAdapterInMemory'
import {
  orderAdapterJsonServer1,
  orderAdapterJsonServer2,
} from './jsonServer/orderAdapterJsonServer'

const scenarios = [
  { adapterName: 'orderAdapterInMemory1', orderAdapter: orderAdapterInMemory1 },
  {
    adapterName: 'orderAdapterJsonServer1',
    orderAdapter: orderAdapterJsonServer1,
  },
  {
    adapterName: 'orderAdapterInMemory2()',
    orderAdapter: orderAdapterInMemory2(),
  },
  {
    adapterName: 'orderAdapterJsonServer2()',
    orderAdapter: orderAdapterJsonServer2(),
  },
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
