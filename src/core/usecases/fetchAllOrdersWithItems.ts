import { itemAdapterInMemory2 as itemAdapter } from 'adapters/database/inMemory/itemAdapterInMemory'
import { orderAdapterInMemory2 as orderAdapter } from 'adapters/database/inMemory/orderAdapterInMemory'
import { Order } from 'entities/order'
import { orderGateway } from 'gateways/orderGateway'

export const fetchAllOrdersWithItems = (accountId: string): Order[] => {
  const orderAdptr = orderAdapter(accountId)
  const itemAdptr = itemAdapter()
  const orderGtw = orderGateway(orderAdptr, itemAdptr)
  const result = orderGtw.getAll()
  return result
}
