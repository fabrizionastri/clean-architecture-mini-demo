import { Item, ItemData } from 'entities/item'
import { round6 } from 'utils/round'

import { ItemAdapter } from '~/src/adapters/database/adapterInterfaces'

export const createItemGateway = (adapter: ItemAdapter) => {
  return {
    getByIdData: (itemId: string): ItemData | undefined =>
      adapter.getById(itemId),
    getByOrderIdData: (orderId: string): ItemData[] =>
      adapter.getByOrderId(orderId),
    getById: (itemId: string): Item | undefined => {
      const item = adapter.getById(itemId)
      return item !== undefined ? calculateItem(item) : undefined
    },
    getByOrderId: (orderId: string): Item[] =>
      adapter.getByOrderId(orderId).map(calculateItem),
  }
}

function calculateItem(item: ItemData): Item {
  return {
    ...item,
    unitPriceInclTax: round6(item.unitPriceExclTax * (1 + item.taxRate)),
    amountExclTax: round6(item.quantity * item.unitPriceExclTax),
    taxAmount: round6(item.quantity * item.unitPriceExclTax * item.taxRate),
    amountInclTax: round6(
      item.quantity * item.unitPriceExclTax * (1 + item.taxRate)
    ),
  }
}
