import { ItemData } from 'entities/item'
import { OrderData } from 'entities/order'

export interface GenericAdapter<T> {
  getAll: () => T[]
  getById: (id: string) => T | undefined
  getByProperty: (property: string, value: string | number) => T[]
}

export interface ItemAdapter {
  getAll: () => ItemData[]
  getByOrderId: (orderId: string) => ItemData[]
  getById: (id: string) => ItemData | undefined
}

export interface OrderAdapter {
  getAll: () => OrderData[]
  getById: (orderId: string) => OrderData | undefined
}
