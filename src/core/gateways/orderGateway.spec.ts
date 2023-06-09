import { orderInMemoryDbAdapter1, orderInMemoryDbAdapter2 } from 'adapters/dbAdapters/inMemory/orderInMemoryDbAdapter'
import {
  orderJsonServerDbAdapter1,
  orderJsonServerDbAdapter2,
} from 'adapters/dbAdapters/jsonServer/orderJsonServerDbAdapter'
import { inMemoryDb } from 'mock/inMemoryDb'

import { orderGateway2, orderGateway3 } from './orderGateway'

const orders = inMemoryDb.orders

const orderDbGateways1 = [
  { scenario: 'gateway 1 + json', orderDbAdapter: orderInMemoryDbAdapter1 },
  { scenario: 'gateway 1 + in memory', orderDbAdapter: orderJsonServerDbAdapter1 },
]

describe('Order gateways 1 → for each order adapter', () => {
  orderDbGateways1.forEach(({ scenario, orderDbAdapter }) => {
    describe(scenario, () => {
      it('should return all orders from the db', async () => {
        const result = await orderDbAdapter.getAll()
        return expect(result).toEqual(orders)
      })

      it('should return the order with the specified ID from the db', async () => {
        const result = await orderDbAdapter.getById('order1')
        return expect(result).toEqual(orders[1])
      })
    })
  })
})

const orderDbGateways2 = [
  { scenario: 'gateway 2 + json', orderDbGateway: orderGateway2, orderDbAdapter: orderInMemoryDbAdapter2() },
  { scenario: 'gateway 2 + in memory', orderDbGateway: orderGateway2, orderDbAdapter: orderJsonServerDbAdapter2() },
  { scenario: 'gateway 3 + json', orderDbGateway: orderGateway3, orderDbAdapter: orderInMemoryDbAdapter2() },
  { scenario: 'gateway 3 + in memory', orderDbGateway: orderGateway3, orderDbAdapter: orderJsonServerDbAdapter2() },
]

describe('Order gateways 2 → for each order gateway & adapter', () => {
  orderDbGateways2.forEach(({ scenario, orderDbGateway, orderDbAdapter }) => {
    describe(scenario, () => {
      it('should return all orders from the db', async () => {
        const orderGateway = orderDbGateway(orderDbAdapter)
        const result = await orderGateway.getAll()
        return expect(result).toEqual(orders)
      })

      it('should return the order with the specified ID from the db', async () => {
        const orderGateway = orderDbGateway(orderDbAdapter)
        const result = await orderGateway.getById('order1')
        return expect(result).toEqual(orders[1])
      })
    })
  })
})
