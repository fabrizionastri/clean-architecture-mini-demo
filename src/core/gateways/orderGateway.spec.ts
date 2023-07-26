import { createOrderGateway } from 'gateways/orderGateway'
import { orderDatas, orders } from 'mock/inMemory'

import { createItemAdapterInMemory } from '~/src/adapters/database/inMemory/itemAdapterInMemory'
import { createOrderAdapterInMemoryForAccountId } from '~/src/adapters/database/inMemory/orderAdapterInMemoryForAccountId'

import { OrderGateway } from './gatewayInterfaces'
let orderAdapter: any
let itemAdapter: any
let orderGateway: OrderGateway

describe('orderGateway', () => {
  describe('for existing account', () => {
    beforeEach(() => {
      orderAdapter = createOrderAdapterInMemoryForAccountId('account0')
      itemAdapter = createItemAdapterInMemory()
      orderGateway = createOrderGateway(orderAdapter, itemAdapter)
    })
    it('getByIdData should return the order with raw data only', () => {
      const result = orderGateway.getByIdData('order0')
      expect(result).toEqual(orderDatas[0])
    })
    it('getAllData should return all orders with items and calculations', () => {
      const result = orderGateway.getAllData()
      expect(result).toEqual(orderDatas.slice(0, 2))
    })
    it('getById should return the order with items and calculations', () => {
      const result = orderGateway.getById('order0')
      expect(result).toEqual(orders[0])
    })
    it('getAll should return all orders for this account', () => {
      const result = orderGateway.getAll()
      expect(result).toEqual(orders.slice(0, 2))
    })
  })

  describe('for inexisting account', () => {
    beforeEach(() => {
      orderAdapter = createOrderAdapterInMemoryForAccountId('account99')
      itemAdapter = createItemAdapterInMemory()
      orderGateway = createOrderGateway(orderAdapter, itemAdapter)
    })
    it('getByIdData should return undefined', () => {
      const result = orderGateway.getByIdData('order0')
      expect(result).toBeUndefined()
    })
    it('getAllData should return []', () => {
      const result = orderGateway.getAllData()
      expect(result).toEqual([])
    })
    it('getById should return undefined', () => {
      const result = orderGateway.getById('order0')
      expect(result).toBeUndefined()
    })
    it('getAll should return all []', () => {
      const result = orderGateway.getAll()
      expect(result).toEqual([])
    })
  })
})
