import { ItemData } from 'entities/item'
import { OrderData } from 'entities/order'

export interface GenericAdapter<T> {
  getAll: () => Promise<T[]>
  getById: (id: string) => Promise<T>
}

export interface ItemAdapter {
  getAll: () => Promise<ItemData[]>
  getById: (id: string) => Promise<ItemData>
}

export interface OrderAdapter {
  getAll: () => Promise<OrderData[]>
  getById: (id: string) => Promise<OrderData>
}
