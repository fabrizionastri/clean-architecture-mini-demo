import { createItemAdapterInMemory as createItemAdapter } from 'adapters/database/inMemory/itemAdapterInMemory'
import { createOrderAdapterInMemoryForAccountId as createOrderAdapter } from 'adapters/database/inMemory/orderAdapterInMemoryForAccountId'
import { Order } from 'entities/order'
import { createOrderGateway } from 'gateways/orderGateway'

export const getAllOrdersForAccountId = (accountId: string): Order[] => {
  const orderAdapter = createOrderAdapter(accountId)
  const itemAdapter = createItemAdapter()
  const orderGateway = createOrderGateway(orderAdapter, itemAdapter)
  return orderGateway.getAll()
}
