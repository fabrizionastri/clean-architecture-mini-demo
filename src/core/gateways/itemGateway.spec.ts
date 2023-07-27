import { createItemGateway } from 'gateways/itemGateway'
import { itemDatas, items } from 'mock/inMemory'

import { createItemAdapterInMemory } from '~/src/adapters/database/inMemory/createItemAdapterInMemory'

let itemAdapter: any
let itemGateway: any
describe('itemGateway', () => {
  beforeAll(() => {
    itemAdapter = createItemAdapterInMemory()
    itemGateway = createItemGateway(itemAdapter)
  })

  describe('getByIdData', () => {
    it('should return the item with raw data only', () => {
      const result = itemGateway.getByIdData('item0')
      expect(result).toEqual(itemDatas[0])
    })
  })

  describe('getByOrderIdData', () => {
    it('should return the items with raw data for the given order id', () => {
      const result = itemGateway.getByOrderIdData('order0')
      expect(result).toEqual(itemDatas.slice(0, 2))
    })
  })

  describe('getById', () => {
    it('should return the item with calculations', () => {
      const result = itemGateway.getById('item0')
      expect(result).toEqual(items[0])
    })
  })

  describe('getByOrderId', () => {
    it('should return the items with calculations for the given order id', () => {
      const result = itemGateway.getByOrderId('order0')
      expect(result).toEqual(items.slice(0, 2))
    })
  })
})
