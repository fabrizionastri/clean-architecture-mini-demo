import { inMemory } from 'mock/inMemory'

import { orderAdapterInMemory1, orderAdapterInMemory2 } from '../../adapters/database/inMemory/orderAdapterInMemory'
import {
  orderAdapterJsonServer1,
  orderAdapterJsonServer2,
} from '../../adapters/database/jsonServer/orderAdapterJsonServer'
import { orderGateway2, orderGateway3 } from './orderGateway'

const orders = inMemory.orders

const scenarios1 = [
  { scenario: 'gateway 1 + in memory', orderAdapter1: orderAdapterInMemory1 },
  { scenario: 'gateway 1 + json', orderAdapter1: orderAdapterJsonServer1 },
]

describe('Order gateways 1 → for each order adapters 1', () => {
  scenarios1.forEach(({ scenario, orderAdapter1 }) => {
    describe(scenario, () => {
      it('should return all orders from the db', async () => {
        const result = await orderAdapter1.getAll()
        return expect(result).toEqual(orders)
      })

      it('should return the order with the specified ID from the db', async () => {
        const result = await orderAdapter1.getById('order1')
        return expect(result).toEqual(orders[1])
      })
    })
  })
})

const scenarios2 = [
  { scenario: 'gateway 2 + in memory adapter', orderGateway2: orderGateway2, orderAdapter2: orderAdapterInMemory2() },
  { scenario: 'gateway 2 + json adapter', orderGateway2: orderGateway2, orderAdapter2: orderAdapterJsonServer2() },
  { scenario: 'gateway 3 + in memory adapter', orderGateway2: orderGateway3, orderAdapter2: orderAdapterInMemory2() },
  { scenario: 'gateway 3 + json adapter', orderGateway2: orderGateway3, orderAdapter2: orderAdapterJsonServer2() },
]

describe('Order gateways 2 & 3 → for each order gateway 2 & 3, and for each adapter 2', () => {
  scenarios2.forEach(({ scenario, orderGateway2, orderAdapter2 }) => {
    describe(scenario, () => {
      it('should return all orders from the db', async () => {
        const result = await orderGateway2(orderAdapter2).getAll()
        return expect(result).toEqual(orders)
      })

      it('should return the order with the specified ID from the db', async () => {
        const result = await orderGateway2(orderAdapter2).getById('order1')
        return expect(result).toEqual(orders[1])
      })
    })
  })
})
