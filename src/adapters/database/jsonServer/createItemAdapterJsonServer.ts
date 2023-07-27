// src/adapters/database/Adapters/jsonServer/item.jsonServer.Adapter.ts
import { ItemData } from 'entities/item'

import { ItemAdapter } from '../adapterInterfaces'
import axios from './myAxios'

export const createItemAdapterJsonServer = (): ItemAdapter => {
  return {
    getById: async (id: string): Promise<ItemData | undefined> => {
      const result = await axios.get<ItemData>(`/item/${id}`)
      return result
    },
    getByOrderId: async (orderId: string): Promise<ItemData[]> => {
      const result =
        (await axios.get<ItemData[]>(`/item?orderId=${orderId}`)) ?? []
      return result
    },
    getByOrderIds: async (orderIds: string[]): Promise<ItemData[]> => {
      const result =
        (await axios.get<ItemData[]>(
          `/item?orderId=${orderIds.join('&orderId=')}`
        )) ?? []
      return result
    },
  }
}
