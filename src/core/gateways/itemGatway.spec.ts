import { Item, ItemData } from 'entities/item'
import { itemGateway } from 'gateways/itemGateway'

import { ItemAdapter } from '~/src/adapters/database/interfaces'

describe('itemGateway', () => {
  // QESTION : should we add types here?
  let mockAdapter: ItemAdapter
  let gateway: ReturnType<typeof itemGateway>
  const itemDatas: ItemData[] = [
    {
      id: '0',
      orderId: '123',
      name: 'Test Item 1',
      quantity: 5,
      unit: 'Kg',
      unitPriceExclTax: 10,
      taxRate: 0.1,
    },
    {
      id: '1',
      orderId: '456',
      name: 'Test Item 2',
      quantity: 2,
      unit: 'L',
      unitPriceExclTax: 20,
      taxRate: 0.2,
    },
  ]
  const items: Item[] = [
    {
      ...itemDatas[0],
      unitPriceInclTax: 11,
      amountExclTax: 50,
      taxAmount: 5,
      amountInclTax: 55,
    },
    {
      ...itemDatas[1],
      unitPriceInclTax: 24,
      amountExclTax: 40,
      taxAmount: 8,
      amountInclTax: 48,
    },
  ]

  beforeEach(() => {
    mockAdapter = {
      getAll: vitest.fn(() => Promise.resolve(itemDatas)),
      getById: vitest.fn((id: string) =>
        Promise.resolve(itemDatas.find((item) => item.id === id))
      ),
    }
    gateway = itemGateway(mockAdapter)
  })

  afterEach(() => {
    vitest.resetAllMocks()
  })

  it('getAllData should return all items with raw data only', async () => {
    const result = await gateway.getAllData()
    expect(result).toHaveLength(itemDatas.length)
    expect(mockAdapter.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(itemDatas)
  })

  it('getByIdData should return the item with raw data only', async () => {
    const result = await gateway.getByIdData('1')
    expect(mockAdapter.getById).toHaveBeenCalledTimes(1)
    expect(mockAdapter.getById).toHaveBeenCalledWith('1')
    expect(result).toEqual(itemDatas[1])
  })

  it('getAll should return all items with calculations', async () => {
    const result = await gateway.getAll()
    expect(result).toHaveLength(itemDatas.length)
    expect(mockAdapter.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(items)
  })

  it('getById should return the item with calculations', async () => {
    const result = await gateway.getById('1')
    expect(mockAdapter.getById).toHaveBeenCalledTimes(1)
    expect(mockAdapter.getById).toHaveBeenCalledWith('1')
    expect(result).toEqual(items[1])
  })
})
