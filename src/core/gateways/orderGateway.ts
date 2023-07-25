import { Item } from 'entities/item'
import { Order, OrderData } from 'entities/order'
import { itemGateway } from 'gateways/itemGateway'
import { round6 } from 'utils/round'

import {
  ItemAdapter,
  OrderAdapter,
} from '~/src/adapters/database/adapterInterfaces'

import { OrderGateway } from './gatewayInterfaces'

export const orderGateway = (
  orderAdapter: OrderAdapter,
  itemAdapter: ItemAdapter
): OrderGateway => {
  const itemGtw = itemGateway(itemAdapter)

  return {
    getAllData: (): Promise<OrderData[]> => orderAdapter.getAll(),
    getByIdData: (orderId: string): Promise<OrderData | undefined> =>
      orderAdapter.getById(orderId),
    getAll: (): Promise<Order[]> =>
      orderAdapter
        .getAll()
        .then((orders: OrderData[]) =>
          Promise.all(orders.map(addItemsAndCalculate))
        ),
    getById: (orderId: string): Promise<Order | undefined> =>
      orderAdapter.getById(orderId).then((order: OrderData | undefined) => {
        if (order) {
          return addItemsAndCalculate(order)
        }
        return undefined
      }),
  }

  async function addItemsAndCalculate(order: OrderData): Promise<Order> {
    const items: Item[] = await itemGtw.getByOrderId(order.id)

    const amountExclTax = round6(
      items.reduce((sum, item) => sum + item.amountExclTax, 0)
    )
    const taxAmount = round6(
      items.reduce((sum, item) => sum + item.amountExclTax * item.taxRate, 0)
    )
    const amountInclTax = round6(amountExclTax + taxAmount)
    const averageTaxRate = amountExclTax ? round6(taxAmount / amountExclTax) : 0

    return {
      name: order.name ? order.name : '',
      ...order,
      items: items,
      amountExclTax,
      amountInclTax,
      taxAmount,
      averageTaxRate,
      principal: amountInclTax,
    }
  }
}
