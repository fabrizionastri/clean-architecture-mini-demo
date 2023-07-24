import { Item, ItemData } from 'entities/item'
import { round6 } from 'utils/round'

export const itemGateway = (adapter: any) => {
  return {
    getAll: (): Promise<Item[]> =>
      adapter.getAll().then((items: ItemData[]) => items.map(calculateItem)),
    getById: (itemId: string): Promise<Item> =>
      adapter.getById(itemId).then(calculateItem),
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
