import { orderInMemoryDbAdapter1, orderInMemoryDbAdapter2 } from 'adapters/dbAdapters/inMemory/orderInMemoryDbAdapter'
import {
  orderJsonServerDbAdapter1,
  orderJsonServerDbAdapter2,
} from 'adapters/dbAdapters/jsonServer/orderJsonServerDbAdapter'
import { inMemoryDb } from 'mock/inMemoryDb'

import { orderGateway2, orderGateway3 } from '../gateways/orderGateway'
import { fetchOrderById } from './fetchById'

const orders = inMemoryDb.orders

const orderDbGateways1 = [
  { scenario: 'gateway 1 + json', orderDbAdapter: orderInMemoryDbAdapter1 },
  { scenario: 'gateway 1 + in memory', orderDbAdapter: orderJsonServerDbAdapter1 },
]

describe('Usecase: fetchOrderById  → for each order gateway & adapter', () => {
  orderDbGateways1.forEach(({ scenario, orderDbAdapter }) => {
    describe(scenario, () => {
      it('should return the order with the specified ID from the db', async () => {
        const result = await fetchOrderById(orderDbAdapter)('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', async () => {
        const result = await fetchOrderById(orderDbAdapter)('inexistant')
        expect(result).toEqual(undefined)
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

describe('Usecase: fetchOrderById  → for each order gateway & adapter', () => {
  orderDbGateways2.forEach(({ scenario, orderDbGateway, orderDbAdapter }) => {
    describe(scenario, () => {
      it('should return the order with the specified ID from the db', async () => {
        const result = await fetchOrderById(orderDbGateway(orderDbAdapter))('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', async () => {
        const result = await fetchOrderById(orderDbAdapter)('inexistant')
        expect(result).toEqual(undefined)
      })
    })
  })
})
