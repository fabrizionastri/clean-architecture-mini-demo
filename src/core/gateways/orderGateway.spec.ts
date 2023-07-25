import { ItemAdapter, OrderAdapter } from 'adapters/database/adapterInterfaces'
import { orderGateway } from 'gateways/orderGateway'
import { itemDatas, orderDatas, orders } from 'mock/testData'

import { OrderGateway } from './gatewayInterfaces'

describe('orderGateway', () => {
  // QESTION : should we add types here?
  let mockOrderAdapter: OrderAdapter
  let mockItemAdapter: ItemAdapter
  let orderGtw: OrderGateway

  beforeEach(() => {
    mockOrderAdapter = {
      getAll: vitest.fn().mockResolvedValue(orderDatas),
      getById: vitest
        .fn()
        .mockImplementation((id: string) =>
          Promise.resolve(orderDatas.find((order) => order.id === id))
        ),
    }
    mockItemAdapter = {
      getAll: vitest.fn().mockResolvedValue(itemDatas),
      getById: vitest
        .fn()
        .mockImplementation((id: string) =>
          Promise.resolve(itemDatas.find((item) => item.id === id))
        ),
      getByOrderId: vitest
        .fn()
        .mockImplementation((orderId: string) =>
          Promise.resolve(itemDatas.filter((item) => item.orderId === orderId))
        ),
    }
    orderGtw = orderGateway(mockOrderAdapter, mockItemAdapter)
  })

  afterEach(() => {
    vitest.resetAllMocks()
  })

  it('getAllData should return all orders', async () => {
    const result = await orderGtw.getAllData()
    expect(mockOrderAdapter.getAll).toHaveBeenCalledTimes(1)
    expect(result).toEqual(orderDatas)
  })

  it('getByIdData should return the order with raw data only', async () => {
    const result = await orderGtw.getByIdData('0')
    expect(mockOrderAdapter.getById).toHaveBeenCalledTimes(1)
    expect(mockOrderAdapter.getById).toHaveBeenCalledWith('0')
    expect(result).toEqual(orderDatas[0])
  })

  it('getAll should return all orders with items and calculations', async () => {
    const result = await orderGtw.getAll()
    expect(mockOrderAdapter.getAll).toHaveBeenCalledTimes(1)
    expect(mockItemAdapter.getByOrderId).toHaveBeenCalledTimes(2)
    expect(result).toEqual(orders)
  })

  it('getById should return the order with items and calculations', async () => {
    const result = await orderGtw.getById('0')
    expect(mockOrderAdapter.getById).toHaveBeenCalledTimes(1)
    expect(mockOrderAdapter.getById).toHaveBeenCalledWith('0')
    expect(result).toEqual(orders[0])
  })
})
