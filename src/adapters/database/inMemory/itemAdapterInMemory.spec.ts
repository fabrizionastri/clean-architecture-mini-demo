import { inMemory } from 'mock/inMemory'

import { itemAdapterInMemory } from './itemAdapterInMemory'

describe('Items adapters → for each orderAdapter', () => {
  const adapter = itemAdapterInMemory()

  it.only('should return item by id', () => {
    const firstItem = inMemory.itemDatas[0]
    const item = adapter.getById(firstItem.id)
    expect(item).toEqual(firstItem)
  })

  it.only('should return undefined when id not found', () => {
    const item = adapter.getById('nonexistentId')
    expect(item).toBeUndefined()
  })
})
