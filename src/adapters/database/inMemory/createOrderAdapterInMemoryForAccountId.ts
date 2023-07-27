import { OrderData } from 'entities/order'

import { inMemory } from '../../../../mock/inMemory'
import { OrderAdapter } from '../adapterInterfaces'

export const createOrderAdapterInMemoryForAccountId = (
  accountId: string
): OrderAdapter => {
  const orders: OrderData[] = [...inMemory.orderDatas]
  const getAll = (): OrderData[] =>
    orders.filter(
      (order) => order.clientId === accountId || order.supplierId === accountId
    )
  const getById = (orderId: string): OrderData | undefined =>
    getAll().find((order) => order.id === orderId)
  return {
    getAll,
    getById,
  }
}
