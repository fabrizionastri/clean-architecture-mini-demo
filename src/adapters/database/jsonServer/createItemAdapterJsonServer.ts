// src/adapters/database/Adapters/jsonServer/item.jsonServer.Adapter.ts
import axios, { AxiosResponse, Method } from 'axios'
import { ItemData } from 'entities/item'

import { ItemAdapter } from '../adapterInterfaces'

export const myAxios = axios.create({
  baseURL: 'http://localhost:3057/',
  timeout: 1000,
})

export const handleRequest =
  (httpMethod: Method) =>
  async <Item>(url: string, data?: any): Promise<Item | undefined> => {
    try {
      const response: AxiosResponse = await myAxios.request({
        url,
        method: httpMethod,
        data,
      })
      return response.data
    } catch (error) {
      // console.error(error)
      return undefined
    }
  }

export const api = {
  get: handleRequest('get'),
  post: handleRequest('post'),
  delete: handleRequest('delete'),
  put: handleRequest('put'),
}

export const createItemAdapterJsonServer = (): ItemAdapter => {
  return {
    getById: async (id: string): Promise<ItemData | undefined> => {
      const result = await api.get<ItemData>(`/itemDatas/${id}`)
      return result
    },
    getByOrderId: async (orderId: string): Promise<ItemData[] | undefined> => {
      const result = await api.get<ItemData[]>(`/itemDatas?orderId=${orderId}`)
      return result
    },
    getByOrderIds: async (
      orderIds: string[]
    ): Promise<ItemData[] | undefined> => {
      const result = await api.get<ItemData[]>(
        `/itemDatas?orderId=${orderIds.join('&orderId=')}`
      )
      return result
    },
  }
}
