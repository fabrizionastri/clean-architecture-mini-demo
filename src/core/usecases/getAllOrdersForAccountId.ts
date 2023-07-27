import { createItemAdapter, createOrderAdapter } from 'adapters/database/index'
import { Order } from 'entities/order'
import { createOrderGateway } from 'gateways/orderGateway'

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
