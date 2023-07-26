import { ItemData } from 'entities/item'
import { OrderData } from 'entities/order'

export interface GenericAdapter<T> {
  getAll: () => T[]
  getById: (id: string) => T | undefined
  getByProperty: (property: string, value: string | number) => T[]
}

export interface ItemAdapter {
  getByOrderId: (orderId: string) => ItemData[]
  getById: (id: string) => ItemData | undefined
  getByOrderIds: (orderIds: string[]) => ItemData[]
}

export interface OrderAdapter {
  getAll: () => OrderData[]
  getById: (orderId: string) => OrderData | undefined
}
