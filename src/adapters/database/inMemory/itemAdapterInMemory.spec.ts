import { inMemory } from 'mock/inMemory'

import {
  ItemAdapterInMemory1,
  itemAdapterInMemory2,
} from './itemAdapterInMemory'

const scenarios = [
  { adapterName: 'itemAdapterInMemory1', itemAdapter: ItemAdapterInMemory1 },
  {
    adapterName: 'itemAdapterInMemory2()',
    itemAdapter: itemAdapterInMemory2(),
  },
]

describe('Items adapters → for each orderAdapter', () => {
  scenarios.forEach(({ adapterName, itemAdapter }) => {
    describe(adapterName, () => {
      const adapter = itemAdapter

      it('should return all items', async () => {
        const items = await adapter.getAll()
        expect(items).toEqual(inMemory.itemDatas)
      })

      it('should return item by id', async () => {
        const firstItem = inMemory.itemDatas[0]
        const item = await ItemAdapterInMemory1.getById(firstItem.id)
        expect(item).toEqual(firstItem)
      })

      it('should return undefined when id not found', async () => {
        const item = await ItemAdapterInMemory1.getById('nonexistentId')
        expect(item).toBeUndefined()
      })
    })
  })
})
