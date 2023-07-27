import { itemDatas } from 'mock/inMemory'

import { createItemAdapterInMemory } from './createItemAdapterInMemory'

describe('createItemAdapterInMemory', () => {
  const adapter = createItemAdapterInMemory()
  describe('getById', () => {
    it('should return undefined when item id not found', () => {
      const item = adapter.getById('nonexistentId')
      expect(item).toBeUndefined()
    })

    it('should return one item for existing item id', () => {
      const item = adapter.getById('item0')
      expect(item).toEqual(itemDatas[0])
    })
  })
  describe('getByOrderId', () => {
    it('should return an array of items for existing order id', () => {
      const items = adapter.getByOrderId('order0')
      expect(items).toEqual([itemDatas[0], itemDatas[1]])
    })

    it('should return an empty array for existing empty order', () => {
      const items = adapter.getByOrderId('order3')
      expect(items).toEqual([])
    })

    it('should return an empty array for non existing  order', () => {
      const items = adapter.getByOrderId('order99')
      expect(items).toEqual([])
    })
  })

  describe('getByOrderIds', () => {
    it('should return an array for array of existing orders', () => {
      const items = adapter.getByOrderIds(['order0', 'order1'])
      expect(items).toEqual(items.slice(0, 4))
    })

    it('should return an empty array for non existing orders', () => {
      const items = adapter.getByOrderId('order99')
      expect(items).toEqual([])
    })
  })
})
