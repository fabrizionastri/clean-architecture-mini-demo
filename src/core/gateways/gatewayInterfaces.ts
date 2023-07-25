import { Item, ItemData } from 'entities/item'

import { Order, OrderData } from '../coreIndex'

export interface ItemGateway {
  getAllData: () => Promise<ItemData[]>
  getByIdData: (itemId: string) => Promise<ItemData | undefined>
  getByOrderIdData: (orderId: string) => Promise<ItemData[]>
  getAll: () => Promise<Item[]>
  getById: (itemId: string) => Promise<Item | undefined>
  getByOrderId: (orderId: string) => Promise<Item[]>
}

export interface OrderGateway {
  getAllData: () => Promise<OrderData[]>
  getByIdData: (orderId: string) => Promise<OrderData | undefined>
  getAll: () => Promise<Order[]>
  getById: (orderId: string) => Promise<Order | undefined>
}
