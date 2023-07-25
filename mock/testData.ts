import { Order, OrderData } from '~/src/core/coreIndex'
import { Item, ItemData } from '~/src/core/entities/item'

export const itemDatas: ItemData[] = [
  {
    id: '0',
    orderId: '0',
    name: 'Test Item 0',
    quantity: 5,
    unit: 'Kg',
    unitPriceExclTax: 10,
    taxRate: 0.1,
  },
  {
    id: '1',
    orderId: '0',
    name: 'Test Item 1',
    quantity: 2,
    unit: 'L',
    unitPriceExclTax: 20,
    taxRate: 0.2,
  },
  {
    id: '2',
    orderId: '1',
    name: 'Test Item 2',
    quantity: 3,
    unit: 'L',
    unitPriceExclTax: 30,
    taxRate: 0.15,
  },
]

export const items: Item[] = [
  {
    ...itemDatas[0],
    unitPriceInclTax: 11,
    amountExclTax: 50,
    taxAmount: 5,
    amountInclTax: 55,
  },
  {
    ...itemDatas[1],
    unitPriceInclTax: 24,
    amountExclTax: 40,
    taxAmount: 8,
    amountInclTax: 48,
  },
  {
    ...itemDatas[2],
    unitPriceInclTax: 34.5,
    amountExclTax: 90,
    taxAmount: 13.5,
    amountInclTax: 103.5,
  },
]

export const orderDatas: OrderData[] = [
  { id: '0', clientId: '123', supplierId: '456', name: 'Test Order 1' },
  { id: '1', clientId: '789', supplierId: '012', name: 'Test Order 2' },
]
export const orders: Order[] = [
  {
    id: '0',
    clientId: '123',
    supplierId: '456',
    name: 'Test Order 1',
    items: [items[0], items[1]],
    amountExclTax: 90,
    amountInclTax: 103,
    principal: 103,
    taxAmount: 13,
    averageTaxRate: 0.144444,
  },
  {
    id: '1',
    clientId: '789',
    supplierId: '012',
    name: 'Test Order 2',
    items: [items[2]],
    amountExclTax: 90,
    amountInclTax: 103.5,
    principal: 103.5,
    taxAmount: 13.5,
    averageTaxRate: 0.15,
  },
]
