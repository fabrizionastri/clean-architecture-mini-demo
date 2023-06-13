import {
  orderAdapter1 as orderInMemoryAdapter1,
  orderAdapter2 as orderInMemoryAdapter2,
} from 'adapters/inMemory/orderInMemoryAdapter'
import {
  orderAdapter1 as orderJsonServerAdapter1,
  orderAdapter2 as orderJsonServerAdapter2,
} from 'adapters/jsonServer/orderJsonServerAdapter'
import { orderGateway2, orderGateway3 } from 'gateways/orderGateway'
import { inMemory } from 'mock/inMemory'

import { fetchOrderById1, fetchOrderById2 } from './fetchById'

const orders = inMemory.orders

const scenarios1 = [
  { scenario: 'gateway 1 + in memory', orderAdapter1: orderInMemoryAdapter1 },
  { scenario: 'gateway 1 + json', orderAdapter1: orderJsonServerAdapter1 },
]

describe('Usecase: fetchOrderById  → for each order gateway & adapter 1', () => {
  scenarios1.forEach(({ scenario, orderAdapter1 }) => {
    describe(scenario, () => {
      it('should return the order with the specified ID from the db', async () => {
        const result = await fetchOrderById1(orderAdapter1)('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', async () => {
        const result = await fetchOrderById1(orderAdapter1)('inexistant')
        expect(result).toEqual(undefined)
      })
    })
  })
})

const scenarios2 = [
  { scenario: 'gateway 2 + in memory adapter', orderGateway2: orderGateway2, orderAdapter2: orderInMemoryAdapter2() },
  { scenario: 'gateway 2 + json adapter', orderGateway2: orderGateway2, orderAdapter2: orderJsonServerAdapter2() },
  { scenario: 'gateway 3 + in memory adapter', orderGateway2: orderGateway3, orderAdapter2: orderInMemoryAdapter2() },
  { scenario: 'gateway 3 + json adapter', orderGateway2: orderGateway3, orderAdapter2: orderJsonServerAdapter2() },
]

describe('Usecase: fetchOrderById  → for each order gateway & adapter 2 & 3', () => {
  scenarios2.forEach(({ scenario, orderGateway2, orderAdapter2 }) => {
    describe(scenario, () => {
      it('should return the order with the specified ID from the db', async () => {
        const result = await fetchOrderById2(orderGateway2(orderAdapter2))('order1')
        expect(result).toEqual(orders[1])
      })

      it('should return undefined for inexistant id', async () => {
        const result = await fetchOrderById2(orderGateway2(orderAdapter2))('inexistant')
        expect(result).toEqual(undefined)
      })
    })
  })
})
