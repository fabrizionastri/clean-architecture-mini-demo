import { itemGateway } from 'gateways/itemGateway'
import { itemDatas, items } from 'mock/testData'

import { ItemAdapter } from '~/src/adapters/database/adapterInterfaces'

describe('itemGateway', () => {
  // QESTION : should we add types here?
  let mockAdapter: ItemAdapter
  let gateway: ReturnType<typeof itemGateway>

  beforeEach(() => {
    // J'utilise un mock ou l'inMemoryAdapter ?
    mockAdapter = {
      getAll: vitest.fn(() => Promise.resolve(itemDatas)),
      getById: vitest.fn((id: string) =>
        Promise.resolve(itemDatas.find((item) => item.id === id))
      ),
      getByOrderId: vitest.fn((orderId: string) =>
        Promise.resolve(itemDatas.filter((item) => item.orderId === orderId))
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
