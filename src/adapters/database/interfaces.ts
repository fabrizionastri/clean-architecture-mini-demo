import { ItemData } from 'entities/item'
import { OrderData } from 'entities/order'

export interface GenericAdapter<T> {
  getAll: () => Promise<T[]>
  getById: (id: string) => Promise<T | undefined>
}

export interface ItemAdapter {
  getAll: () => Promise<ItemData[]>
  getById: (id: string) => Promise<ItemData | undefined>
}

export interface OrderAdapter {
  getAll: () => Promise<OrderData[]>
  getById: (id: string) => Promise<OrderData | undefined>
}
