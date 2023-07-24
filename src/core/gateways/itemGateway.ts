import { Item, ItemData } from 'entities/item'
import { round6 } from 'utils/round'

import { ItemAdapter } from '~/src/adapters/database/interfaces'

export const itemGateway = (adapter: ItemAdapter) => {
  return {
    getAllData: (): Promise<ItemData[]> => adapter.getAll(),
    getByIdData: (itemId: string): Promise<ItemData | undefined> =>
      adapter.getById(itemId),
    getAll: (): Promise<Item[]> =>
      adapter.getAll().then((items: ItemData[]) => items.map(calculateItem)),
    getById: (itemId: string): Promise<Item | undefined> =>
      adapter.getById(itemId).then((item: ItemData | undefined) => {
        if (item) {
          return calculateItem(item)
        }
        return undefined
      }),
  }
}

// QUESTION : should the new properties be values or methods?
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
