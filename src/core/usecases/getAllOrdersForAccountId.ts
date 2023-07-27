import { Order } from 'entities/order'
import { createOrderGateway } from 'gateways/orderGateway'

import { createItemAdapterInMemory as createItemAdapter } from '~/src/adapters/database/inMemory/createItemAdapterInMemory'
import { createOrderAdapterInMemoryForAccountId as createOrderAdapter } from '~/src/adapters/database/inMemory/createOrderAdapterInMemoryForAccountId'

export const getAllOrdersForAccountId = async (
  accountId: string
): Promise<Order[]> => {
  const orderGateway = createOrderGateway(
    createOrderAdapter(accountId),
    createItemAdapter()
  )
  const orders = await orderGateway.getAll()
  return orders
}
