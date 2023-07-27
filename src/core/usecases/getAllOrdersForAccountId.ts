import { createItemAdapterInMemory as createItemAdapter } from '~/src/adapters/database/inMemory/createItemAdapterInMemory'
import { createOrderAdapterInMemoryForAccountId as createOrderAdapter } from '~/src/adapters/database/inMemory/createOrderAdapterInMemoryForAccountId'
import { Order } from 'entities/order'
import { createOrderGateway } from 'gateways/orderGateway'

export const getAllOrdersForAccountId = (accountId: string): Order[] => {
  const orderAdapter = createOrderAdapter(accountId)
  const itemAdapter = createItemAdapter()
  const orderGateway = createOrderGateway(orderAdapter, itemAdapter)
  return orderGateway.getAll()
}
