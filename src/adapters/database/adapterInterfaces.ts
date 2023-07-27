import { ItemData } from 'entities/item'
import { OrderData } from 'entities/order'

export interface GenericAdapter<T> {
  getAll: () => T[]
  getById: (id: string) => T | undefined
  getByProperty: (property: string, value: string | number) => T[]
}

export interface ItemAdapter {
  getById: (id: string) => Promise<ItemData | undefined>
  getByOrderId: (orderId: string) => Promise<ItemData[] | undefined>
  getByOrderIds: (orderIds: string[]) => Promise<ItemData[] | undefined>
}

export interface OrderAdapter {
  getAll: () => OrderData[]
  getById: (orderId: string) => OrderData | undefined
}
