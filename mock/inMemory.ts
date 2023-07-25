import { ItemData } from '~/src/core/entities/item'

import { OrderData } from '../src/core/entities/order'

export const inMemory: {
  orderDatas: OrderData[]
  itemDatas: ItemData[]
} = {
  orderDatas: [
    {
      id: 'order0',
      clientId: 'accountX',
      supplierId: 'accountB',
      name: '',
    },
    {
      id: 'order1',
      clientId: 'accountA',
      supplierId: 'accountB',
      name: '21 T-shirts (bleus + rouges)',
    },
    {
      id: 'order2',
      clientId: 'accountC',
      supplierId: 'accountA',
      name: 'Chaussettes',
    },
    {
      id: 'order3',
      clientId: 'accountB',
      supplierId: 'accountC',
      name: 'Chaussures',
    },
  ],
  itemDatas: [
    {
      id: 'item0',
      orderId: 'order1',
      name: 'T-shirt bleu',
      quantity: 10,
      unit: 'unit',
      unitPriceExclTax: 10,
      taxRate: 20,
    },
    {
      id: 'item1',
      orderId: 'order1',
      name: 'T-shirt rouge',
      quantity: 11,
      unit: 'unit',
      unitPriceExclTax: 11,
      taxRate: 20,
    },
    {
      id: 'item2',
      orderId: 'order2',
      name: 'Chaussettes à petits pois',
      quantity: 12,
      unit: 'pair',
      unitPriceExclTax: 5,
      taxRate: 20,
    },
    {
      id: 'item3',
      orderId: 'order2',
      name: 'Chaussettes à rayures',
      quantity: 13,
      unit: 'pair',
      unitPriceExclTax: 6,
      taxRate: 20,
    },
    {
      id: 'item4',
      orderId: 'order3',
      name: 'Chaussures de ville',
      quantity: 14,
      unit: 'pair',
      unitPriceExclTax: 100,
      taxRate: 10,
    },
    {
      id: 'item5',
      orderId: 'order3',
      name: 'Chaussures de sport',
      quantity: 15,
      unit: 'pair',
      unitPriceExclTax: 120,
      taxRate: 20,
    },
  ],
}
